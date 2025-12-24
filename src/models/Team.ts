import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Team Interface
 */
export interface ITeam extends Document {
  teamId: string;
  name: string;
  teamName: string;
  email: string;
  members: string[];
  codeforcesHandle: string | null;
  lastSync: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Team Schema
 */
const TeamSchema: Schema<ITeam> = new Schema(
  {
    teamId: { 
      type: String, 
      required: true, 
      unique: true 
    },
    name: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true 
    },
    teamName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    members: [{ 
      type: String, 
      required: true 
    }],
    codeforcesHandle: { 
      type: String, 
      default: null,
      trim: true 
    },
    lastSync: { 
      type: Date, 
      default: null 
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Team Model
 */
const Team: Model<ITeam> =
  mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema);

export default Team;
