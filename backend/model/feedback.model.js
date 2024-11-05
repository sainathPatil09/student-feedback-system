// models/Feedback.js
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'studentModel',
    required: true,
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'facultyModel',
    required: true,
  },
  responses: [
    {
      question: { type: String, required: true },
      rating: { type: String, required: true },
    },
  ],
  feedbackDate: {
    type: Date,
    default: Date.now,
  },
});

export const Feedback = mongoose.model('Feedback', feedbackSchema);

