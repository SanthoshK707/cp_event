// ===========================================
// TEAM SCORE API ROUTE - Get/Update team scores
// ===========================================

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { TeamScore } from '@/models';

// GET - Fetch
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get('teamId');

    if (!teamId) {
      return NextResponse.json(
        { success: false, error: 'Team ID required' },
        { status: 400 }
      );
    }

    const teamScore = await TeamScore.findOne({ teamId });

    if (!teamScore) {
      return NextResponse.json({
        success: true,
        score: {
          solvedIndices: [],
          currentScore: 0,
          bingoLines: [],
          syncCount: 0,
        },
      });
    }

    return NextResponse.json({
      success: true,
      score: {
        solvedIndices: teamScore.solvedIndices,
        currentScore: teamScore.currentScore,
        bingoLines: teamScore.bingoLines,
        syncCount: teamScore.syncCount,
        lastSubmissionTime: teamScore.lastSubmissionTime,
      },
    });
  } catch (error) {
    console.error('Team score GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error fetching team score' },
      { status: 500 }
    );
  }
}

// POST - Update
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      teamId,
      solvedIndices = [],
      currentScore = 0,
      bingoLines = [],
    } = body;

    if (!teamId) {
      return NextResponse.json(
        { success: false, error: 'Team ID required' },
        { status: 400 }
      );
    }

    const teamScore = await TeamScore.findOneAndUpdate(
      { teamId },
      {
        solvedIndices,
        currentScore,
        bingoLines,
        $inc: { syncCount: 1 },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      score: {
        solvedIndices: teamScore.solvedIndices,
        currentScore: teamScore.currentScore,
        bingoLines: teamScore.bingoLines,
        syncCount: teamScore.syncCount,
      },
    });
  } catch (error) {
    console.error('Team score POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error updating team score' },
      { status: 500 }
    );
  }
}
