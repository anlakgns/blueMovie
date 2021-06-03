import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Schema : Where we model our data structure, by describing the stucture of data, default values and validations.
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "A user must have a name."],
    trim: true,
    maxlength: 10,
  },
  lastname: {
    type: String,
    maxlength: 10,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "A user must have a name."],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "invalid email"],
  },
  password: {
    type: String,
    required: [true, "A user must have a name."],
    minlength: 5,
  },
  avatar: {
    type: String,
    default: "default.jpg",
  },
  profiles: [
    {
      name: {
        type: String,
        required: [true, "A profile must have a name."],
        trim: true,
        maxlength: 10,
      },
      avatar: {
        type: String,
        default: "default.jpg",
      },
      kid: {
        type: Boolean,
        default: false,
      },
    },
  ],
  token: {
    type: String,
  },
});

// Hashing Password Before Saving DB
userSchema.pre("save", async function (next) {
  const user = this;

  // Only run if password was actually changed
  if (user.isModified("password")) {
    // Hash the password with the cost of 10
    this.password = await bcrypt.hash(user.password, 10);


    next();
  } else {
    next();
  }
});


// Compare Passwords 
userSchema.methods.comparePassword = async function(candidatePassword) {
  const user = this
  const result = await bcrypt.compare(candidatePassword, user.password)
  return result
}



// Creating Token, Dont use arraw function here this doesnt work well
userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ email: user.email }, "supersecretpassword", {
    expiresIn: "7d",
  });


  user.token = token;
  return user.save();
};


// Model : a wrapper for the schema, providing an interface to the database for CRUD operations.
mongoose.models = {}; // for graphql bug
export const User = mongoose.model("User", userSchema);

// Not : I added an methods to schema here. It take it an object for its prototype. So I mean the method I created as generateToken can be used instance of the models.
