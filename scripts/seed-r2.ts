// ===========================================
// ROUND 2 DATABASE SEEDING SCRIPT
// Run with: npx ts-node scripts/seed-r2.ts
// ===========================================

import mongoose from 'mongoose';
import { QuestionR2 } from '../src/models/Question'; // Adjust path if necessary

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://cp_event:CpEvent2026@cpeventcluster.jmjmbmc.mongodb.net/cp-events';

const round2Questions = [
  { gridIndex: 0, contestId: "1900", problemIndex: "B", name: "Laura and Operations", points: 10, url: 'https://codeforces.com/contest/1900/problem/B' },
  { gridIndex: 1, contestId: "1899", problemIndex: "C", name: "Yarik and Array", points: 10, url: 'https://codeforces.com/contest/1899/problem/C' },
  { gridIndex: 2, contestId: "1896", problemIndex: "B", name: "Beginner's Zelda", points: 10, url: 'https://codeforces.com/contest/1896/problem/B' },
  { gridIndex: 3, contestId: "1891", problemIndex: "B", name: "Deja Vu", points: 10, url: 'https://codeforces.com/contest/1891/problem/B' },
  { gridIndex: 4, contestId: "1883", problemIndex: "C", name: "Raspberries", points: 10, url: 'https://codeforces.com/contest/1883/problem/C' },
  { gridIndex: 5, contestId: "1878", problemIndex: "C", name: "Vasilije in Cacak", points: 10, url: 'https://codeforces.com/contest/1878/problem/C' },
  { gridIndex: 6, contestId: "1873", problemIndex: "E", name: "Building an Aquarium", points: 10, url: 'https://codeforces.com/contest/1873/problem/E' },
  { gridIndex: 7, contestId: "1862", problemIndex: "C", name: "Flower City Fence", points: 10, url: 'https://codeforces.com/contest/1862/problem/C' },
  { gridIndex: 8, contestId: "1850", problemIndex: "E", name: "Cardboard for Pictures", points: 10, url: 'https://codeforces.com/contest/1850/problem/E' }
];

async function seedR2() {
  try {
    console.log('Connecting to MongoDB for Round 2...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // IMPORTANT: Only clear Round 2 questions
    await QuestionR2.deleteMany({});
    console.log('Cleared existing Round 2 questions');

    // Insert Round 2 questions
    const questions = await QuestionR2.insertMany(round2Questions);
    console.log(`Inserted ${questions.length} Round 2 questions into questions_r2 collection`);

    console.log('Round 2 Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Round 2 Seed failed:', error);
    process.exit(1);
  }
}

seedR2();