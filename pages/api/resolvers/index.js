import {User} from "../models/User.js"

// Resolvers for graphql
export const resolvers = {
  Query: {
    users: () => {
      return User.find()
    }
  },

  Mutation: {
    addUser: async (parent, args, context, info) => {
      const user = new User({
        name: args.userInput.name,
        email: args.userInput.email,
        password: args.userInput.password
      })

      return await user.save()
    }
  }
} 


