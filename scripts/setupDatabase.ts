// ===========================================
// DATABASE SETUP SCRIPT
// Run with: npm run setupDatabase
// ===========================================
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

async function setupDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }
    
    // Get existing collections
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    console.log('\nCurrent collections:', collectionNames.length > 0 ? collectionNames : 'None');

    // Create collections if they don't exist
    const collectionsToCreate = ['Teams', 'TeamScores', 'Questions'];
    
    for (const collectionName of collectionsToCreate) {
      if (!collectionNames.includes(collectionName.toLowerCase())) {
        await db.createCollection(collectionName);
        console.log(`Created collection: ${collectionName}`);
      } else {
        console.log(`Collection already exists: ${collectionName}`);
      }
    }

    console.log('\nDatabase setup completed!');
    console.log('Database name: cp-events');
    console.log('Collections:', collectionsToCreate.join(', '));
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
