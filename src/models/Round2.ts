import mongoose from 'mongoose';

const QuestionR2Schema = new mongoose.Schema({
  gridIndex: { type: Number, required: true }, 
  contestId: { type: String, required: true },
  problemIndex: { type: String, required: true },
  name: { type: String, required: true },
  points: { type: Number, default: 10 },
});

const ProgressR2Schema = new mongoose.Schema({
  teamId: { type: String, required: true, unique: true }, // Changed from cfHandle to teamId
  solvedIndices: { type: [Number], default: [] },
  currentScore: { type: Number, default: 0 },
  bingoLines: { type: [[Number]], default: [] },
  lastSynced: { type: Date, default: Date.now }
});

// Defining separate collections: 'questions_r2' and 'progress_r2'
export const QuestionR2 = mongoose.models.QuestionR2 || mongoose.model('QuestionR2', QuestionR2Schema, 'questions_r2');
export const ProgressR2 = mongoose.models.ProgressR2 || mongoose.model('ProgressR2', ProgressR2Schema, 'progress_r2');