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
