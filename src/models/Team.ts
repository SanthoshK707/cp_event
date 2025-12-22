import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  teamId: string;
  name: string;
  members: string[];
  codeforcesHandle: string;
  lastSync: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema = new Schema<ITeam>(
  {
    teamId: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    members: [{ type: String, required: true }],
    codeforcesHandle: { type: String, required: true },
    lastSync: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);