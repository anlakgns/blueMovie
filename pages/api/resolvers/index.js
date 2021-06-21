import { User } from "../models/User.js";
import { AuthenticationError, ApolloError } from "apollo-server-micro";
import bucket from "../firebase";
import { isUserOwner } from "../utils/helpers";
import { throwAuthError } from "../utils/helpers";
import { generateToken } from "../utils/helpers";
import { sendCookie } from "../utils/helpers";
import { deleteCookie } from "../utils/helpers";
import { authorizeAndDecode } from "../utils/authorize";
import { isTokenUpToDate } from "../utils/helpers";
import { v4 as uuidv4 } from 'uuid';


// Resolvers for graphql
export const resolvers = {
  Query: {
    // Get All User
    users: async () => {
      try {
        const users = await User.find();

        // Check User
        if (!users) {
          throw new AuthenticationError("There is no user yet.");
        }

        return users;
      } catch (err) {
        throw err;
      }
    },
    user: async (parent, args, context, info) => {
      try {
        const { id } = authorizeAndDecode(context.req);
        const user = await User.findById(args.id);

        if (id !== user._id.toString()) {
          throw new AuthenticationError("You don't own this user");
        }
        return user;
      } catch (err) {
        throw err;
      }
    },
    isAuth: async (parent, args, context, info) => {
      try {
        const { id, iat } = authorizeAndDecode(context.req);

        const user = await User.findById(id);

        // Controlling new token or not after password
        // or email change.
        const isTokenNew = isTokenUpToDate(iat, user);
        if (!isTokenNew) {
          throwAuthError("Please Login in again.");
        }
        return {
          isAuth: true,
          _id: user._id,
          email: user.email,
          name: user.name,
          lastname: user.lastname,
          avatar: user.avatar,
          phone: user.phone,
          profiles: user.profiles,
          plan: user.plan,
        };
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    createUser: async (parent, args, context, info) => {
      try {
        const tokenForFirebase =  uuidv4()
        // Validation Field Please

        // Unique Email Check
        const checkEmail = await User.findOne({ email: args.fields.email });
        if (checkEmail) {
          throwAuthError(
            "The email is already used. Please try another email."
          );
        }

        // Creating Document
        const user = new User({
          name: args.fields.name,
          lastname: args.fields.lastname,
          phone: args.fields.phone,
          email: args.fields.email,
          password: args.fields.password,
          avatar: `https://firebasestorage.googleapis.com/v0/b/bluemovie-2eaeb.appspot.com/o/${args.fields.email}-avatar?alt=media&token=${tokenForFirebase}`
        });

        // Saving DB
        const data = await user.save();

        // Saving Avatar to Storage
        const { createReadStream, mimetype } = await args.fields.file;        
        await new Promise(res => 
          createReadStream()
            .pipe(
              bucket.file(`${user.email}-avatar`).createWriteStream({
                resumable: false,
                gzip: true,
                public:true,
                contentType: mimetype, 
                metadata: {
                  metadata :{
                    firebaseStorageDownloadTokens: tokenForFirebase,
                }
              },
              })
            )
            .on('error', function(err) {
              console.log(err)
            })
            .on('finish', res)
        )

        // Generate Token
        const token = generateToken(user._id);

        // Send Cookie
        sendCookie(context.res, token);

        return {
          _id: data._id,
          email: data.email,
          name: data.name,
          lastname: data.lastname,
          avatar: data.avatar,
          profiles: data.profiles,
          phone: data.phone,
        };
      } catch (err) {
        throw err;
      }
    },
    loginUser: async (parent, args, context, info) => {
      try {
        // Check the mail
        const user = await User.findOne({ email: args.fields.email });
        if (!user) {
          throwAuthError("Incorrect Email.");
        }

        // Check Password
        const checkPassword = await user.comparePassword(args.fields.password);
        if (!checkPassword) {
          throwAuthError("Incorrect Password.");
        }

        // User Correct - Generate Token
        const token = generateToken(user._id);

        // Send Cookie
        sendCookie(context.res, token);

        // Return
        return {
          _id: user._id,
          email: user.email,
          name: user.name,
          lastname: user.lastname,
          avatar: user.avatar,
          phone: user.phone,
          profiles: user.profiles,
        };
      } catch (err) {
        throw err;
      }
    },
    updateUserInfo: async (parent, args, context, info) => {
      try {
        // Token & User Check
        const { id } = authorizeAndDecode(context.req);
        const ownerCheck = isUserOwner(id, args.fields._id);
        if (!ownerCheck) {
          throwAuthError("You don't have this user.");
        }

        // Validate Fields Please
        const user = await User.findByIdAndUpdate(
          id,
          {
            name: args.fields.name,
            lastname: args.fields.lastname,
            phone: args.fields.phone
          },
          {
            new: true,
          }
        );

        // generate new token
        const token = generateToken(user._id);

        // update cookie
        sendCookie(context.res, token);

        return { ...user._doc };
      } catch (err) {
        throw err;
      }
    },
    updateUserEmail: async (parent, args, context, info) => {
      try {
        // Token Exist Check
        const { id, iat } = authorizeAndDecode(context.req);

        // User Exist Check
        const user = await User.findOne({ _id: id });
        if (!user) {
          throwAuthError("Sorry user couldn't found. Please try again.");
        }

        // Check Password
        const checkPassword = await user.comparePassword(args.fields.password);
        if (!checkPassword) {
          throwAuthError("Incorrect Password.");
        }

        // Check the mail
        const checkEmail = user.email === args.fields.email ? true : false;
        if (!checkEmail) {
          throwAuthError("Incorrect Email.");
        }
        // Check new email
        const checkNewEmail = user.email === args.fields.newEmail;
        if (checkNewEmail) {
          throwAuthError("Please provide a new email.");
        }

        // Controlling new token or not after password
        // or email change.
        const isTokenNew = isTokenUpToDate(iat, user);
        if (!isTokenNew) {
          throwAuthError("Please Login in again.");
        }

        // Updated Info
        const userUpdate = await User.findByIdAndUpdate(
          id,
          {
            email: args.fields.newEmail,
          },
          {
            new: true,
          }
        );

        // Generate token
        const token = generateToken(user._id);

        // Send Cookie
        sendCookie(context.res, token);

        return {
          _id: userUpdate._id,
          email: userUpdate.email,
          name: userUpdate.name,
          lastname: userUpdate.lastname,
          avatar: userUpdate.avatar,
          phone: userUpdate.phone,
          profiles: userUpdate.profiles,
        };
      } catch (err) {
        throwAuthError(err);
      }
    },
    updateUserPassword: async (parent, args, context, info) => {
      try {
        // Token Exist Check
        const { id, iat } = authorizeAndDecode(context.req);
        if (!id || !iat) {
          throwAuthError("Sorry user couldn't found. Please try again.");
        }

        // User Exist Check
        const user = await User.findOne({ _id: id });
        if (!user) {
          throwAuthError("Sorry user couldn't found. Please try again.");
        }

        // Check Password
        const checkPassword = await user.comparePassword(args.fields.password);
        if (!checkPassword) {
          throwAuthError("Incorrect Password.");
        }

        // Check new password
        const checkNewEmail = user.password === args.fields.newPassword;
        if (checkNewEmail) {
          throwAuthError("Please provide a new password.");
        }

        // Controlling new token or not after password
        // or email change.
        const isTokenNew = isTokenUpToDate(iat, user);
        if (!isTokenNew) {
          throwAuthError("Please Login in again.");
        }

        // Updated Info
         user.password = args.fields.newPassword
         const data = await user.save();


        // Generate token
        const token = generateToken(user._id);

        // Send Cookie
        sendCookie(context.res, token);

        return {
          _id: data._id,
          email: data.email,
          name: data.name,
          lastname: data.lastname,
          avatar: data.avatar,
          phone: data.phone,
          profiles: data.profiles,
        };
      } catch (err) {
        throwAuthError(err);
      }
    },
    logoutUser: async (parent, args, context, info) => {
      try {
        deleteCookie(context.res);
        return true;
      } catch (err) {
        throw new ApolloError("Something went wrong.", err);
      }
    },
    singleUpload: async (parent, { file }, { req }) => {
      try {

        const { createReadStream, filename, mimetype } = await file;        
        await new Promise(res => 
          createReadStream()
            .pipe(
              bucket.file("avatars").createWriteStream({
                resumable: false,
                gzip: true,
                public:true,
                contentType: mimetype, 
                metadata: {
                  metadata :{
                    firebaseStorageDownloadTokens: uuidv4(),
                }
              },
              })
            )
            .on('error', function(err) {
              console.log(err)
            })
            .on('finish', function(d) {
              console.log(d)
            })
        )
        
        return { filename, mimetype, encoding, url: "" };
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    changePlan: async (parent, args, context, info) => {
      try {

        // Token & User Check
        const { id } = authorizeAndDecode(context.req);
        const ownerCheck = isUserOwner(id, args.fields._id);
        if (!ownerCheck) {
          throwAuthError("You don't have this user.");
        }

        // Validate Fields Please
        const user = await User.findByIdAndUpdate(
          id,
          {
            plan: args.fields.plan,
          },
          {
            new: true,
          }
        );

        // generate new token
        const token = generateToken(user._id);

        // update cookie
        sendCookie(context.res, token);
        return { newPlan: user.plan };
      } catch (err) {
        throw err;
      }

    },
    addProfile: async (parent, args, context, info) => {
      try {

        // Token & User Check
        const { id } = authorizeAndDecode(context.req);
        const ownerCheck = isUserOwner(id, args.fields._id);
        if (!ownerCheck) {
          throwAuthError("You don't have this user.");
        }

        // User Exist Check
        const user = await User.findOne({ _id: id });
        if (!user) {
          throwAuthError("Sorry user couldn't found. Please try again.");
        }

        // Adding to Profile
        user.profiles.push({
          name: args.fields.name,
          kidProtection: args.fields.kidProtection,
          avatar: args.fields.avatar 
        })

        // Saving to DB
        const data = await user.save();

        return { profiles: data.profiles };
      } catch (err) {
        throw err;
      }
    },
    deleteProfile: async (parent, args, context, info) => {
      try {

        // Token & User Check
        const { id } = authorizeAndDecode(context.req);
        const ownerCheck = isUserOwner(id, args.fields._id);
        if (!ownerCheck) {
          throwAuthError("You don't have this user.");
        }

        // User Exist Check
        const user = await User.findOne({ _id: id });
        if (!user) {
          throwAuthError("Sorry user couldn't found. Please try again.");
        }

        // Adding to Profile
        const newProfiles = user.profiles.filter(profile => profile.name !== args.fields.name)
        user.profiles = newProfiles

        // Saving to DB
        const data = await user.save();

        return { profiles: data.profiles };
      } catch (err) {
        throw err;
      }
    },
    changeProfile:  async (parent, args, context, info) => {
      try {
        // Token & User Check
        const { id } = authorizeAndDecode(context.req);
        const ownerCheck = isUserOwner(id, args.fields._id);
        if (!ownerCheck) {
          throwAuthError("You don't have this user.");
        }

         // User Exist Check
         const user = await User.findOne({ _id: id });
         if (!user) {
           throwAuthError("Sorry user couldn't found. Please try again.");
         }

         console.log(user.profiles)
         console.log(args.fields)
        // Updating Profile
        const profileIndex = user.profiles.findIndex(profile => profile._id.toString() === args.fields.profileId
        )
     

        // Check Profile
        if (profileIndex === -1) {
          throwAuthError("Profile couldn't found.");
        }
        

        user.profiles[profileIndex].name = args.fields.name
        user.profiles[profileIndex].kidProtection = args.fields.kidProtection

        // Saving to DB
        const data = await user.save();


        return { profiles: data.profiles };
      } catch (err) {
        throw err;
      }
    }
  },
};
















// var storage = require('@google-cloud/storage');
// var gcs = storage({
//     projectId: config.google.projectId,
//     keyFilename: config.google.keyFilenameFirebase
// });

// var bucket = gcs.bucket('project-id.appspot.com');
// var destination = 'uploads/12345/full.jpg';

// bucket.upload(myFile, { public: true, destination: destination }, function(err, file) {
//     if (err) {
//         console.log(err);
//     }
// });

//  // console.log(avatarRef)
//   bucket.upload(stream, { public: true, destination: "avatars/deniz.png" }, function(err, file) {
//   if (err) {
//  console.log(err);
//  }

// bucket.upload(
//   "../../../public/images/avatarExample1.jpg",
//     {
//       destination: "avatars/deniz.png"
//     },
//   )

// await new Promise((res) =>
// createReadStream()
//   .pipe(
//     createWriteStream(
//       path.join(process.cwd(), "public/images", filename)
//     )
//   )
//   .on("close", res)
// );



// bucket.upload(buffers, 
//   { public: true, 
//     destination: `avatars/${filename}`,
//     gzip: true, 
//     contentType: "image/png", 
//     metadata: {
//       metadata :{
//         firebaseStorageDownloadTokens: uuidv4(),
//      }
//   },
//     }, 
//   function(err, file) {
//   if (err) {
//       console.log(err);
//   }
// })
// })