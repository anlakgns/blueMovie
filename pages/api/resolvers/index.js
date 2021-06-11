import { User } from "../models/User.js";
import { AuthenticationError, ApolloError } from "apollo-server-micro";
import { isUserOwner } from "../utils/helpers";
import { throwAuthError } from "../utils/helpers";
import { generateToken } from "../utils/helpers";
import { sendCookie } from "../utils/helpers";
import { deleteCookie } from "../utils/helpers";
import { authorizeAndGetId } from "../utils/authorize";

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
        const _id = authorizeAndGetId(context.req);
        const user = await User.findById(args.id);

        if (_id !== user._id.toString()) {
          throw new AuthenticationError("You don't own this user");
        }
        return user;
      } catch (err) {
        throw err;
      }
    },
    isAuth: async (parent, args, context, info) => {
      try{
        const _id = authorizeAndGetId(context.req);

        return {
          isAuth: true,
          _id: _id
        }
      } catch (err) {
        throw (err) 
      }
    }
  },

  Mutation: {
    createUser: async (parent, args, context, info) => {
      try {
        // Validation Field Please
        const checkEmail = await User.findOne({ email: args.fields.email });
        if (checkEmail) {
          throwAuthError(
            "The email is already used. Please try another email."
          );
        }

        // Creating Document
        const user = new User({
          name: args.fields.name,
          email: args.fields.email,
          password: args.fields.password,
          passwordChangedAt: Date.now(),
        });

        // Generate Token
        const token = generateToken(user._id);

        // Saving DB
        const data = await user.save();

        // Send Cookie
        sendCookie(context.res, token)

        return { ...data._doc };
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
        sendCookie(context.res, token)

        // Return
        return {
          _id: user._id,
          email: user.email,
          name: user.name
        };
      } catch (err) {
        throw err;
      }
    },

    updateUser: async (parent, args, context, info) => {
      try {
        // Token & User Check
        const _id = authorizeAndGetId(context.req);
        const ownerCheck = isUserOwner(_id, args._id);
        if (!ownerCheck) {
          throwAuthError("You don't have this user.");
        }

        // Validate Fields Please
        const user = await User.findByIdAndUpdate(
          _id,
          {
            name: args.name,
            lastname: args.lastname,
          },
          {
            new: true,
          }
        );

        // generate new token
        const token = generateToken(user._id)

        // update cookie
        sendCookie(context.res, token)

        return { ...user._doc };
      } catch (err) {
        throw err;
      }
    },

    updateUserEmailPass: async (parent, args, context, info) => {
      try {
        // Token & User Check
        const _id = authorizeAndGetId(context.req);
        const ownerCheck = isUserOwner(_id, args._id);
        if (!ownerCheck) {
          throwAuthError("You don't have this user.");
        }

        const user = await User.findOne({ _id: args._id });
        if (!user) throwAuthError("Sorry try again.");

        // Validate Fields Please
        if (args.email) {
          user.email = args.email;
        }
        if (args.password) {
          user.password = args.password;
        }

        // Generate token
        const token = generateToken(user._id);

        // Saving DB
        const data = await user.save();

        return { ...data._doc, token: token };
      } catch (err) {
        throw new ApolloError("Something went wrong.", err);
      }
    },

    logoutUser: async (parent, args, context, info) => {
       
      try {
        deleteCookie(context.res)
        return true
      } catch (err) {
        throw new ApolloError("Something went wrong.", err);
      }
    
    },
  }
}




















// isAuth: async (parent, args, context, info) => {
//   try {
//     const req = authorize(context.req, true)

//     // Authorization Method Check
//     if(!req._id) {
//       throw new AuthenticationError("Bad token");

//     }
//     return {_id: req._id, email: req.email, token: req.token}
//   }
//   catch (err) {
//     throw err
//   }
// },


