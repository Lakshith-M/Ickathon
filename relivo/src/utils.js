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
    "lat": 12.750168,
    "lon": 80.199765,
    "distance": "489m",
    "walkingTime": "7 min",
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
    "id": 2,
    "name": "SSN School of Advanced Career Education",
    "lat": 12.748752,
    "lon": 80.19702,
    "distance": "321m",
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
    "id": 3,
    "name": "Main Auditorium",
    "lat": 12.752287,
    "lon": 80.198952,
    "distance": "147m",
    "walkingTime": "2 min",
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
    "id": 4,
    "name": "Mini Auditorium",
    "lat": 12.74897,
    "lon": 80.198754,
    "distance": "426m",
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
    "id": 5,
    "name": "SSN School of Management - Restroom 1",
    "lat": 12.749251,
    "lon": 80.199463,
    "distance": "119m",
    "walkingTime": "2 min",
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
    "id": 6,
    "name": "SSN School of Management - Restroom 2",
    "lat": 12.748931,
    "lon": 80.199464,
    "distance": "54m",
    "walkingTime": "1 min",
    "factors": {
      "availability": 70,
      "cleanliness": 60,
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
    "lat": 12.751499,
    "lon": 80.199253,
    "distance": "78m",
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
    "id": 8,
    "name": "SSN School of Management - Restroom 4",
    "lat": 12.751387,
    "lon": 80.195087,
    "distance": "178m",
    "walkingTime": "3 min",
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
    "id": 9,
    "name": "SSN School of Management - Restroom 5",
    "lat": 12.750355,
    "lon": 80.197903,
    "distance": "75m",
    "walkingTime": "1 min",
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
    "id": 10,
    "name": "SSN School of Management - Restroom 6",
    "lat": 12.749534,
    "lon": 80.196036,
    "distance": "549m",
    "walkingTime": "7 min",
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
    "id": 11,
    "name": "CDC - Restroom 1",
    "lat": 12.752817,
    "lon": 80.197536,
    "distance": "348m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 70,
      "cleanliness": 70,
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
    "lat": 12.752517,
    "lon": 80.197696,
    "distance": "222m",
    "walkingTime": "3 min",
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
    "id": 13,
    "name": "CDC - Restroom 3",
    "lat": 12.748515,
    "lon": 80.197237,
    "distance": "210m",
    "walkingTime": "3 min",
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
    "id": 14,
    "name": "Freshers Block - Restroom 1",
    "lat": 12.751775,
    "lon": 80.19898,
    "distance": "381m",
    "walkingTime": "5 min",
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
    "id": 15,
    "name": "Freshers Block - Restroom 2",
    "lat": 12.749739,
    "lon": 80.198562,
    "distance": "327m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 70,
      "cleanliness": 54,
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
    "lat": 12.74961,
    "lon": 80.196664,
    "distance": "193m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 70,
      "cleanliness": 66,
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
    "lat": 12.748354,
    "lon": 80.199154,
    "distance": "216m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 70,
      "cleanliness": 41,
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
    "id": 18,
    "name": "Freshers Block - Restroom 5",
    "lat": 12.752015,
    "lon": 80.19504,
    "distance": "521m",
    "walkingTime": "7 min",
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
    "id": 19,
    "name": "Freshers Block - Restroom 6",
    "lat": 12.751307,
    "lon": 80.199073,
    "distance": "245m",
    "walkingTime": "4 min",
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
    "id": 20,
    "name": "Mechanical Engineering Block - Restroom 1",
    "lat": 12.748989,
    "lon": 80.197627,
    "distance": "516m",
    "walkingTime": "7 min",
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
    "id": 21,
    "name": "Mechanical Engineering Block - Restroom 2",
    "lat": 12.752544,
    "lon": 80.19505,
    "distance": "143m",
    "walkingTime": "2 min",
    "factors": {
      "availability": 70,
      "cleanliness": 61,
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
    "lat": 12.750686,
    "lon": 80.199692,
    "distance": "406m",
    "walkingTime": "6 min",
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
    "id": 23,
    "name": "Civil Engineering Block - Restroom 2",
    "lat": 12.748741,
    "lon": 80.199235,
    "distance": "120m",
    "walkingTime": "2 min",
    "factors": {
      "availability": 70,
      "cleanliness": 74,
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
    "lat": 12.749197,
    "lon": 80.198901,
    "distance": "496m",
    "walkingTime": "7 min",
    "factors": {
      "availability": 70,
      "cleanliness": 62,
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
    "lat": 12.748502,
    "lon": 80.197671,
    "distance": "132m",
    "walkingTime": "2 min",
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
    "id": 26,
    "name": "BME Block - Restroom 1",
    "lat": 12.751422,
    "lon": 80.198527,
    "distance": "136m",
    "walkingTime": "2 min",
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
    "id": 27,
    "name": "BME Block - Restroom 2",
    "lat": 12.749057,
    "lon": 80.196834,
    "distance": "121m",
    "walkingTime": "2 min",
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
    "id": 28,
    "name": "ECE Block - Restroom 1",
    "lat": 12.748388,
    "lon": 80.197588,
    "distance": "480m",
    "walkingTime": "7 min",
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
    "id": 29,
    "name": "ECE Block - Restroom 2",
    "lat": 12.750344,
    "lon": 80.198747,
    "distance": "297m",
    "walkingTime": "4 min",
    "factors": {
      "availability": 70,
      "cleanliness": 49,
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
    "id": 30,
    "name": "SSN Library - Restroom 1",
    "lat": 12.752565,
    "lon": 80.19764,
    "distance": "535m",
    "walkingTime": "7 min",
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
    "id": 31,
    "name": "SSN Library - Restroom 2",
    "lat": 12.751851,
    "lon": 80.199716,
    "distance": "492m",
    "walkingTime": "7 min",
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
    "id": 32,
    "name": "SNU Academic Block 1 - Restroom 1",
    "lat": 12.75319,
    "lon": 80.198999,
    "distance": "409m",
    "walkingTime": "6 min",
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
    "id": 33,
    "name": "SNU Academic Block 1 - Restroom 2",
    "lat": 12.751753,
    "lon": 80.196914,
    "distance": "538m",
    "walkingTime": "7 min",
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
    "id": 34,
    "name": "SNU Academic Block 1 - Restroom 3",
    "lat": 12.750668,
    "lon": 80.197256,
    "distance": "423m",
    "walkingTime": "6 min",
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
    "id": 35,
    "name": "SNU Academic Block 1 - Restroom 4",
    "lat": 12.748565,
    "lon": 80.195917,
    "distance": "50m",
    "walkingTime": "1 min",
    "factors": {
      "availability": 70,
      "cleanliness": 45,
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
    "lat": 12.751415,
    "lon": 80.195198,
    "distance": "272m",
    "walkingTime": "4 min",
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
    "id": 37,
    "name": "SNU Academic Block 1 - Restroom 6",
    "lat": 12.749733,
    "lon": 80.196322,
    "distance": "160m",
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
    "id": 38,
    "name": "SNU Academic Block 2 - Restroom 1",
    "lat": 12.750379,
    "lon": 80.196176,
    "distance": "251m",
    "walkingTime": "4 min",
    "factors": {
      "availability": 70,
      "cleanliness": 48,
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
    "lat": 12.7506,
    "lon": 80.198237,
    "distance": "534m",
    "walkingTime": "7 min",
    "factors": {
      "availability": 70,
      "cleanliness": 87,
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
    "id": 40,
    "name": "SNU Academic Block 2 - Restroom 3",
    "lat": 12.749972,
    "lon": 80.197514,
    "distance": "188m",
    "walkingTime": "3 min",
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
    "id": 41,
    "name": "SNU Academic Block 2 - Restroom 4",
    "lat": 12.750936,
    "lon": 80.197606,
    "distance": "358m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 70,
      "cleanliness": 80,
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
    "id": 42,
    "name": "SNU Academic Block 2 - Restroom 5",
    "lat": 12.750892,
    "lon": 80.196649,
    "distance": "452m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 70,
      "cleanliness": 69,
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
    "lat": 12.751304,
    "lon": 80.19749,
    "distance": "57m",
    "walkingTime": "1 min",
    "factors": {
      "availability": 70,
      "cleanliness": 46,
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
    "lat": 12.750807,
    "lon": 80.197146,
    "distance": "74m",
    "walkingTime": "1 min",
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
    "id": 45,
    "name": "SNU Academic Block 3 - Restroom 2",
    "lat": 12.752507,
    "lon": 80.196996,
    "distance": "294m",
    "walkingTime": "4 min",
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
    "id": 46,
    "name": "SNU Academic Block 3 - Restroom 3",
    "lat": 12.748935,
    "lon": 80.195234,
    "distance": "175m",
    "walkingTime": "3 min",
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
    "id": 47,
    "name": "SNU Academic Block 3 - Restroom 4",
    "lat": 12.752493,
    "lon": 80.195194,
    "distance": "160m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 70,
      "cleanliness": 70,
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
    "lat": 12.752292,
    "lon": 80.19879,
    "distance": "329m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 70,
      "cleanliness": 61,
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
    "lat": 12.75099,
    "lon": 80.197994,
    "distance": "358m",
    "walkingTime": "5 min",
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
    "id": 50,
    "name": "Sports Complex (SNU Chennai)",
    "lat": 12.748443,
    "lon": 80.194912,
    "distance": "92m",
    "walkingTime": "2 min",
    "factors": {
      "availability": 100,
      "cleanliness": 46,
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
    "id": 51,
    "name": "Gents Hostel 1 - Restroom 1",
    "lat": 12.748301,
    "lon": 80.199379,
    "distance": "183m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 100,
      "cleanliness": 78,
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
    "lat": 12.751385,
    "lon": 80.197003,
    "distance": "277m",
    "walkingTime": "4 min",
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
    "id": 53,
    "name": "Gents Hostel 1 - Restroom 3",
    "lat": 12.749032,
    "lon": 80.197439,
    "distance": "434m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 100,
      "cleanliness": 52,
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
    "id": 54,
    "name": "Gents Hostel 1 - Restroom 4",
    "lat": 12.750015,
    "lon": 80.198737,
    "distance": "204m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 100,
      "cleanliness": 77,
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
    "lat": 12.753198,
    "lon": 80.197138,
    "distance": "543m",
    "walkingTime": "7 min",
    "factors": {
      "availability": 100,
      "cleanliness": 73,
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
    "lat": 12.752814,
    "lon": 80.195655,
    "distance": "261m",
    "walkingTime": "4 min",
    "factors": {
      "availability": 100,
      "cleanliness": 42,
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
    "lat": 12.748823,
    "lon": 80.196104,
    "distance": "291m",
    "walkingTime": "4 min",
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
    "id": 58,
    "name": "Gents Hostel 2 - Restroom 4",
    "lat": 12.752188,
    "lon": 80.195542,
    "distance": "261m",
    "walkingTime": "4 min",
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
  },
  {
    "id": 59,
    "name": "Gents Hostel 3 - Restroom 1",
    "lat": 12.750931,
    "lon": 80.195523,
    "distance": "115m",
    "walkingTime": "2 min",
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
    "id": 60,
    "name": "Gents Hostel 3 - Restroom 2",
    "lat": 12.750705,
    "lon": 80.197052,
    "distance": "545m",
    "walkingTime": "7 min",
    "factors": {
      "availability": 100,
      "cleanliness": 87,
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
    "lat": 12.752328,
    "lon": 80.199113,
    "distance": "369m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 100,
      "cleanliness": 87,
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
    "lat": 12.750756,
    "lon": 80.19959,
    "distance": "117m",
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
    "id": 63,
    "name": "Gents Hostel 4 - Restroom 1",
    "lat": 12.752634,
    "lon": 80.195073,
    "distance": "309m",
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
    "id": 64,
    "name": "Gents Hostel 4 - Restroom 2",
    "lat": 12.750881,
    "lon": 80.197776,
    "distance": "86m",
    "walkingTime": "2 min",
    "factors": {
      "availability": 100,
      "cleanliness": 48,
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
    "lat": 12.749003,
    "lon": 80.199774,
    "distance": "392m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 100,
      "cleanliness": 65,
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
    "id": 66,
    "name": "Gents Hostel 4 - Restroom 4",
    "lat": 12.748713,
    "lon": 80.197646,
    "distance": "98m",
    "walkingTime": "2 min",
    "factors": {
      "availability": 100,
      "cleanliness": 82,
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
    "lat": 12.748627,
    "lon": 80.198196,
    "distance": "239m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 100,
      "cleanliness": 45,
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
    "id": 68,
    "name": "Gents Hostel 5 - Restroom 2",
    "lat": 12.74923,
    "lon": 80.194917,
    "distance": "268m",
    "walkingTime": "4 min",
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
    "id": 69,
    "name": "Gents Hostel 5 - Restroom 3",
    "lat": 12.748613,
    "lon": 80.196171,
    "distance": "77m",
    "walkingTime": "1 min",
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
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 70,
    "name": "Gents Hostel 5 - Restroom 4",
    "lat": 12.74917,
    "lon": 80.199187,
    "distance": "193m",
    "walkingTime": "3 min",
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
    "id": 71,
    "name": "Gents Hostel 7 - Restroom 1",
    "lat": 12.75068,
    "lon": 80.195491,
    "distance": "150m",
    "walkingTime": "2 min",
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
    "id": 72,
    "name": "Gents Hostel 7 - Restroom 2",
    "lat": 12.749477,
    "lon": 80.195698,
    "distance": "365m",
    "walkingTime": "5 min",
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
    "id": 73,
    "name": "Gents Hostel 7 - Restroom 3",
    "lat": 12.752862,
    "lon": 80.195141,
    "distance": "86m",
    "walkingTime": "2 min",
    "factors": {
      "availability": 100,
      "cleanliness": 40,
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
    "lat": 12.753249,
    "lon": 80.19744,
    "distance": "416m",
    "walkingTime": "6 min",
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
    "id": 75,
    "name": "Ladies Hostel 1 - Restroom 1",
    "lat": 12.750433,
    "lon": 80.194903,
    "distance": "479m",
    "walkingTime": "6 min",
    "factors": {
      "availability": 100,
      "cleanliness": 58,
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
    "id": 76,
    "name": "Ladies Hostel 1 - Restroom 2",
    "lat": 12.752059,
    "lon": 80.198195,
    "distance": "380m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 100,
      "cleanliness": 85,
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
    "lat": 12.753143,
    "lon": 80.196369,
    "distance": "439m",
    "walkingTime": "6 min",
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
    "id": 78,
    "name": "Ladies Hostel 1 - Restroom 4",
    "lat": 12.750097,
    "lon": 80.19726,
    "distance": "542m",
    "walkingTime": "7 min",
    "factors": {
      "availability": 100,
      "cleanliness": 85,
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
    "lat": 12.752974,
    "lon": 80.198016,
    "distance": "193m",
    "walkingTime": "3 min",
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
    "id": 80,
    "name": "Ladies Hostel 2 - Restroom 2",
    "lat": 12.749991,
    "lon": 80.19885,
    "distance": "431m",
    "walkingTime": "6 min",
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
      "24/7 Access"
    ],
    "reports": []
  },
  {
    "id": 81,
    "name": "Ladies Hostel 2 - Restroom 3",
    "lat": 12.748882,
    "lon": 80.19605,
    "distance": "238m",
    "walkingTime": "3 min",
    "factors": {
      "availability": 100,
      "cleanliness": 73,
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
    "lat": 12.751512,
    "lon": 80.196682,
    "distance": "362m",
    "walkingTime": "5 min",
    "factors": {
      "availability": 100,
      "cleanliness": 78,
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

      // Estimate distance naively for demo purposes (1 deg ~ 111km)
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
          availability: 80, // Default assumptions for live data
          cleanliness: 50,
          accessibility: tags.wheelchair === 'yes' ? 100 : (tags.wheelchair === 'no' ? 0 : null),
          facilities: facilities.length > 0 ? 80 : 50,
          affordability: tags.fee === 'yes' ? 0 : 100
        },
        facilities,
        reports: [] // Will be hydrated from local storage in App if implemented
      };
    });
  } catch (err) {
    console.error('Failed to fetch from Overpass:', err);
    throw err;
  }
}
