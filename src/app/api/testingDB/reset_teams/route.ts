import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

export async function POST() {
  try {
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json(
        { message: "Not allowed outside development" },
        { status: 403 }
      );
    }

    await connectDB();

    const db = mongoose.connection.db;

    if (!db) {
      return NextResponse.json(
        { message: "Database not connected" },
        { status: 500 }
      );
    }

    const collections = await db.listCollections({ name: "teams" }).toArray();

    if (collections.length === 0) {
      return NextResponse.json({
        message: "Teams collection does not exist. Nothing to reset.",
      });
    }

    
    await db.collection("teams").drop();

    return NextResponse.json({
      message: "Teams collection dropped successfully",
    });
  } catch (error: any) {
    console.error("RESET ERROR:", error.message);

    return NextResponse.json(
      {
        message: "Failed to reset teams collection",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
