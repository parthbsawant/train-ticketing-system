# 🔥 Complete Firebase Setup Guide - Step by Step

Follow these steps **EXACTLY** to get your Train Ticketing System working:

---

## ✅ STEP 1: Enable Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **"Train Ticketing System"**
3. Click on **"Authentication"** in the left sidebar
4. If you see "Get started" button, click it
5. Click on the **"Sign-in method"** tab
6. Click on **"Email/Password"**
7. **Toggle "Enable"** to ON
8. Click **"Save"**

✅ **Checkpoint:** You should see "Email/Password" enabled with a green checkmark

---

## ✅ STEP 2: Set Up Firestore Security Rules

1. In Firebase Console, click on **"Firestore Database"** in the left sidebar
2. Click on the **"Rules"** tab
3. **Delete all existing rules** and paste this:

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

4. Click **"Publish"** button
5. Confirm by clicking "Publish" again

✅ **Checkpoint:** Rules should show as "Published"

---

## ✅ STEP 3: Seed Train Data

### Option A: Using the Seed Button (Easiest)

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your app in browser (usually `http://localhost:5173`)

3. You should see a blue button: **"Seed Train Data (One-time setup)"**

4. Click the button

5. Wait for success message: "Successfully seeded 8 trains!"

6. Go back to Firebase Console → Firestore Database → Data tab
   - You should see a collection called **"trains"**
   - It should have 8 documents

✅ **Checkpoint:** You should see 8 train documents in Firestore

### Option B: Manual Seeding (If button doesn't work)

1. Go to Firebase Console → Firestore Database → Data tab
2. Click **"Start collection"**
3. Collection ID: `trains`
4. Click "Next"
5. Add a document with these fields:
   - Field: `name` → Type: `string` → Value: `Vande Bharat Express`
   - Field: `number` → Type: `string` → Value: `22201`
   - Field: `from` → Type: `string` → Value: `Mumbai`
   - Field: `to` → Type: `string` → Value: `Ahmedabad`
   - Field: `departure` → Type: `string` → Value: `06:00 AM`
   - Field: `arrival` → Type: `string` → Value: `11:00 AM`
   - Field: `duration` → Type: `string` → Value: `5h 00m`
   - Field: `classes` → Type: `map` → Click to add nested fields:
     - `ChairCar` (map):
       - `seats` (number): `50`
       - `price` (number): `1200`
     - `Executive` (map):
       - `seats` (number): `20`
       - `price` (number): `2200`
6. Click "Save"
7. Repeat for more trains (check `src/seedData.js` for all train data)

---

## ✅ STEP 4: Test the Application

### 4.1 Create an Account

1. Open your app: `http://localhost:5173`
2. Click **"Login"** in the navbar
3. Click **"Sign Up"** link at the bottom
4. Fill in the form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123` (min 6 characters)
   - Confirm Password: `password123`
5. Click **"Sign Up"**
6. ✅ You should see: "Account created successfully!"
7. ✅ You should be redirected to home page

### 4.2 Login

1. Click **"Logout"** (if you're logged in)
2. Click **"Login"**
3. Enter:
   - Email: `test@example.com`
   - Password: `password123`
4. Click **"Sign In"**
5. ✅ You should see: "Logged in successfully!"
6. ✅ You should see your name in the navbar

### 4.3 Search Trains

1. On the home page, fill in the search form:
   - From: `Mumbai`
   - To: `Ahmedabad`
   - Date: Select any future date
2. Click **"Search Trains"**
3. ✅ You should see search results with train cards

### 4.4 Book a Ticket

1. Click **"Book Now"** on any train
2. ✅ You should be redirected to booking page (if logged in)
3. Select a class (e.g., "ChairCar")
4. Fill passenger details:
   - Name: `John Doe`
   - Age: `25`
   - Gender: `Male`
5. Click **"Continue to Confirm Booking"**
6. Review details and click **"Pay Now"**
7. ✅ You should see "Payment successful!"
8. ✅ You should see your ticket

### 4.5 View Bookings

1. Click **"Bookings"** in the navbar
2. ✅ You should see your booking listed

---

## 🔍 Troubleshooting

### Problem: "Cannot read properties of undefined"
**Solution:** Make sure Firebase config is correct in `src/firebase/firebaseConfig.js`

### Problem: Login button does nothing
**Solution:** 
1. Check browser console (F12) for errors
2. Make sure Authentication is enabled
3. Check Firestore rules are published

### Problem: "Permission denied" error
**Solution:** 
1. Check Firestore rules are correct (Step 2)
2. Make sure you're logged in
3. Check rules are published

### Problem: "No trains found"
**Solution:**
1. Make sure you seeded the data (Step 3)
2. Check Firestore → trains collection exists
3. Try searching with exact city names: "Mumbai", "Delhi", "Ahmedabad"

### Problem: Seed button doesn't work
**Solution:**
1. Check browser console (F12) for errors
2. Make sure Firestore rules allow reading trains (they should)
3. Try manual seeding (Option B in Step 3)

---

## ✅ Final Checklist

Before testing, make sure:

- [ ] Firebase Authentication is enabled (Email/Password)
- [ ] Firestore Security Rules are published
- [ ] Train data is seeded (8 trains in Firestore)
- [ ] Development server is running (`npm run dev`)
- [ ] No errors in browser console (F12)
- [ ] Firebase config is correct

---

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ You can create an account
2. ✅ You can login
3. ✅ You can search for trains
4. ✅ You can book tickets
5. ✅ You can download tickets as PDF
6. ✅ You can view your bookings

---

## 📞 Still Having Issues?

1. Open browser console (F12 → Console tab)
2. Look for red error messages
3. Check the error message
4. Common issues:
   - "auth/configuration-not-found" → Authentication not enabled
   - "permission-denied" → Firestore rules not correct
   - "document-not-found" → Train data not seeded
   - Network errors → Check Firebase config

If you see specific errors, share them and I'll help you fix them!

