import {User} from "../models/User.js"
import {UserInputError, AuthenticationError, ApolloError} from "apollo-server-micro"

// Resolvers for graphql
export const resolvers = {
  Query: {
    users: () => {
      return User.find()
    }
  },

  Mutation: {
    addUser: async (parent, args, context, info) => {
      try {

        // Creating Section
        const user = new User({
          name: args.fields.name,
          email: args.fields.email,
          password: args.fields.password,
          passwordConfirm: args.fields.passwordConfirm
        })

        // Saving the doc to DB in getToken method
        const getToken = await user.generateToken();
        if(!getToken) {
          throw new AuthenticationError("Something went wrong, try again!")
        }

        return {...getToken._doc}
      } 
      catch (err) {
        if(err.code === 11000) {
          throw new AuthenticationError("The email is already used. Please try another one.")
        }
      }
      
      
    },

    authUser : async (parent, args, context, info) => {
      try {
        // Check the mail 
        const user = await User.findOne(
          {email: args.fields.email})
        if(!user) {
          throw new AuthenticationError("Incorrect Email.")
        }

        // Check Password
        const checkPassword = await user.comparePassword(args.fields.password)
        console.log(checkPassword)
        if(!checkPassword) {
          throw new AuthenticationError("Incorrect Password.")
        }

        // User must be right, Log im
        const getToken = await user.generateToken();
        if(!getToken) {
          throw new AuthenticationError("Something went wrong, try again!")
        }

        // Return 
        return {
          _id: user._id,
          email: user.email,
          token: getToken.token
        }

      }
      catch (err) {
        throw err
      }
    }
  }
} 


// Questions 

// 1-) When to close connection with DB
// 2-) Validaiton Section, I cant return User object as required in graphQL, how to fix ?

