// 


// Auto-generated large dataset (300+ trains)

const cities = [
  "Mumbai", "Pune", "Delhi", "Ahmedabad", "Jaipur", "Surat",
  "Nagpur", "Bhopal", "Indore", "Chennai", "Bengaluru", "Hyderabad",
  "Kolkata", "Patna", "Lucknow", "Kanpur", "Varanasi", "Amritsar",
  "Chandigarh", "Dehradun", "Goa", "Madgaon", "Kochi", "Trivandrum"
];

const types = ["Express", "Superfast", "Shatabdi", "Intercity", "Mail", "Rajdhani"];

function randomTime() {
  const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `${h}:${m}`;
}

function randomDuration() {
  const h = Math.floor(Math.random() * 15) + 2;
  const m = Math.floor(Math.random() * 60);
  return `${h}h ${m}m`;
}

export const indianTrains = Array.from({ length: 320 }, (_, i) => {
  let from = cities[Math.floor(Math.random() * cities.length)];
  let to;

  do {
    to = cities[Math.floor(Math.random() * cities.length)];
  } while (to === from);

  const type = types[i % types.length];

  return {
    name: `${from} ${to} ${type}`,
    number: (12000 + i).toString(),
    from,
    to,
    departure: randomTime(),
    arrival: randomTime(),
    duration: randomDuration(),
    type,
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    classes: {
      ChairCar: { seats: 120, price: 800 + (i % 5) * 100 },
      Executive: { seats: 40, price: 1500 + (i % 5) * 200 }
    }
  };
});
