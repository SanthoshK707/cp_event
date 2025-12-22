import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  gridIndex: number;
  contestId: string;
  problemIndex: string;
  name: string;
  points: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    gridIndex: { type: Number, required: true, unique: true },
    contestId: { type: String, required: true },
    problemIndex: { type: String, required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true, default: 10 },
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);