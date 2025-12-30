// src/data/indianTrains.dataset.js

export const indianTrains = [
  {
    name: "Vande Bharat Express",
    number: "22201",
    from: "Mumbai",
    to: "Ahmedabad",
    departure: "06:00",
    arrival: "11:00",
    duration: "5h 00m",
    type: "Vande Bharat",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    classes: {
      ChairCar: { seats: 120, price: 1200 },
      Executive: { seats: 56, price: 2200 }
    }
  },
  {
    name: "Rajdhani Express",
    number: "12951",
    from: "Mumbai",
    to: "Delhi",
    departure: "16:55",
    arrival: "08:35",
    duration: "15h 40m",
    type: "Rajdhani",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: {
      "1AC": { seats: 24, price: 4200 },
      "2AC": { seats: 48, price: 2800 },
      "3AC": { seats: 64, price: 1900 }
    }
  },
  {
    name: "Shatabdi Express",
    number: "12009",
    from: "Mumbai",
    to: "Pune",
    departure: "07:10",
    arrival: "10:25",
    duration: "3h 15m",
    type: "Shatabdi",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    classes: {
      ChairCar: { seats: 150, price: 900 },
      Executive: { seats: 40, price: 1600 }
    }
  }
];
