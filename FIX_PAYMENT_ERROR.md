# 🔧 Fix "Payment Failed" Error - Step by Step

## ❌ The Problem

Both "Payment successful!" and "Payment failed" messages appear because:
1. **Firestore rules are blocking writes** to the `bookings` collection
2. The error is caught, but both toasts show due to timing issues

## ✅ Solution: Fix Firestore Rules for Bookings

### Step 1: Open Firestore Rules

1. Go to: https://console.firebase.google.com/
2. Select your project: **"Train Ticketing System"**
3. Click **"Firestore Database"** in left sidebar
4. Click **"Rules"** tab

### Step 2: Update Bookings Rules

**Your current rules should look like this:**

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
      allow write: if false;  // ← Should be false for security
    }
  }
}
```

### Step 3: Verify Rules Are Correct

**Important checks:**
- ✅ `bookings` collection has `allow create` rule
- ✅ The rule checks `request.resource.data.userId == request.auth.uid`
- ✅ Rules are **published** (not just saved)

### Step 4: Test Again

1. Go back to your app
2. Try booking again
3. Click "Pay Now"
4. ✅ Should see only "Payment successful!" message
5. ✅ Should redirect to ticket page

---

## 🔍 Debug: Check Browser Console

1. Open browser console: **F12** → **Console** tab
2. Click "Pay Now" button
3. Look for error messages:
   - `permission-denied` → Rules issue
   - `unavailable` → Network issue
   - Other errors → Share with me

---

## ✅ Complete Rules (Copy This Entire Block)

If your rules are different, replace everything with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Bookings: users can only read/write their own bookings
    match /bookings/{bookingId} {
      // Can read own bookings
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      // Can create bookings with own userId
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      // Can update/delete own bookings
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    // Trains: anyone can read, but no one can write (locked)
    match /trains/{trainId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

### Step 5: Publish Rules

1. Click **"Publish"** button
2. Wait for confirmation: "Rules published successfully"
3. ✅ Rules are now active

---

## 🧪 Test the Fix

1. **Clear browser cache** (optional but recommended):
   - Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

2. **Try booking again:**
   - Search for a train
   - Select class and add passenger
   - Click "Pay Now"

3. **Expected result:**
   - ✅ Only "Payment successful!" message appears
   - ✅ Redirects to ticket page
   - ✅ Can download PDF
   - ✅ Booking appears in "Bookings" page

---

## ❌ If Still Not Working

### Check 1: Are you logged in?
- Make sure you see your name in the navbar
- If not, login first

### Check 2: Browser Console Errors
1. Press **F12** → **Console** tab
2. Click "Pay Now"
3. Look for red error messages
4. Share the exact error with me

### Check 3: Firestore Rules Status
- Go to Firestore → Rules
- Make sure it says **"Published"** (not "Saved")
- If not published, click **"Publish"**

### Check 4: Verify Booking Collection
1. Go to Firestore → Data tab
2. Check if `bookings` collection exists
3. If it doesn't exist, that's fine - it will be created automatically
4. After booking, you should see a document in `bookings` collection

---

## 📋 Quick Checklist

Before testing payment:
- [ ] You are logged in (name visible in navbar)
- [ ] Firestore rules are published
- [ ] Bookings rules allow `create` for authenticated users
- [ ] Browser console shows no errors
- [ ] Internet connection is stable

---

## 🎉 Success!

Once payment works:
- ✅ Only one success message appears
- ✅ Booking is saved to Firestore
- ✅ Ticket page loads correctly
- ✅ PDF download works
- ✅ Booking appears in history

---

## 🔒 Security Note

The rules I provided are secure:
- ✅ Users can only create bookings with their own userId
- ✅ Users can only read their own bookings
- ✅ Trains are read-only for all users
- ✅ No one can modify trains through the app

This is the correct setup for your application!

