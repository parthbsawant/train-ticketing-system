# 🚆 TrainEase Setup Guide

## Quick Start

1. **Install Dependencies** (already done)
```bash
npm install
```

2. **Configure Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use an existing one
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config to `src/firebase/firebaseConfig.js`

3. **Seed the Database**
   - Use the seed data from `src/seedData.js`
   - Add trains to your Firestore `trains` collection
   - You can use the utility script in `src/utils/seedFirestore.js`

4. **Start Development Server**
```bash
npm run dev
```

## Firebase Setup Steps

1. **Create Firebase Project**
   - Visit https://console.firebase.google.com/
   - Click "Add project"
   - Follow the setup wizard

2. **Enable Authentication**
   - Go to Authentication > Sign-in method
   - Enable "Email/Password"
   - Save

3. **Create Firestore Database**
   - Go to Firestore Database
   - Click "Create database"
   - Start in test mode (we'll add security rules later)

4. **Get Firebase Config**
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps"
   - Click the web icon (</>)
   - Copy the config object

5. **Update firebaseConfig.js**
   Replace the placeholder values in `src/firebase/firebaseConfig.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id"
   };
   ```

## Seed Firestore Data

### Option 1: Using Firebase Console
1. Go to Firestore Database
2. Click "Start collection"
3. Collection ID: `trains`
4. Add documents manually using the seed data from `src/seedData.js`

### Option 2: Using Browser Console
1. Open your app in browser
2. Open browser console
3. Import and run the seed function:
   ```javascript
   import { seedFirestore } from './utils/seedFirestore';
   await seedFirestore();
   ```

### Option 3: Temporary Seed Button
Add this temporarily to your Home page to seed data:
```javascript
import { seedFirestore } from './utils/seedFirestore';
// Add a button that calls seedFirestore()
```

## Firestore Security Rules

After setting up, update your Firestore security rules:

1. Go to Firestore Database > Rules
2. Replace with:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /bookings/{bookingId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    match /trains/{trainId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Loader.jsx
│   ├── Navbar.jsx
│   ├── Stepper.jsx
│   ├── TicketCard.jsx
│   └── TrainCard.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── SearchResults.jsx
│   ├── Booking.jsx
│   ├── ConfirmDetails.jsx
│   ├── Ticket.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── Bookings.jsx
├── context/            # React Context
│   └── AuthContext.jsx
├── firebase/           # Firebase configuration
│   └── firebaseConfig.js
├── utils/              # Utility functions
│   └── seedFirestore.js
├── App.jsx             # Main app component
├── main.jsx            # Entry point
├── index.css           # Global styles
└── seedData.js         # Seed data for trains
```

## Features Implemented

✅ User Authentication (Login/Signup)
✅ Train Search
✅ Train Booking Flow
✅ Passenger Details Form
✅ Mock Payment Processing
✅ Ticket Generation & PDF Download
✅ Booking History
✅ Responsive Design
✅ Framer Motion Animations
✅ Tailwind CSS Styling

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Next Steps

1. Configure Firebase with your credentials
2. Seed the trains collection
3. Set up Firestore security rules
4. Test the booking flow
5. Deploy to Firebase Hosting (optional)

## Troubleshooting

**Build errors:**
- Make sure all dependencies are installed: `npm install`
- Check that Firebase config is correct

**Firebase errors:**
- Verify Firebase project is set up correctly
- Check that Authentication is enabled
- Ensure Firestore database is created

**Styling issues:**
- Clear browser cache
- Restart dev server

