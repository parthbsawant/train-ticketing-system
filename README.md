# 🚆 TrainEase - Train Ticket Booking System

A modern, responsive train ticket booking system built with React.js, Firebase, and Tailwind CSS.

## ✨ Features

- 🔐 **User Authentication** - Secure login/signup with Firebase Auth
- 🔍 **Train Search** - Search trains by source, destination, and date
- 🎫 **Ticket Booking** - Book tickets with multiple passengers
- 💳 **Mock Payment** - Simulated payment processing
- 📄 **PDF Downloads** - Download tickets as PDF
- 🎨 **Modern UI** - Beautiful, responsive design with Framer Motion animations
- 📱 **Mobile Responsive** - Works seamlessly on all devices

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS + Framer Motion
- **Backend**: Firebase (Auth + Firestore)
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast
- **PDF Generation**: jsPDF + html2canvas
- **Icons**: React Icons

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Train_Ticketing_System/Cursor_Version
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config to `src/firebase/firebaseConfig.js`

4. Seed the database:
   - Use the seed data from `src/seedData.js`
   - Add trains to your Firestore `trains` collection

5. Start the development server:
```bash
npm run dev
```

## 🔧 Firebase Configuration

1. Go to Firebase Console > Project Settings > General
2. Scroll down to "Your apps" and copy the config
3. Replace the placeholder values in `src/firebase/firebaseConfig.js`:

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

## 📊 Firestore Collections

### `users`
```javascript
{
  uid: string,
  name: string,
  email: string,
  createdAt: timestamp
}
```

### `trains`
```javascript
{
  name: string,
  number: string,
  from: string,
  to: string,
  departure: string,
  arrival: string,
  duration: string,
  classes: {
    "1AC": { seats: number, price: number },
    "2AC": { seats: number, price: number },
    // ... more classes
  }
}
```

### `bookings`
```javascript
{
  bookingId: string,
  userId: string,
  trainId: string,
  classType: string,
  passengers: [{ name, age, gender }],
  amount: number,
  status: "Paid",
  createdAt: timestamp
}
```

## 🔒 Firestore Security Rules

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    },
    "bookings": {
      "$bookingId": {
        ".read": "auth != null && resource.data.userId == auth.uid",
        ".write": "auth != null && request.resource.data.userId == auth.uid"
      }
    },
    "trains": {
      ".read": true,
      ".write": false
    }
  }
}
```

## 🚀 Deployment

### Build for production:
```bash
npm run build
```

### Deploy to Firebase Hosting:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📝 Routes

- `/` - Home page (search trains)
- `/search` - Search results
- `/booking/:trainId` - Booking page (protected)
- `/confirm` - Confirm details (protected)
- `/ticket/:bookingId` - Ticket page (protected)
- `/login` - Login page
- `/signup` - Signup page

## 🎨 Design System

### Colors
- **Primary**: #1B5E20 (Indian Railways Green)
- **Secondary**: #FF9800 (Orange)
- **Accent**: #2196F3 (Blue)
- **Background**: #F9FAFB
- **Success**: #43A047
- **Error**: #E53935

### Typography
- **Headings**: Poppins (600-700)
- **Body**: Inter (400)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@trainease.com or open an issue in the repository.
