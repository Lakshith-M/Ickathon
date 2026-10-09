// Calculate score based on available factors
export function calculateScore(factors) {
    const weights = { availability: 0.30, cleanliness: 0.25, accessibility: 0.20, facilities: 0.15, affordability: 0.10 };
    let score = 0;
    let knownWeight = 0;
    let knownCount = 0;
    for (const [key, val] of Object.entries(factors)) {
        if (val !== undefined && val !== null) {
            score += weights[key] * val;
            knownWeight += weights[key];
            knownCount++;
        }
    }
    if (knownWeight === 0) return { score: 0, provisional: true, coverage: 0, knownCount: 0 };
    return {
        score: Math.round((score / knownWeight)),
        provisional: knownWeight < 1,
        coverage: Math.round(knownWeight * 100),
        knownCount
    };
}

export const demoData = [
  {
    "id": 1,
    "name": "SSN iFound (Incubation Foundation)",
    "lat": 12.751193,
    "lon": 80.197389,
    "distance": "374m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 70,
      "cleanliness": 83,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 2,
    "name": "SSN School of Advanced Career Education",
    "lat": 12.751397,
    "lon": 80.197356,
    "distance": "572m",
    "walkingTime": "8 min",
    "factors": {
      "availability": 70,
      "cleanliness": 80,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 3,
    "name": "Main Auditorium",
    "lat": 12.75109,
    "lon": 80.19677,
    "distance": "462m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 70,
      "cleanliness": 78,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 4,
    "name": "Mini Auditorium",
    "lat": 12.750709,
    "lon": 80.196963,
    "distance": "382m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 70,
      "cleanliness": 47,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 5,
    "name": "SSN School of Management - Restroom 1",
    "lat": 12.748118,
    "lon": 80.194705,
    "distance": "429m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 70,
      "cleanliness": 77,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 6,
    "name": "SSN School of Management - Restroom 2",
    "lat": 12.749889,
    "lon": 80.194118,
    "distance": "347m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 70,
      "cleanliness": 42,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 7,
    "name": "SSN School of Management - Restroom 3",
    "lat": 12.74842,
    "lon": 80.194097,
    "distance": "703m",
    "walkingTime": "9 min",
    "factors": {
      "availability": 70,
      "cleanliness": 61,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 8,
    "name": "SSN School of Management - Restroom 4",
    "lat": 12.749182,
    "lon": 80.195044,
    "distance": "230m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 70,
      "cleanliness": 82,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 9,
    "name": "SSN School of Management - Restroom 5",
    "lat": 12.748351,
    "lon": 80.195211,
    "distance": "684m",
    "walkingTime": "9 min",
    "factors": {
      "availability": 70,
      "cleanliness": 50,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 10,
    "name": "SSN School of Management - Restroom 6",
    "lat": 12.749255,
    "lon": 80.19548,
    "distance": "786m",
    "walkingTime": "10 min",
    "factors": {
      "availability": 70,
      "cleanliness": 84,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 11,
    "name": "CDC - Restroom 1",
    "lat": 12.750249,
    "lon": 80.195995,
    "distance": "65m",
    "walkingTime": "1 min",
    "factors": {
      "availability": 70,
      "cleanliness": 52,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 12,
    "name": "CDC - Restroom 2",
    "lat": 12.749997,
    "lon": 80.196096,
    "distance": "706m",
    "walkingTime": "9 min",
    "factors": {
      "availability": 70,
      "cleanliness": 52,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 13,
    "name": "CDC - Restroom 3",
    "lat": 12.750362,
    "lon": 80.196179,
    "distance": "620m",
    "walkingTime": "8 min",
    "factors": {
      "availability": 70,
      "cleanliness": 81,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 14,
    "name": "Freshers Block - Restroom 1",
    "lat": 12.749308,
    "lon": 80.198474,
    "distance": "636m",
    "walkingTime": "8 min",
    "factors": {
      "availability": 70,
      "cleanliness": 53,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 15,
    "name": "Freshers Block - Restroom 2",
    "lat": 12.749119,
    "lon": 80.19756,
    "distance": "847m",
    "walkingTime": "11 min",
    "factors": {
      "availability": 70,
      "cleanliness": 50,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 16,
    "name": "Freshers Block - Restroom 3",
    "lat": 12.749192,
    "lon": 80.198166,
    "distance": "291m",
    "walkingTime": "4 min",
    "factors": {
      "availability": 70,
      "cleanliness": 52,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 17,
    "name": "Freshers Block - Restroom 4",
    "lat": 12.749914,
    "lon": 80.197886,
    "distance": "220m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 70,
      "cleanliness": 72,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 18,
    "name": "Freshers Block - Restroom 5",
    "lat": 12.749283,
    "lon": 80.198059,
    "distance": "616m",
    "walkingTime": "8 min",
    "factors": {
      "availability": 70,
      "cleanliness": 71,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 19,
    "name": "Freshers Block - Restroom 6",
    "lat": 12.749938,
    "lon": 80.197731,
    "distance": "464m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 70,
      "cleanliness": 55,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 20,
    "name": "Mechanical Engineering Block - Restroom 1",
    "lat": 12.751574,
    "lon": 80.198117,
    "distance": "187m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 70,
      "cleanliness": 65,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 21,
    "name": "Mechanical Engineering Block - Restroom 2",
    "lat": 12.752141,
    "lon": 80.198925,
    "distance": "833m",
    "walkingTime": "11 min",
    "factors": {
      "availability": 70,
      "cleanliness": 85,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 22,
    "name": "Civil Engineering Block - Restroom 1",
    "lat": 12.752627,
    "lon": 80.198404,
    "distance": "760m",
    "walkingTime": "10 min",
    "factors": {
      "availability": 70,
      "cleanliness": 81,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 23,
    "name": "Civil Engineering Block - Restroom 2",
    "lat": 12.752029,
    "lon": 80.197931,
    "distance": "593m",
    "walkingTime": "8 min",
    "factors": {
      "availability": 70,
      "cleanliness": 67,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 24,
    "name": "EEE Block - Restroom 1",
    "lat": 12.752682,
    "lon": 80.197129,
    "distance": "675m",
    "walkingTime": "9 min",
    "factors": {
      "availability": 70,
      "cleanliness": 82,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 25,
    "name": "EEE Block - Restroom 2",
    "lat": 12.752891,
    "lon": 80.197392,
    "distance": "254m",
    "walkingTime": "4 min",
    "factors": {
      "availability": 70,
      "cleanliness": 43,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 26,
    "name": "BME Block - Restroom 1",
    "lat": 12.753212,
    "lon": 80.197048,
    "distance": "234m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 70,
      "cleanliness": 55,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 27,
    "name": "BME Block - Restroom 2",
    "lat": 12.753207,
    "lon": 80.197359,
    "distance": "654m",
    "walkingTime": "9 min",
    "factors": {
      "availability": 70,
      "cleanliness": 79,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 28,
    "name": "ECE Block - Restroom 1",
    "lat": 12.754093,
    "lon": 80.196599,
    "distance": "675m",
    "walkingTime": "9 min",
    "factors": {
      "availability": 70,
      "cleanliness": 44,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 29,
    "name": "ECE Block - Restroom 2",
    "lat": 12.754023,
    "lon": 80.196131,
    "distance": "468m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 70,
      "cleanliness": 69,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 30,
    "name": "SSN Library - Restroom 1",
    "lat": 12.750743,
    "lon": 80.198938,
    "distance": "315m",
    "walkingTime": "4 min",
    "factors": {
      "availability": 70,
      "cleanliness": 89,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 31,
    "name": "SSN Library - Restroom 2",
    "lat": 12.750116,
    "lon": 80.199499,
    "distance": "410m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 70,
      "cleanliness": 68,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 32,
    "name": "SNU Academic Block 1 - Restroom 1",
    "lat": 12.746603,
    "lon": 80.19478,
    "distance": "799m",
    "walkingTime": "10 min",
    "factors": {
      "availability": 70,
      "cleanliness": 57,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 33,
    "name": "SNU Academic Block 1 - Restroom 2",
    "lat": 12.746744,
    "lon": 80.194827,
    "distance": "324m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 70,
      "cleanliness": 47,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 34,
    "name": "SNU Academic Block 1 - Restroom 3",
    "lat": 12.746935,
    "lon": 80.194963,
    "distance": "66m",
    "walkingTime": "1 min",
    "factors": {
      "availability": 70,
      "cleanliness": 77,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 35,
    "name": "SNU Academic Block 1 - Restroom 4",
    "lat": 12.74667,
    "lon": 80.195478,
    "distance": "476m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 70,
      "cleanliness": 57,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 36,
    "name": "SNU Academic Block 1 - Restroom 5",
    "lat": 12.746783,
    "lon": 80.19475,
    "distance": "115m",
    "walkingTime": "2 min",
    "factors": {
      "availability": 70,
      "cleanliness": 86,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 37,
    "name": "SNU Academic Block 1 - Restroom 6",
    "lat": 12.746656,
    "lon": 80.194818,
    "distance": "450m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 70,
      "cleanliness": 88,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 38,
    "name": "SNU Academic Block 2 - Restroom 1",
    "lat": 12.746994,
    "lon": 80.195033,
    "distance": "694m",
    "walkingTime": "9 min",
    "factors": {
      "availability": 70,
      "cleanliness": 85,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 39,
    "name": "SNU Academic Block 2 - Restroom 2",
    "lat": 12.746646,
    "lon": 80.195513,
    "distance": "63m",
    "walkingTime": "1 min",
    "factors": {
      "availability": 70,
      "cleanliness": 81,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 40,
    "name": "SNU Academic Block 2 - Restroom 3",
    "lat": 12.746431,
    "lon": 80.195694,
    "distance": "845m",
    "walkingTime": "11 min",
    "factors": {
      "availability": 70,
      "cleanliness": 79,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 41,
    "name": "SNU Academic Block 2 - Restroom 4",
    "lat": 12.746077,
    "lon": 80.195795,
    "distance": "75m",
    "walkingTime": "1 min",
    "factors": {
      "availability": 70,
      "cleanliness": 76,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 42,
    "name": "SNU Academic Block 2 - Restroom 5",
    "lat": 12.746471,
    "lon": 80.195088,
    "distance": "238m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 70,
      "cleanliness": 45,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 43,
    "name": "SNU Academic Block 2 - Restroom 6",
    "lat": 12.746357,
    "lon": 80.195031,
    "distance": "347m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 70,
      "cleanliness": 81,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 44,
    "name": "SNU Academic Block 3 - Restroom 1",
    "lat": 12.745716,
    "lon": 80.195644,
    "distance": "505m",
    "walkingTime": "7 min",
    "factors": {
      "availability": 70,
      "cleanliness": 58,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 45,
    "name": "SNU Academic Block 3 - Restroom 2",
    "lat": 12.746398,
    "lon": 80.195707,
    "distance": "234m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 70,
      "cleanliness": 74,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 46,
    "name": "SNU Academic Block 3 - Restroom 3",
    "lat": 12.746242,
    "lon": 80.196454,
    "distance": "581m",
    "walkingTime": "8 min",
    "factors": {
      "availability": 70,
      "cleanliness": 56,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 47,
    "name": "SNU Academic Block 3 - Restroom 4",
    "lat": 12.745621,
    "lon": 80.196066,
    "distance": "171m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 70,
      "cleanliness": 66,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 48,
    "name": "SNU Academic Block 3 - Restroom 5",
    "lat": 12.746112,
    "lon": 80.196442,
    "distance": "493m",
    "walkingTime": "7 min",
    "factors": {
      "availability": 70,
      "cleanliness": 48,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 49,
    "name": "SNU Academic Block 3 - Restroom 6",
    "lat": 12.745727,
    "lon": 80.195832,
    "distance": "620m",
    "walkingTime": "8 min",
    "factors": {
      "availability": 70,
      "cleanliness": 76,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "College Hours (7 AM - 6:30 PM)"
    ],
    "reports": []
  },
  {
    "id": 50,
    "name": "Sports Complex (SNU Chennai)",
    "lat": 12.748728,
    "lon": 80.191276,
    "distance": "105m",
    "walkingTime": "2 min",
    "factors": {
      "availability": 100,
      "cleanliness": 62,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "Showers",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 51,
    "name": "Gents Hostel 1 - Restroom 1",
    "lat": 12.755056,
    "lon": 80.191852,
    "distance": "647m",
    "walkingTime": "9 min",
    "factors": {
      "availability": 100,
      "cleanliness": 75,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 52,
    "name": "Gents Hostel 1 - Restroom 2",
    "lat": 12.754713,
    "lon": 80.191539,
    "distance": "697m",
    "walkingTime": "9 min",
    "factors": {
      "availability": 100,
      "cleanliness": 69,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 53,
    "name": "Gents Hostel 1 - Restroom 3",
    "lat": 12.754981,
    "lon": 80.192485,
    "distance": "319m",
    "walkingTime": "4 min",
    "factors": {
      "availability": 100,
      "cleanliness": 66,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 54,
    "name": "Gents Hostel 1 - Restroom 4",
    "lat": 12.755257,
    "lon": 80.192119,
    "distance": "288m",
    "walkingTime": "4 min",
    "factors": {
      "availability": 100,
      "cleanliness": 65,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 55,
    "name": "Gents Hostel 2 - Restroom 1",
    "lat": 12.755008,
    "lon": 80.191835,
    "distance": "95m",
    "walkingTime": "2 min",
    "factors": {
      "availability": 100,
      "cleanliness": 58,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 56,
    "name": "Gents Hostel 2 - Restroom 2",
    "lat": 12.755673,
    "lon": 80.191276,
    "distance": "578m",
    "walkingTime": "8 min",
    "factors": {
      "availability": 100,
      "cleanliness": 88,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 57,
    "name": "Gents Hostel 2 - Restroom 3",
    "lat": 12.755895,
    "lon": 80.191665,
    "distance": "831m",
    "walkingTime": "11 min",
    "factors": {
      "availability": 100,
      "cleanliness": 44,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 58,
    "name": "Gents Hostel 2 - Restroom 4",
    "lat": 12.755048,
    "lon": 80.191352,
    "distance": "138m",
    "walkingTime": "2 min",
    "factors": {
      "availability": 100,
      "cleanliness": 56,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 59,
    "name": "Gents Hostel 3 - Restroom 1",
    "lat": 12.755802,
    "lon": 80.190866,
    "distance": "90m",
    "walkingTime": "2 min",
    "factors": {
      "availability": 100,
      "cleanliness": 84,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 60,
    "name": "Gents Hostel 3 - Restroom 2",
    "lat": 12.756258,
    "lon": 80.191297,
    "distance": "817m",
    "walkingTime": "11 min",
    "factors": {
      "availability": 100,
      "cleanliness": 41,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 61,
    "name": "Gents Hostel 3 - Restroom 3",
    "lat": 12.756062,
    "lon": 80.19054,
    "distance": "395m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 100,
      "cleanliness": 89,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 62,
    "name": "Gents Hostel 3 - Restroom 4",
    "lat": 12.755563,
    "lon": 80.190539,
    "distance": "814m",
    "walkingTime": "11 min",
    "factors": {
      "availability": 100,
      "cleanliness": 65,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 63,
    "name": "Gents Hostel 4 - Restroom 1",
    "lat": 12.756598,
    "lon": 80.190148,
    "distance": "748m",
    "walkingTime": "10 min",
    "factors": {
      "availability": 100,
      "cleanliness": 88,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 64,
    "name": "Gents Hostel 4 - Restroom 2",
    "lat": 12.756248,
    "lon": 80.190584,
    "distance": "327m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 100,
      "cleanliness": 60,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 65,
    "name": "Gents Hostel 4 - Restroom 3",
    "lat": 12.756666,
    "lon": 80.190599,
    "distance": "211m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 100,
      "cleanliness": 70,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 66,
    "name": "Gents Hostel 4 - Restroom 4",
    "lat": 12.75691,
    "lon": 80.190672,
    "distance": "101m",
    "walkingTime": "2 min",
    "factors": {
      "availability": 100,
      "cleanliness": 55,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 67,
    "name": "Gents Hostel 5 - Restroom 1",
    "lat": 12.756591,
    "lon": 80.189606,
    "distance": "841m",
    "walkingTime": "11 min",
    "factors": {
      "availability": 100,
      "cleanliness": 47,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 68,
    "name": "Gents Hostel 5 - Restroom 2",
    "lat": 12.75677,
    "lon": 80.190281,
    "distance": "520m",
    "walkingTime": "7 min",
    "factors": {
      "availability": 100,
      "cleanliness": 52,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 69,
    "name": "Gents Hostel 5 - Restroom 3",
    "lat": 12.757411,
    "lon": 80.190176,
    "distance": "743m",
    "walkingTime": "10 min",
    "factors": {
      "availability": 100,
      "cleanliness": 66,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 70,
    "name": "Gents Hostel 5 - Restroom 4",
    "lat": 12.756651,
    "lon": 80.189628,
    "distance": "777m",
    "walkingTime": "10 min",
    "factors": {
      "availability": 100,
      "cleanliness": 62,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 71,
    "name": "Gents Hostel 7 - Restroom 1",
    "lat": 12.757143,
    "lon": 80.189241,
    "distance": "301m",
    "walkingTime": "4 min",
    "factors": {
      "availability": 100,
      "cleanliness": 62,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 72,
    "name": "Gents Hostel 7 - Restroom 2",
    "lat": 12.757355,
    "lon": 80.189995,
    "distance": "637m",
    "walkingTime": "8 min",
    "factors": {
      "availability": 100,
      "cleanliness": 50,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 73,
    "name": "Gents Hostel 7 - Restroom 3",
    "lat": 12.757181,
    "lon": 80.189557,
    "distance": "737m",
    "walkingTime": "10 min",
    "factors": {
      "availability": 100,
      "cleanliness": 41,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 74,
    "name": "Gents Hostel 7 - Restroom 4",
    "lat": 12.757147,
    "lon": 80.189656,
    "distance": "263m",
    "walkingTime": "4 min",
    "factors": {
      "availability": 100,
      "cleanliness": 71,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 75,
    "name": "Ladies Hostel 1 - Restroom 1",
    "lat": 12.74771,
    "lon": 80.199398,
    "distance": "736m",
    "walkingTime": "10 min",
    "factors": {
      "availability": 100,
      "cleanliness": 64,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 76,
    "name": "Ladies Hostel 1 - Restroom 2",
    "lat": 12.74778,
    "lon": 80.198718,
    "distance": "520m",
    "walkingTime": "7 min",
    "factors": {
      "availability": 100,
      "cleanliness": 44,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 77,
    "name": "Ladies Hostel 1 - Restroom 3",
    "lat": 12.748345,
    "lon": 80.199326,
    "distance": "772m",
    "walkingTime": "10 min",
    "factors": {
      "availability": 100,
      "cleanliness": 87,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 78,
    "name": "Ladies Hostel 1 - Restroom 4",
    "lat": 12.748046,
    "lon": 80.198591,
    "distance": "412m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 100,
      "cleanliness": 44,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 79,
    "name": "Ladies Hostel 2 - Restroom 1",
    "lat": 12.74783,
    "lon": 80.199324,
    "distance": "742m",
    "walkingTime": "10 min",
    "factors": {
      "availability": 100,
      "cleanliness": 72,
      "accessibility": 0,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 80,
    "name": "Ladies Hostel 2 - Restroom 2",
    "lat": 12.747015,
    "lon": 80.199275,
    "distance": "740m",
    "walkingTime": "10 min",
    "factors": {
      "availability": 100,
      "cleanliness": 80,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 81,
    "name": "Ladies Hostel 2 - Restroom 3",
    "lat": 12.747749,
    "lon": 80.19954,
    "distance": "439m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 100,
      "cleanliness": 53,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 82,
    "name": "Ladies Hostel 2 - Restroom 4",
    "lat": 12.747816,
    "lon": 80.199165,
    "distance": "697m",
    "walkingTime": "9 min",
    "factors": {
      "availability": 100,
      "cleanliness": 48,
      "accessibility": 100,
      "facilities": 80,
      "affordability": 100
    },
    "facilities": [
      "Free",
      "Men's",
      "Women's",
      "24/7 Access"
    ],
    "reports": []
  }
];

export async function fetchLiveRestrooms(lat, lon, radius = 1000) {
  const query = `
    [out:json][timeout:25];
    node["amenity"="toilets"](around:${radius},${lat},${lon});
    out body;
  `;
  const url = 'https://overpass-api.de/api/interpreter';
  
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: query
    });
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    
    return data.elements.map(el => {
      const tags = el.tags || {};
      
      const facilities = [];
      if (tags.fee === 'yes') facilities.push('Paid');
      else if (tags.fee === 'no') facilities.push('Free');
      if (tags.wheelchair === 'yes') facilities.push('Wheelchair access');
      if (tags['drinking_water'] === 'yes') facilities.push('Water');

      const distKm = Math.sqrt(Math.pow(el.lat - lat, 2) + Math.pow(el.lon - lon, 2)) * 111;
      const distM = Math.round(distKm * 1000);
      const walkingTime = Math.max(1, Math.round(distM / 80)) + ' min';

      return {
        id: el.id,
        name: tags.name || tags.description || 'Public Restroom',
        lat: el.lat,
        lon: el.lon,
        distance: distM + 'm',
        walkingTime,
        factors: {
          availability: 80,
          cleanliness: 50,
          accessibility: tags.wheelchair === 'yes' ? 100 : (tags.wheelchair === 'no' ? 0 : null),
          facilities: facilities.length > 0 ? 80 : 50,
          affordability: tags.fee === 'yes' ? 0 : 100
        },
        facilities,
        reports: []
      };
    });
  } catch (err) {
    console.error('Failed to fetch from Overpass:', err);
    throw err;
  }
}
