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
    "lat": 12.750417,
    "lon": 80.196922,
    "distance": "506m",
    "walkingTime": "7 min",
    "factors": {
      "availability": 70,
      "cleanliness": 41,
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
    "lat": 12.751183,
    "lon": 80.196514,
    "distance": "385m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 70,
      "cleanliness": 59,
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
    "id": 3,
    "name": "Main Auditorium",
    "lat": 12.75162,
    "lon": 80.196137,
    "distance": "570m",
    "walkingTime": "8 min",
    "factors": {
      "availability": 70,
      "cleanliness": 40,
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
    "id": 4,
    "name": "Mini Auditorium",
    "lat": 12.751208,
    "lon": 80.196633,
    "distance": "671m",
    "walkingTime": "9 min",
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
    "id": 5,
    "name": "SSN School of Management - Restroom 1",
    "lat": 12.74843,
    "lon": 80.195498,
    "distance": "240m",
    "walkingTime": "4 min",
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
    "id": 6,
    "name": "SSN School of Management - Restroom 2",
    "lat": 12.748479,
    "lon": 80.194746,
    "distance": "819m",
    "walkingTime": "11 min",
    "factors": {
      "availability": 70,
      "cleanliness": 40,
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
    "id": 7,
    "name": "SSN School of Management - Restroom 3",
    "lat": 12.749041,
    "lon": 80.194929,
    "distance": "469m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 70,
      "cleanliness": 51,
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
    "id": 8,
    "name": "SSN School of Management - Restroom 4",
    "lat": 12.749044,
    "lon": 80.19574,
    "distance": "366m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 70,
      "cleanliness": 86,
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
    "id": 9,
    "name": "SSN School of Management - Restroom 5",
    "lat": 12.749639,
    "lon": 80.195134,
    "distance": "70m",
    "walkingTime": "1 min",
    "factors": {
      "availability": 70,
      "cleanliness": 40,
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
    "lat": 12.749981,
    "lon": 80.194897,
    "distance": "420m",
    "walkingTime": "6 min",
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
    "id": 11,
    "name": "CDC - Restroom 1",
    "lat": 12.750321,
    "lon": 80.196366,
    "distance": "167m",
    "walkingTime": "3 min",
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
    "id": 12,
    "name": "CDC - Restroom 2",
    "lat": 12.749575,
    "lon": 80.196211,
    "distance": "409m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 70,
      "cleanliness": 41,
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
    "id": 13,
    "name": "CDC - Restroom 3",
    "lat": 12.750081,
    "lon": 80.196314,
    "distance": "438m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 70,
      "cleanliness": 72,
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
    "id": 14,
    "name": "Freshers Block - Restroom 1",
    "lat": 12.749071,
    "lon": 80.197664,
    "distance": "454m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 70,
      "cleanliness": 83,
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
    "lat": 12.749988,
    "lon": 80.198364,
    "distance": "313m",
    "walkingTime": "4 min",
    "factors": {
      "availability": 70,
      "cleanliness": 40,
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
    "lat": 12.749973,
    "lon": 80.197674,
    "distance": "96m",
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
    "id": 17,
    "name": "Freshers Block - Restroom 4",
    "lat": 12.74955,
    "lon": 80.198498,
    "distance": "306m",
    "walkingTime": "4 min",
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
    "id": 18,
    "name": "Freshers Block - Restroom 5",
    "lat": 12.749631,
    "lon": 80.198292,
    "distance": "551m",
    "walkingTime": "7 min",
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
    "lat": 12.749702,
    "lon": 80.197968,
    "distance": "216m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 70,
      "cleanliness": 72,
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
    "lat": 12.752219,
    "lon": 80.19877,
    "distance": "112m",
    "walkingTime": "2 min",
    "factors": {
      "availability": 70,
      "cleanliness": 84,
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
    "id": 21,
    "name": "Mechanical Engineering Block - Restroom 2",
    "lat": 12.751813,
    "lon": 80.198039,
    "distance": "818m",
    "walkingTime": "11 min",
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
    "id": 22,
    "name": "Civil Engineering Block - Restroom 1",
    "lat": 12.752187,
    "lon": 80.198105,
    "distance": "512m",
    "walkingTime": "7 min",
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
    "id": 23,
    "name": "Civil Engineering Block - Restroom 2",
    "lat": 12.752417,
    "lon": 80.198023,
    "distance": "719m",
    "walkingTime": "9 min",
    "factors": {
      "availability": 70,
      "cleanliness": 65,
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
    "lat": 12.753331,
    "lon": 80.19733,
    "distance": "281m",
    "walkingTime": "4 min",
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
    "id": 25,
    "name": "EEE Block - Restroom 2",
    "lat": 12.752839,
    "lon": 80.197771,
    "distance": "847m",
    "walkingTime": "11 min",
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
    "id": 26,
    "name": "BME Block - Restroom 1",
    "lat": 12.75346,
    "lon": 80.196581,
    "distance": "83m",
    "walkingTime": "2 min",
    "factors": {
      "availability": 70,
      "cleanliness": 75,
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
    "id": 27,
    "name": "BME Block - Restroom 2",
    "lat": 12.753219,
    "lon": 80.196993,
    "distance": "333m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 70,
      "cleanliness": 73,
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
    "lat": 12.75361,
    "lon": 80.196889,
    "distance": "176m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 70,
      "cleanliness": 51,
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
    "lat": 12.754497,
    "lon": 80.196177,
    "distance": "724m",
    "walkingTime": "10 min",
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
    "id": 30,
    "name": "SSN Library - Restroom 1",
    "lat": 12.750581,
    "lon": 80.199223,
    "distance": "221m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 70,
      "cleanliness": 54,
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
    "id": 31,
    "name": "SSN Library - Restroom 2",
    "lat": 12.750814,
    "lon": 80.1992,
    "distance": "568m",
    "walkingTime": "8 min",
    "factors": {
      "availability": 70,
      "cleanliness": 83,
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
    "id": 32,
    "name": "SNU Academic Block 1 - Restroom 1",
    "lat": 12.747111,
    "lon": 80.194753,
    "distance": "595m",
    "walkingTime": "8 min",
    "factors": {
      "availability": 70,
      "cleanliness": 85,
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
    "id": 33,
    "name": "SNU Academic Block 1 - Restroom 2",
    "lat": 12.746696,
    "lon": 80.194852,
    "distance": "745m",
    "walkingTime": "10 min",
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
    "id": 34,
    "name": "SNU Academic Block 1 - Restroom 3",
    "lat": 12.747431,
    "lon": 80.19517,
    "distance": "704m",
    "walkingTime": "9 min",
    "factors": {
      "availability": 70,
      "cleanliness": 73,
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
    "lat": 12.747383,
    "lon": 80.194988,
    "distance": "416m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 70,
      "cleanliness": 59,
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
    "id": 36,
    "name": "SNU Academic Block 1 - Restroom 5",
    "lat": 12.747231,
    "lon": 80.195329,
    "distance": "687m",
    "walkingTime": "9 min",
    "factors": {
      "availability": 70,
      "cleanliness": 64,
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
    "lat": 12.747212,
    "lon": 80.195112,
    "distance": "498m",
    "walkingTime": "7 min",
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
    "id": 38,
    "name": "SNU Academic Block 2 - Restroom 1",
    "lat": 12.746172,
    "lon": 80.195651,
    "distance": "219m",
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
    "id": 39,
    "name": "SNU Academic Block 2 - Restroom 2",
    "lat": 12.746129,
    "lon": 80.195204,
    "distance": "273m",
    "walkingTime": "4 min",
    "factors": {
      "availability": 70,
      "cleanliness": 63,
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
    "lat": 12.746988,
    "lon": 80.195001,
    "distance": "612m",
    "walkingTime": "8 min",
    "factors": {
      "availability": 70,
      "cleanliness": 76,
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
    "id": 41,
    "name": "SNU Academic Block 2 - Restroom 4",
    "lat": 12.746874,
    "lon": 80.195105,
    "distance": "366m",
    "walkingTime": "5 min",
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
    "id": 42,
    "name": "SNU Academic Block 2 - Restroom 5",
    "lat": 12.746178,
    "lon": 80.195643,
    "distance": "333m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 70,
      "cleanliness": 43,
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
    "lat": 12.746143,
    "lon": 80.195433,
    "distance": "244m",
    "walkingTime": "4 min",
    "factors": {
      "availability": 70,
      "cleanliness": 60,
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
    "id": 44,
    "name": "SNU Academic Block 3 - Restroom 1",
    "lat": 12.746332,
    "lon": 80.195558,
    "distance": "683m",
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
    "id": 45,
    "name": "SNU Academic Block 3 - Restroom 2",
    "lat": 12.746249,
    "lon": 80.196465,
    "distance": "404m",
    "walkingTime": "6 min",
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
    "id": 46,
    "name": "SNU Academic Block 3 - Restroom 3",
    "lat": 12.7461,
    "lon": 80.195926,
    "distance": "808m",
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
    "id": 47,
    "name": "SNU Academic Block 3 - Restroom 4",
    "lat": 12.745939,
    "lon": 80.19642,
    "distance": "228m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 70,
      "cleanliness": 76,
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
    "id": 48,
    "name": "SNU Academic Block 3 - Restroom 5",
    "lat": 12.74576,
    "lon": 80.196071,
    "distance": "323m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 70,
      "cleanliness": 42,
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
    "id": 49,
    "name": "SNU Academic Block 3 - Restroom 6",
    "lat": 12.745699,
    "lon": 80.196327,
    "distance": "701m",
    "walkingTime": "9 min",
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
    "id": 50,
    "name": "Sports Complex (SNU Chennai)",
    "lat": 12.748768,
    "lon": 80.191476,
    "distance": "191m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 100,
      "cleanliness": 50,
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
    "lat": 12.755179,
    "lon": 80.191585,
    "distance": "301m",
    "walkingTime": "4 min",
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
    "id": 52,
    "name": "Gents Hostel 1 - Restroom 2",
    "lat": 12.75528,
    "lon": 80.191854,
    "distance": "840m",
    "walkingTime": "11 min",
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
    "id": 53,
    "name": "Gents Hostel 1 - Restroom 3",
    "lat": 12.755436,
    "lon": 80.191699,
    "distance": "522m",
    "walkingTime": "7 min",
    "factors": {
      "availability": 100,
      "cleanliness": 56,
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
    "lat": 12.75511,
    "lon": 80.191682,
    "distance": "169m",
    "walkingTime": "3 min",
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
    "id": 55,
    "name": "Gents Hostel 2 - Restroom 1",
    "lat": 12.755384,
    "lon": 80.191475,
    "distance": "509m",
    "walkingTime": "7 min",
    "factors": {
      "availability": 100,
      "cleanliness": 61,
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
    "lat": 12.755506,
    "lon": 80.191355,
    "distance": "842m",
    "walkingTime": "11 min",
    "factors": {
      "availability": 100,
      "cleanliness": 68,
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
    "id": 57,
    "name": "Gents Hostel 2 - Restroom 3",
    "lat": 12.755591,
    "lon": 80.191094,
    "distance": "767m",
    "walkingTime": "10 min",
    "factors": {
      "availability": 100,
      "cleanliness": 83,
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
    "id": 58,
    "name": "Gents Hostel 2 - Restroom 4",
    "lat": 12.755176,
    "lon": 80.191682,
    "distance": "308m",
    "walkingTime": "4 min",
    "factors": {
      "availability": 100,
      "cleanliness": 60,
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
    "lat": 12.756059,
    "lon": 80.191248,
    "distance": "123m",
    "walkingTime": "2 min",
    "factors": {
      "availability": 100,
      "cleanliness": 84,
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
    "id": 60,
    "name": "Gents Hostel 3 - Restroom 2",
    "lat": 12.756059,
    "lon": 80.191025,
    "distance": "702m",
    "walkingTime": "9 min",
    "factors": {
      "availability": 100,
      "cleanliness": 75,
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
    "id": 61,
    "name": "Gents Hostel 3 - Restroom 3",
    "lat": 12.756374,
    "lon": 80.191441,
    "distance": "297m",
    "walkingTime": "4 min",
    "factors": {
      "availability": 100,
      "cleanliness": 80,
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
    "id": 62,
    "name": "Gents Hostel 3 - Restroom 4",
    "lat": 12.756039,
    "lon": 80.191438,
    "distance": "406m",
    "walkingTime": "6 min",
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
    "id": 63,
    "name": "Gents Hostel 4 - Restroom 1",
    "lat": 12.756885,
    "lon": 80.19008,
    "distance": "785m",
    "walkingTime": "10 min",
    "factors": {
      "availability": 100,
      "cleanliness": 61,
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
    "id": 64,
    "name": "Gents Hostel 4 - Restroom 2",
    "lat": 12.756222,
    "lon": 80.190721,
    "distance": "218m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 100,
      "cleanliness": 82,
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
    "lat": 12.756254,
    "lon": 80.190315,
    "distance": "238m",
    "walkingTime": "3 min",
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
    "id": 66,
    "name": "Gents Hostel 4 - Restroom 4",
    "lat": 12.756872,
    "lon": 80.19074,
    "distance": "445m",
    "walkingTime": "6 min",
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
    "id": 67,
    "name": "Gents Hostel 5 - Restroom 1",
    "lat": 12.756647,
    "lon": 80.189761,
    "distance": "77m",
    "walkingTime": "1 min",
    "factors": {
      "availability": 100,
      "cleanliness": 67,
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
    "lat": 12.757273,
    "lon": 80.18972,
    "distance": "82m",
    "walkingTime": "2 min",
    "factors": {
      "availability": 100,
      "cleanliness": 72,
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
    "id": 69,
    "name": "Gents Hostel 5 - Restroom 3",
    "lat": 12.757008,
    "lon": 80.189647,
    "distance": "642m",
    "walkingTime": "9 min",
    "factors": {
      "availability": 100,
      "cleanliness": 40,
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
    "id": 70,
    "name": "Gents Hostel 5 - Restroom 4",
    "lat": 12.757449,
    "lon": 80.189944,
    "distance": "349m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 100,
      "cleanliness": 57,
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
    "id": 71,
    "name": "Gents Hostel 7 - Restroom 1",
    "lat": 12.75782,
    "lon": 80.189953,
    "distance": "342m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 100,
      "cleanliness": 74,
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
    "id": 72,
    "name": "Gents Hostel 7 - Restroom 2",
    "lat": 12.757919,
    "lon": 80.189422,
    "distance": "164m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 100,
      "cleanliness": 54,
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
    "id": 73,
    "name": "Gents Hostel 7 - Restroom 3",
    "lat": 12.757243,
    "lon": 80.189476,
    "distance": "822m",
    "walkingTime": "11 min",
    "factors": {
      "availability": 100,
      "cleanliness": 81,
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
    "lat": 12.757896,
    "lon": 80.189417,
    "distance": "304m",
    "walkingTime": "4 min",
    "factors": {
      "availability": 100,
      "cleanliness": 67,
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
    "id": 75,
    "name": "Ladies Hostel 1 - Restroom 1",
    "lat": 12.747908,
    "lon": 80.199157,
    "distance": "513m",
    "walkingTime": "7 min",
    "factors": {
      "availability": 100,
      "cleanliness": 80,
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
    "lat": 12.748267,
    "lon": 80.199113,
    "distance": "416m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 100,
      "cleanliness": 71,
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
    "id": 77,
    "name": "Ladies Hostel 1 - Restroom 3",
    "lat": 12.748429,
    "lon": 80.198911,
    "distance": "321m",
    "walkingTime": "5 min",
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
    "id": 78,
    "name": "Ladies Hostel 1 - Restroom 4",
    "lat": 12.748196,
    "lon": 80.198629,
    "distance": "668m",
    "walkingTime": "9 min",
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
    "id": 79,
    "name": "Ladies Hostel 2 - Restroom 1",
    "lat": 12.747911,
    "lon": 80.199651,
    "distance": "80m",
    "walkingTime": "2 min",
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
    "id": 80,
    "name": "Ladies Hostel 2 - Restroom 2",
    "lat": 12.747197,
    "lon": 80.199953,
    "distance": "748m",
    "walkingTime": "10 min",
    "factors": {
      "availability": 100,
      "cleanliness": 46,
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
    "id": 81,
    "name": "Ladies Hostel 2 - Restroom 3",
    "lat": 12.747461,
    "lon": 80.19907,
    "distance": "153m",
    "walkingTime": "2 min",
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
    "id": 82,
    "name": "Ladies Hostel 2 - Restroom 4",
    "lat": 12.747292,
    "lon": 80.199957,
    "distance": "104m",
    "walkingTime": "2 min",
    "factors": {
      "availability": 100,
      "cleanliness": 63,
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
