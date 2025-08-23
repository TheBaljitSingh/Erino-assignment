import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // hide password by default
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password =await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


const User =  mongoose.model("User", userSchema);

export default User;
