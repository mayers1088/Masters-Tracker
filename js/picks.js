// 2026 Masters Pool - Participant Picks
// Name map translates pick names to exact ESPN displayName values

const GOLFER_NAME_MAP = {
  "Scottie Scheffler": "Scottie Scheffler",
  "Tommy Fleetwood": "Tommy Fleetwood",
  "Bryson DeChambeau": "Bryson DeChambeau",
  "Si Woo Kim": "Si Woo Kim",
  "Jacob Bridgeman": "Jacob Bridgeman",
  "Max Homa": "Max Homa",
  "Rasmus Højgaard": "Rasmus Højgaard",
  "Zach Johnson": "Zach Johnson",
  "Ludvig Åberg": "Ludvig Åberg",
  "Xander Schauffele": "Xander Schauffele",
  "Maverick McNealy": "Maverick McNealy",
  "Gary Woodland": "Gary Woodland",
  "Sam Stevens": "Sam Stevens",
  "Dustin Johnson": "Dustin Johnson",
  "Ángel Cabrera": "Ángel Cabrera",
  "Angel Cabrera": "Ángel Cabrera",
  "Sam Burns": "Sam Burns",
  "Daniel Berger": "Daniel Berger",
  "Davis Riley": "Davis Riley",
  "Jon Rahm": "Jon Rahm",
  "Shane Lowry": "Shane Lowry",
  "Viktor Hovland": "Viktor Hovland",
  "Wyndham Clark": "Wyndham Clark",
  "Cameron Young": "Cameron Young",
  "Akshay Bhatia": "Akshay Bhatia",
  "Justin Thomas": "Justin Thomas",
  "Michael Kim": "Michael Kim",
  "Aaron Rai": "Aaron Rai",
  "Jake Knapp": "Jake Knapp",
  "Brian Harman": "Brian Harman",
  "Andrew Novak": "Andrew Novak",
  "Matt McCarty": "Matt McCarty",
  "Matt Fitzpatrick": "Matt Fitzpatrick",
  "Justin Rose": "Justin Rose",
  "Ben Griffin": "Ben Griffin",
  "Patrick Cantlay": "Patrick Cantlay",
  "Russell Henley": "Russell Henley",
  "Sepp Straka": "Sepp Straka",
  "Rasmus Neergaard-Petersen": "Rasmus Neergaard-Petersen",
  "Hideki Matsuyama": "Hideki Matsuyama",
  "Sungjae Im": "Sungjae Im",
  "Harris English": "Harris English",
  "Nicolai Højgaard": "Nicolai Højgaard",
  "Collin Morikawa": "Collin Morikawa",
  "Sergio Garcia": "Sergio García",
  "Sergio García": "Sergio García",
  "Charl Schwartzel": "Charl Schwartzel",
  "Cameron Smith": "Cameron Smith",
  "J.J. Spaun": "J.J. Spaun",
  "Rory McIlroy": "Rory McIlroy",
  "Bubba Watson": "Bubba Watson",
  "Michael Brennan": "Michael Brennan",
  "John Keefer": "Johnny Keefer",
  "Johnny Keefer": "Johnny Keefer",
  "Keegan Bradley": "Keegan Bradley",
  "Jason Day": "Jason Day"
};

const PARTICIPANTS = [
  {
    name: "Kailee McClintock",
    tiebreaker: -13,
    picks: [
      { name: "Scottie Scheffler", group: "A" },
      { name: "Tommy Fleetwood", group: "A" },
      { name: "Bryson DeChambeau", group: "A" },
      { name: "Si Woo Kim", group: "B" },
      { name: "Jacob Bridgeman", group: "B" },
      { name: "Max Homa", group: "C" },
      { name: "Rasmus Højgaard", group: "C" },
      { name: "Zach Johnson", group: "D" }
    ]
  },
  {
    name: "Justin McMartin",
    tiebreaker: -4,
    picks: [
      { name: "Scottie Scheffler", group: "A" },
      { name: "Ludvig Åberg", group: "A" },
      { name: "Xander Schauffele", group: "A" },
      { name: "Maverick McNealy", group: "B" },
      { name: "Gary Woodland", group: "B" },
      { name: "Sam Stevens", group: "C" },
      { name: "Dustin Johnson", group: "C" },
      { name: "Ángel Cabrera", group: "D" }
    ]
  },
  {
    name: "Paul Deasey",
    tiebreaker: -12,
    picks: [
      { name: "Scottie Scheffler", group: "A" },
      { name: "Ludvig Åberg", group: "A" },
      { name: "Xander Schauffele", group: "A" },
      { name: "Si Woo Kim", group: "B" },
      { name: "Sam Burns", group: "B" },
      { name: "Max Homa", group: "C" },
      { name: "Daniel Berger", group: "C" },
      { name: "Davis Riley", group: "D" }
    ]
  },
  {
    name: "Maxie Maggio",
    tiebreaker: -9,
    picks: [
      { name: "Scottie Scheffler", group: "A" },
      { name: "Jon Rahm", group: "A" },
      { name: "Xander Schauffele", group: "A" },
      { name: "Shane Lowry", group: "B" },
      { name: "Viktor Hovland", group: "B" },
      { name: "Max Homa", group: "C" },
      { name: "Wyndham Clark", group: "C" },
      { name: "Davis Riley", group: "D" }
    ]
  },
  {
    name: "Claire Reilly",
    tiebreaker: -14,
    picks: [
      { name: "Scottie Scheffler", group: "A" },
      { name: "Xander Schauffele", group: "A" },
      { name: "Cameron Young", group: "A" },
      { name: "Akshay Bhatia", group: "B" },
      { name: "Justin Thomas", group: "B" },
      { name: "Michael Kim", group: "C" },
      { name: "Aaron Rai", group: "C" },
      { name: "Davis Riley", group: "D" }
    ]
  },
  {
    name: "Jeff Schultz",
    tiebreaker: -17,
    picks: [
      { name: "Scottie Scheffler", group: "A" },
      { name: "Bryson DeChambeau", group: "A" },
      { name: "Xander Schauffele", group: "A" },
      { name: "Akshay Bhatia", group: "B" },
      { name: "Jake Knapp", group: "B" },
      { name: "Brian Harman", group: "C" },
      { name: "Daniel Berger", group: "C" },
      { name: "Andrew Novak", group: "D" }
    ]
  },
  {
    name: "Mike Lind",
    tiebreaker: -10,
    picks: [
      { name: "Scottie Scheffler", group: "A" },
      { name: "Jon Rahm", group: "A" },
      { name: "Ludvig Åberg", group: "A" },
      { name: "Akshay Bhatia", group: "B" },
      { name: "Jacob Bridgeman", group: "B" },
      { name: "Daniel Berger", group: "C" },
      { name: "Sam Stevens", group: "C" },
      { name: "Matt McCarty", group: "D" }
    ]
  },
  {
    name: "Kat Kotula",
    tiebreaker: -13,
    picks: [
      { name: "Matt Fitzpatrick", group: "A" },
      { name: "Justin Rose", group: "A" },
      { name: "Bryson DeChambeau", group: "A" },
      { name: "Sam Burns", group: "B" },
      { name: "Viktor Hovland", group: "B" },
      { name: "Ben Griffin", group: "C" },
      { name: "Keegan Bradley", group: "C" },
      { name: "Charl Schwartzel", group: "D" }
    ]
  },
  {
    name: "Paul Rynda",
    tiebreaker: -15,
    picks: [
      { name: "Scottie Scheffler", group: "A" },
      { name: "Ludvig Åberg", group: "A" },
      { name: "Xander Schauffele", group: "A" },
      { name: "Patrick Cantlay", group: "B" },
      { name: "Viktor Hovland", group: "B" },
      { name: "Max Homa", group: "C" },
      { name: "Dustin Johnson", group: "C" },
      { name: "Bubba Watson", group: "D" }
    ]
  },
  {
    name: "Matt Ayers",
    tiebreaker: -12,
    picks: [
      { name: "Scottie Scheffler", group: "A" },
      { name: "Ludvig Åberg", group: "A" },
      { name: "Justin Rose", group: "A" },
      { name: "Russell Henley", group: "B" },
      { name: "Sepp Straka", group: "B" },
      { name: "Brian Harman", group: "C" },
      { name: "Rasmus Højgaard", group: "C" },
      { name: "Rasmus Neergaard-Petersen", group: "D" }
    ]
  },
  {
    name: "Don McClintock",
    tiebreaker: -10,
    picks: [
      { name: "Ludvig Åberg", group: "A" },
      { name: "Scottie Scheffler", group: "A" },
      { name: "Jon Rahm", group: "A" },
      { name: "Jake Knapp", group: "B" },
      { name: "Shane Lowry", group: "B" },
      { name: "Rasmus Højgaard", group: "C" },
      { name: "Daniel Berger", group: "C" },
      { name: "Michael Brennan", group: "D" }
    ]
  },
  {
    name: "Drew Swenhaugen",
    tiebreaker: -13,
    picks: [
      { name: "Scottie Scheffler", group: "A" },
      { name: "Hideki Matsuyama", group: "A" },
      { name: "Xander Schauffele", group: "A" },
      { name: "Viktor Hovland", group: "B" },
      { name: "Sungjae Im", group: "B" },
      { name: "Max Homa", group: "C" },
      { name: "Daniel Berger", group: "C" },
      { name: "Zach Johnson", group: "D" }
    ]
  },
  {
    name: "Kelly Bundy",
    tiebreaker: -13,
    picks: [
      { name: "Scottie Scheffler", group: "A" },
      { name: "Ludvig Åberg", group: "A" },
      { name: "Jon Rahm", group: "A" },
      { name: "Jake Knapp", group: "B" },
      { name: "Harris English", group: "B" },
      { name: "Dustin Johnson", group: "C" },
      { name: "Max Homa", group: "C" },
      { name: "Bubba Watson", group: "D" }
    ]
  },
  {
    name: "Ashley Ayers",
    tiebreaker: -10,
    picks: [
      { name: "Ludvig Åberg", group: "A" },
      { name: "Xander Schauffele", group: "A" },
      { name: "Collin Morikawa", group: "A" },
      { name: "Nicolai Højgaard", group: "B" },
      { name: "Jacob Bridgeman", group: "B" },
      { name: "Max Homa", group: "C" },
      { name: "Sergio García", group: "C" },
      { name: "Charl Schwartzel", group: "D" }
    ]
  },
  {
    name: "Angie Schroeter",
    tiebreaker: -2,
    picks: [
      { name: "Ludvig Åberg", group: "A" },
      { name: "Tommy Fleetwood", group: "A" },
      { name: "Xander Schauffele", group: "A" },
      { name: "Jake Knapp", group: "B" },
      { name: "Cameron Smith", group: "B" },
      { name: "Max Homa", group: "C" },
      { name: "Daniel Berger", group: "C" },
      { name: "Andrew Novak", group: "D" }
    ]
  },
  {
    name: "Alex Holmberg",
    tiebreaker: -14,
    picks: [
      { name: "Bryson DeChambeau", group: "A" },
      { name: "Matt Fitzpatrick", group: "A" },
      { name: "Cameron Young", group: "A" },
      { name: "J.J. Spaun", group: "B" },
      { name: "Akshay Bhatia", group: "B" },
      { name: "Max Homa", group: "C" },
      { name: "Ben Griffin", group: "C" },
      { name: "Charl Schwartzel", group: "D" }
    ]
  },
  {
    name: "Matt Quinnild",
    tiebreaker: -13,
    picks: [
      { name: "Bryson DeChambeau", group: "A" },
      { name: "Rory McIlroy", group: "A" },
      { name: "Jon Rahm", group: "A" },
      { name: "Akshay Bhatia", group: "B" },
      { name: "Shane Lowry", group: "B" },
      { name: "Max Homa", group: "C" },
      { name: "Aaron Rai", group: "C" },
      { name: "Johnny Keefer", group: "D" }
    ]
  },
  {
    name: "Kacie Kloempken",
    tiebreaker: -14,
    picks: [
      { name: "Scottie Scheffler", group: "A" },
      { name: "Bryson DeChambeau", group: "A" },
      { name: "Tommy Fleetwood", group: "A" },
      { name: "Jake Knapp", group: "B" },
      { name: "Jason Day", group: "B" },
      { name: "Max Homa", group: "C" },
      { name: "Rasmus Højgaard", group: "C" },
      { name: "Davis Riley", group: "D" }
    ]
  }
];
