import mongoose, {Schema} from "mongoose"


// Schema : Where we model our data structure, by describing the stucture of data, default values and validations.
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "A user must have a name."],
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, "A user must have a name."],
    trim: true

  },
  password: {
    type: String,
    required: [true, "A user must have a name."]
  }
 
})

// Model : a wrapper for the schema, providing an interface to the database for CRUD operations.
mongoose.models = {}
export const User = mongoose.model('User', userSchema)


