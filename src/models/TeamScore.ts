import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamScore extends Document {
  teamId: string;
  questionOrder: number[];
  solvedIndices: number[];
  currentScore: number;
  bingoLines: number[][];
  lastSubmissionTime: Date | null;
  syncCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const TeamScoreSchema = new Schema<ITeamScore>(
  {
    teamId: { type: String, required: true, unique: true },
    questionOrder: [{ type: Number }],
    solvedIndices: [{ type: Number }],
    currentScore: { type: Number, default: 0 },
    bingoLines: [[{ type: Number }]],
    lastSubmissionTime: { type: Date, default: null },
    syncCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.TeamScore || mongoose.model<ITeamScore>('TeamScore', TeamScoreSchema);