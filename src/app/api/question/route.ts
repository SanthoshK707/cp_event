// ===========================================
// QUESTION API ROUTE - Get questions and team score
// ===========================================

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Question, TeamScore } from '@/models';

// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/authOptions';

const DUMMY_TEAM_ID = 'test-team-123';

function shuffleArray(array: any[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get('teamId') || DUMMY_TEAM_ID;

// export async function GET(request: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || !session.user?.teamId) {
//       return NextResponse.json(
//         { success: false, error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     await connectDB();

//     const teamId = session.user.teamId;

    const allQuestions = await Question.find({}).sort({ gridIndex: 1 });
    if (!allQuestions || allQuestions.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No questions found' },
        { status: 404 }
      );
    }

    let teamScore = await TeamScore.findOne({ teamId });
    
    if (!teamScore) {
      const randomOrder = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      teamScore = await TeamScore.create({
        teamId,
        questionOrder: randomOrder,
        solvedIndices: [],
        currentScore: 0,
        bingoLines: [],
      });
    }

    const teamQuestions = teamScore.questionOrder.map((originalIndex: number, gridPosition: number) => {
      const question = allQuestions[originalIndex];
      return {
        ...question.toObject(),
        gridIndex: gridPosition,
        originalIndex,
      };
    });

    const gameData = {
      name: 'Round 1',
      problems: teamQuestions,
    };

    return NextResponse.json({
      success: true,
      game: gameData,
      progress: {
        solvedIndices: teamScore.solvedIndices,
        currentScore: teamScore.currentScore,
        bingoLines: teamScore.bingoLines,
      },
    });
  } catch (error) {
    console.error('Question API error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error fetching questions' },
      { status: 500 }
    );
  }
}
