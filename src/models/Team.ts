import mongoose, { Schema, Document, Model } from "mongoose";

/*
 * Team Interface
 */
export interface ITeam extends Document {
  teamName: string;
  email: string;
  codeforcesHandle?: string | null;
}

/*
 * Team Schema
 */
const TeamSchema: Schema<ITeam> = new Schema({
  teamName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  // Will be set only the first time
  codeforcesHandle: {
    type: String,
    default: null,
    trim: true,
  },
});

/**
 * Team Model
 */
const Team: Model<ITeam> =
  mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema);

export default Team;
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
