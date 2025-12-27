// ===========================================
// DATABASE SEEDING SCRIPT
// Run with: npm run seed
// ===========================================

import dotenv from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';
import { Question } from '../src/models';

dotenv.config({ path: resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI as string;

const round1Questions = [
  { gridIndex: 0, contestId: '1928', problemIndex: 'A', name: 'Rectangle Cutting', points: 10, url: 'https://codeforces.com/contest/1928/problem/A' },
  { gridIndex: 1, contestId: '1928', problemIndex: 'B', name: 'Equalize', points: 10, url: 'https://codeforces.com/contest/1928/problem/B' },
  { gridIndex: 2, contestId: '1928', problemIndex: 'C', name: 'Physical Education Lesson', points: 10, url: 'https://codeforces.com/contest/1928/problem/C' },
  { gridIndex: 3, contestId: '1928', problemIndex: 'D', name: 'Lonely Mountain Dungeons', points: 10, url: 'https://codeforces.com/contest/1928/problem/D' },
  { gridIndex: 4, contestId: '1928', problemIndex: 'E', name: 'Modular Sequence', points: 10, url: 'https://codeforces.com/contest/1928/problem/E' },
  { gridIndex: 5, contestId: '1928', problemIndex: 'F', name: 'Digital Patterns', points: 10, url: 'https://codeforces.com/contest/1928/problem/F' },
  { gridIndex: 6, contestId: '1927', problemIndex: 'A', name: 'Make it White', points: 10, url: 'https://codeforces.com/contest/1927/problem/A' },
  { gridIndex: 7, contestId: '1927', problemIndex: 'B', name: 'Following the String', points: 10, url: 'https://codeforces.com/contest/1927/problem/B' },
  { gridIndex: 8, contestId: '1927', problemIndex: 'C', name: 'Choose the Different Ones', points: 10, url: 'https://codeforces.com/contest/1927/problem/C' },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Question.deleteMany({});
    console.log('Cleared existing questions');

    const questions = await Question.insertMany(round1Questions);
    console.log(`Inserted ${questions.length} questions`);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
