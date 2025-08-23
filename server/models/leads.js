import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    phone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      enum: ["website", "facebook_ads", "google_ads", "referral", "events", "other"],
      default: "other",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost", "won"],
      default: "new",
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    lead_value: {
      type: Number,
      default: 0,
    },
    last_activity_at: {
      type: Date,
      default: null,
    },
    is_qualified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
