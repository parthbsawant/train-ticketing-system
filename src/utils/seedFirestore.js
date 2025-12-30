// Utility script to seed Firestore with train data
// Run this in browser console after Firebase is initialized

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { seedTrains } from '../seedData';

export const seedFirestore = async () => {
  try {
    console.log('Starting to seed trains...');
    
    for (const train of seedTrains) {
      const { id, ...trainData } = train;
      const docRef = await addDoc(collection(db, 'trains'), trainData);
      console.log(`✓ Added train: ${train.name} (ID: ${docRef.id})`);
    }
    
    console.log('✅ All trains seeded successfully!');
    return { success: true, message: 'All trains seeded successfully!' };
  } catch (error) {
    console.error('❌ Error seeding trains:', error);
    return { success: false, error: error.message };
  }
};

// To use this script:
// 1. Import it in your component or run in browser console:
//    import { seedFirestore } from './utils/seedFirestore';
//    await seedFirestore();
// 2. Or add a button in your app (temporarily) to seed the data

