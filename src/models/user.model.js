const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      age: { type: String, required: false },
      address: { type: String, required: false },
      department: { type: String, required: false},
      salary: { type: Number, required: false},
      marital_status: { type: String, required: false},
      profile: { type: String, required: false},
      
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
const User = mongoose.model("user", userSchema); // users

module.exports = User;