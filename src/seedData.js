// Seed data script for Firestore trains collection
// Run this in Firebase Console or using a script

export const seedTrains = [
  {
    id: "1",
    name: "Vande Bharat Express",
    number: "22201",
    from: "Mumbai",
    to: "Ahmedabad",
    departure: "06:00 AM",
    arrival: "11:00 AM",
    duration: "5h 00m",
    classes: {
      "ChairCar": { seats: 50, price: 1200 },
      "Executive": { seats: 20, price: 2200 }
    }
  },
  {
    id: "2",
    name: "Tejas Express",
    number: "22119",
    from: "Mumbai",
    to: "Goa",
    departure: "05:00 AM",
    arrival: "01:00 PM",
    duration: "8h 00m",
    classes: {
      "ChairCar": { seats: 40, price: 1500 },
      "Executive": { seats: 15, price: 2500 }
    }
  },
  {
    id: "3",
    name: "Rajdhani Express",
    number: "12951",
    from: "Mumbai",
    to: "Delhi",
    departure: "08:00 AM",
    arrival: "04:00 PM",
    duration: "8h 00m",
    classes: {
      "1AC": { seats: 10, price: 2500 },
      "2AC": { seats: 20, price: 1500 },
      "3AC": { seats: 30, price: 1000 },
      "Sleeper": { seats: 40, price: 500 }
    }
  },
  {
    id: "4",
    name: "Shatabdi Express",
    number: "12009",
    from: "Delhi",
    to: "Chandigarh",
    departure: "07:30 AM",
    arrival: "11:30 AM",
    duration: "4h 00m",
    classes: {
      "ChairCar": { seats: 50, price: 800 },
      "Executive": { seats: 20, price: 1400 }
    }
  },
  {
    id: "5",
    name: "Duronto Express",
    number: "12259",
    from: "Mumbai",
    to: "Delhi",
    departure: "10:00 PM",
    arrival: "06:00 AM",
    duration: "8h 00m",
    classes: {
      "2AC": { seats: 20, price: 1800 },
      "3AC": { seats: 30, price: 1200 },
      "Sleeper": { seats: 40, price: 600 }
    }
  },
  {
    id: "6",
    name: "Gatimaan Express",
    number: "12049",
    from: "Delhi",
    to: "Agra",
    departure: "08:10 AM",
    arrival: "09:50 AM",
    duration: "1h 40m",
    classes: {
      "ChairCar": { seats: 50, price: 600 },
      "Executive": { seats: 20, price: 1000 }
    }
  },
  {
    id: "7",
    name: "Chennai Express",
    number: "12604",
    from: "Chennai",
    to: "Bangalore",
    departure: "11:00 AM",
    arrival: "03:30 PM",
    duration: "4h 30m",
    classes: {
      "2AC": { seats: 20, price: 1200 },
      "3AC": { seats: 30, price: 800 },
      "Sleeper": { seats: 40, price: 400 }
    }
  },
  {
    id: "8",
    name: "Howrah Express",
    number: "12839",
    from: "Kolkata",
    to: "Puri",
    departure: "09:00 AM",
    arrival: "02:00 PM",
    duration: "5h 00m",
    classes: {
      "2AC": { seats: 20, price: 1100 },
      "3AC": { seats: 30, price: 700 },
      "Sleeper": { seats: 40, price: 350 }
    }
  }
];

// Script to seed Firestore (run this in browser console or as a script)
/*
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase/firebaseConfig';
import { seedTrains } from './seedData';

const seedFirestore = async () => {
  try {
    for (const train of seedTrains) {
      const { id, ...trainData } = train;
      await addDoc(collection(db, 'trains'), trainData);
      console.log(`Added train: ${train.name}`);
    }
    console.log('All trains seeded successfully!');
  } catch (error) {
    console.error('Error seeding trains:', error);
  }
};

seedFirestore();
*/

