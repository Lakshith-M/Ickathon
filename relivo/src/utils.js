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
    id: 1,
    name: "Central Park Public Restroom",
    lat: 40.7829,
    lon: -73.9654,
    distance: "150m",
    distanceMeters: 150,
    walkingTime: "2 min",
    factors: {
      availability: 90,
      cleanliness: 60,
      accessibility: 100,
      facilities: 80,
      affordability: 100
    },
    facilities: ["Water", "Wheelchair access", "Free", "Unisex", "Male", "Female"],
    reports: [
      { type: "clean", timestamp: Date.now() - 1000 * 60 * 15 } // 15 mins ago
    ]
  },
  {
    id: 2,
    name: "Metro Station Toilet",
    lat: 40.7810,
    lon: -73.9660,
    distance: "300m",
    distanceMeters: 300,
    walkingTime: "4 min",
    factors: {
      availability: 100,
      cleanliness: 40,
      accessibility: null,
      facilities: 50,
      affordability: 50
    },
    facilities: ["Paid", "Male"],
    reports: [
      { type: "dirty", timestamp: Date.now() - 1000 * 60 * 120 } // 2 hours ago
    ]
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
      if (tags.unisex === 'yes') facilities.push('Unisex');
      if (tags.male === 'yes' || (!tags.male && !tags.female && !tags.unisex)) facilities.push('Male'); // default to both if unspecified in many places
      if (tags.female === 'yes' || (!tags.male && !tags.female && !tags.unisex)) facilities.push('Female');

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
        distanceMeters: distM,
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
