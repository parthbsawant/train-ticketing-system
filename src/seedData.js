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
  },
  {
    id: "9",
    name: "Mumbai Pune Intercity",
    number: "12127",
    from: "Mumbai",
    to: "Pune",
    departure: "06:10 AM",
    arrival: "09:20 AM",
    duration: "3h 10m",
    classes: {
      "ChairCar": { seats: 90, price: 450 }
    }
  },
  {
    id: "10",
    name: "Deccan Queen",
    number: "12124",
    from: "Pune",
    to: "Mumbai",
    departure: "05:25 PM",
    arrival: "08:25 PM",
    duration: "3h 00m",
    classes: {
      "ChairCar": { seats: 90, price: 500 }
    }
  },
  {
    id: "11",
    name: "Mumbai Howrah Mail",
    number: "12810",
    from: "Mumbai",
    to: "Kolkata",
    departure: "08:30 PM",
    arrival: "05:00 AM",
    duration: "32h 30m",
    classes: {
      "2AC": { seats: 30, price: 2100 },
      "3AC": { seats: 60, price: 1500 },
      "Sleeper": { seats: 120, price: 700 }
    }
  },
  {
    id: "12",
    name: "Delhi Jaipur Express",
    number: "12986",
    from: "Delhi",
    to: "Jaipur",
    departure: "06:05 AM",
    arrival: "10:40 AM",
    duration: "4h 35m",
    classes: {
      "2AC": { seats: 25, price: 1200 },
      "3AC": { seats: 40, price: 850 },
      "Sleeper": { seats: 80, price: 400 }
    }
  },
  {
    id: "13",
    name: "Lucknow Shatabdi",
    number: "12004",
    from: "Delhi",
    to: "Lucknow",
    departure: "06:10 AM",
    arrival: "12:30 PM",
    duration: "6h 20m",
    classes: {
      "ChairCar": { seats: 80, price: 900 },
      "Executive": { seats: 20, price: 1600 }
    }
  },
  {
    id: "14",
    name: "Bhopal Shatabdi",
    number: "12002",
    from: "Delhi",
    to: "Bhopal",
    departure: "06:00 AM",
    arrival: "02:30 PM",
    duration: "8h 30m",
    classes: {
      "ChairCar": { seats: 90, price: 1100 },
      "Executive": { seats: 25, price: 2000 }
    }
  },
  {
    id: "15",
    name: "Karnataka Express",
    number: "12628",
    from: "Bangalore",
    to: "Delhi",
    departure: "07:20 PM",
    arrival: "04:15 AM",
    duration: "44h 55m",
    classes: {
      "2AC": { seats: 40, price: 2600 },
      "3AC": { seats: 70, price: 1800 },
      "Sleeper": { seats: 140, price: 850 }
    }
  },
  {
    id: "16",
    name: "Udyan Express",
    number: "11301",
    from: "Mumbai",
    to: "Bangalore",
    departure: "08:05 AM",
    arrival: "08:00 PM",
    duration: "35h 55m",
    classes: {
      "2AC": { seats: 30, price: 2200 },
      "3AC": { seats: 60, price: 1500 },
      "Sleeper": { seats: 120, price: 750 }
    }
  },
  {
    id: "17",
    name: "Goa Sampark Kranti",
    number: "12650",
    from: "Delhi",
    to: "Goa",
    departure: "04:20 PM",
    arrival: "06:30 PM",
    duration: "26h 10m",
    classes: {
      "2AC": { seats: 35, price: 2400 },
      "3AC": { seats: 65, price: 1700 },
      "Sleeper": { seats: 130, price: 800 }
    }
  },
  {
    id: "18",
    name: "Amritsar Shatabdi",
    number: "12014",
    from: "Delhi",
    to: "Amritsar",
    departure: "04:30 PM",
    arrival: "10:30 PM",
    duration: "6h 00m",
    classes: {
      "ChairCar": { seats: 80, price: 900 },
      "Executive": { seats: 20, price: 1700 }
    }
  },
  {
    id: "19",
    name: "Patna Rajdhani",
    number: "12310",
    from: "Delhi",
    to: "Patna",
    departure: "07:10 PM",
    arrival: "07:40 AM",
    duration: "12h 30m",
    classes: {
      "1AC": { seats: 10, price: 4200 },
      "2AC": { seats: 30, price: 2500 },
      "3AC": { seats: 60, price: 1800 }
    }
  },
  {
    id: "20",
    name: "Bangalore Chennai Express",
    number: "12608",
    from: "Bangalore",
    to: "Chennai",
    departure: "06:00 AM",
    arrival: "11:30 AM",
    duration: "5h 30m",
    classes: {
      "2AC": { seats: 25, price: 1300 },
      "3AC": { seats: 40, price: 900 },
      "Sleeper": { seats: 80, price: 450 }
    }
  }
];