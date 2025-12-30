# 🧪 Complete Testing Guide - Get Your App Fully Working

## ✅ Step 1: Test User Signup

1. **Open your app** in browser (`http://localhost:5173`)
2. Click **"Login"** in the navbar (top right)
3. Click **"Sign Up"** link at the bottom
4. Fill the form:
   - **Name:** `John Doe`
   - **Email:** `john@example.com`
   - **Password:** `password123` (minimum 6 characters)
   - **Confirm Password:** `password123`
5. Click **"Sign Up"** button

✅ **Expected Result:**
- Toast message: "Account created successfully!"
- Automatically redirected to home page
- Your name appears in navbar (top right)

❌ **If it fails:**
- Check browser console (F12) for errors
- Verify Authentication is enabled in Firebase Console
- Check if email/password format is correct

---

## ✅ Step 2: Test Login

1. Click **"Logout"** button (if you're logged in)
2. Click **"Login"** in navbar
3. Enter credentials:
   - **Email:** `john@example.com`
   - **Password:** `password123`
4. Click **"Sign In"**

✅ **Expected Result:**
- Toast message: "Logged in successfully!"
- Redirected to home page
- Your name appears in navbar

❌ **If it fails:**
- Check if account was created successfully
- Verify email/password are correct
- Check browser console for errors

---

## ✅ Step 3: Test Train Search

1. On the **home page**, fill the search form:
   - **From:** `Mumbai`
   - **To:** `Ahmedabad`
   - **Date:** Select any future date (click calendar icon)
2. Click **"Search Trains"** button

✅ **Expected Result:**
- Redirected to search results page
- See train card(s) showing:
  - Train name: "Vande Bharat Express"
  - Train number: "22201"
  - Route: Mumbai → Ahmedabad
  - Departure/Arrival times
  - Available classes with prices
  - "Book Now" button

❌ **If no results:**
- Verify you seeded the data correctly
- Check Firestore → trains collection has 8 documents
- Try different cities: "Delhi", "Goa", "Chennai"
- Check browser console for errors

---

## ✅ Step 4: Test Booking Flow

### 4.1 Select Train and Class
1. Click **"Book Now"** on any train card
2. ✅ Should redirect to booking page (if logged in)
3. ✅ Should see step indicator: "1️⃣ Search → 2️⃣ Details → 3️⃣ Confirm"
4. ✅ Should see train summary card
5. Select a **class** (e.g., click "ChairCar")
6. ✅ Selected class should highlight

### 4.2 Add Passenger Details
1. Fill passenger form:
   - **Name:** `John Doe`
   - **Age:** `25`
   - **Gender:** `Male` (select from dropdown)
2. ✅ Can add more passengers (click "Add Passenger" button)
3. ✅ Can remove passengers (click minus icon)
4. Scroll down to see **Booking Summary**:
   - Base Fare: ₹1200 (or your selected class price)
   - Total Passengers: 1
   - **Total Amount:** ₹1200
5. Click **"Continue to Confirm Booking"**

✅ **Expected Result:**
- Redirected to confirm page
- Step indicator shows: "1️⃣ Search → 2️⃣ Details → 3️⃣ Confirm" (step 3 highlighted)

### 4.3 Confirm and Pay
1. ✅ Review all details:
   - Train summary
   - Passenger list
   - Fare details
2. Click **"Pay Now"** button
3. ✅ Should see loading spinner: "Processing Payment..."
4. Wait 2-3 seconds

✅ **Expected Result:**
- Toast message: "Payment successful!"
- Redirected to ticket page
- See green checkmark ✅
- See "Payment Successful!" message

---

## ✅ Step 5: Test Ticket Download

1. On the **ticket page**, you should see:
   - ✅ "Payment Successful!" message
   - ✅ Train details (name, number, route)
   - ✅ Date and class
   - ✅ Passenger details
   - ✅ Total amount paid
   - ✅ Booking ID (e.g., "TNE1234567890ABCDE")
2. Click **"Download Ticket (PDF)"** button
3. ✅ PDF should download automatically
4. ✅ Open PDF to verify all details are correct

✅ **Expected Result:**
- PDF downloads successfully
- All ticket information is visible in PDF
- Booking ID is unique

---

## ✅ Step 6: Test Booking History

1. Click **"Bookings"** in the navbar
2. ✅ Should see your booking listed:
   - Train name and number
   - Route (From → To)
   - Class type
   - Number of passengers
   - Total amount
   - Booking date
   - "View Ticket" button
3. Click **"View Ticket"** button
4. ✅ Should navigate to ticket page with same booking

✅ **Expected Result:**
- All bookings are listed
- Can view any previous booking
- Booking details are accurate

---

## ✅ Step 7: Test Multiple Features

### 7.1 Search Different Routes
- Try: **Mumbai → Delhi** (should show Rajdhani Express)
- Try: **Delhi → Agra** (should show Gatimaan Express)
- Try: **Chennai → Bangalore** (should show Chennai Express)

### 7.2 Book Multiple Passengers
1. Search for a train
2. Click "Book Now"
3. Add 2-3 passengers with different details
4. Verify total amount = (base fare × number of passengers)

### 7.3 Test Logout/Login
1. Click "Logout"
2. ✅ Should redirect to home page
3. ✅ Navbar should show "Login" button
4. Login again with same credentials
5. ✅ Should work smoothly

---

## 🎉 Success Checklist

Your app is fully working when:

- [x] ✅ Can create new account
- [x] ✅ Can login with credentials
- [x] ✅ Can search for trains
- [x] ✅ Can see train results
- [x] ✅ Can select train and class
- [x] ✅ Can add passenger details
- [x] ✅ Can confirm booking
- [x] ✅ Can complete mock payment
- [x] ✅ Can view ticket
- [x] ✅ Can download PDF ticket
- [x] ✅ Can view booking history
- [x] ✅ Can logout and login again

---

## ❌ Common Issues & Solutions

### Issue: "No trains found"
**Solution:**
- Verify Firestore has trains collection with 8 documents
- Check city names match exactly: "Mumbai", "Delhi", "Ahmedabad"
- Try searching with different city combinations

### Issue: "Permission denied" when booking
**Solution:**
- Check Firestore rules are published correctly
- Verify you're logged in
- Check browser console for specific error

### Issue: PDF download not working
**Solution:**
- Check browser console for errors
- Try different browser (Chrome recommended)
- Verify html2canvas and jspdf libraries are installed

### Issue: Booking not showing in history
**Solution:**
- Refresh the page
- Check Firestore → bookings collection exists
- Verify booking document has correct userId

---

## 🔒 Important: Lock Firestore Rules Again!

After testing, **lock the trains collection** for security:

1. Go to Firebase Console → Firestore → Rules
2. Change:
   ```javascript
   match /trains/{trainId} {
     allow read: if true;
     allow write: if true;  // ← Change this back
   }
   ```
3. To:
   ```javascript
   match /trains/{trainId} {
     allow read: if true;
     allow write: if false;  // ← Lock it!
   }
   ```
4. Click **"Publish"**

This prevents unauthorized train modifications.

---

## 📊 Verify Data in Firestore

### Check Collections:
1. **users** collection:
   - Should have your user document
   - Fields: uid, name, email, createdAt

2. **trains** collection:
   - Should have 8 train documents
   - Each has: name, number, from, to, classes, etc.

3. **bookings** collection:
   - Should have booking documents after you book
   - Fields: bookingId, userId, trainId, passengers, amount, status

---

## 🎯 Next Steps (Optional Enhancements)

Once everything works, you can:

1. **Remove seed button** from Home page (it's temporary)
2. **Add more trains** manually in Firestore
3. **Customize styling** if needed
4. **Add admin panel** to manage trains
5. **Deploy to Firebase Hosting**

---

## 🎉 Congratulations!

If all tests pass, your Train Ticketing System is **fully functional**! 🚀

You can now:
- Create accounts
- Search trains
- Book tickets
- Download PDFs
- View booking history

Enjoy your working app! 🎊

