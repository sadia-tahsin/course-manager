import mongoose, { Schema, model, models } from 'mongoose';

const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  instructor: { type: String, required: true },
  enrolledUsers: {
    type: [String],        // Array of user emails (or IDs)
    default: [],           // Default empty array
  },
}, { timestamps: true });

export const Course = models.Course || model('Course', CourseSchema);
