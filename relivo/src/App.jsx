import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { calculateScore, demoData, fetchLiveRestrooms } from './utils';
import { AlertTriangle, Filter, CheckCircle2, Navigation, AlertCircle, MapPin, Loader2, Star, Users } from 'lucide-react';

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}


function MapOverlays({ requestLocation }) {
  const map = useMap();
  return (
    <>
      <button onClick={() => {}} style={{ position: 'absolute', left: '50%', top: '24px', transform: 'translateX(-50%)', height: '44px', padding: '0 20px', borderRadius: '999px', border: '0', background: '#FFFFFF', color: '#10262B', fontSize: '14px', fontWeight: '700', boxShadow: '0 4px 16px rgba(16,38,43,0.18)', zIndex: 1000, cursor: 'pointer' }}>Search this area</button>

      <div style={{ position: 'absolute', right: '24px', top: '24px', display: 'flex', flexDirection: 'column', background: '#FFFFFF', borderRadius: '14px', boxShadow: '0 4px 16px rgba(16,38,43,0.18)', overflow: 'hidden', zIndex: 1000 }}>
        <button onClick={() => map.zoomIn()} aria-label='Zoom in' style={{ width: '48px', height: '48px', border: '0', background: '#FFFFFF', fontSize: '24px', fontWeight: '500', color: '#10262B', cursor: 'pointer' }}>+</button>
        <div style={{ height: '1px', background: '#DDE5E3' }}></div>
        <button onClick={() => map.zoomOut()} aria-label='Zoom out' style={{ width: '48px', height: '48px', border: '0', background: '#FFFFFF', fontSize: '24px', fontWeight: '500', color: '#10262B', cursor: 'pointer' }}>−</button>
      </div>
      
      <button onClick={requestLocation} aria-label='Center on my location' style={{ position: 'absolute', right: '24px', top: '150px', width: '48px', height: '48px', border: '0', borderRadius: '14px', background: '#FFFFFF', boxShadow: '0 4px 16px rgba(16,38,43,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, cursor: 'pointer' }}>
        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='#0B6564' strokeWidth='2' strokeLinecap='round' aria-hidden='true'><circle cx='12' cy='12' r='7'></circle><circle cx='12' cy='12' r='2'></circle><path d='M12 2v3M12 19v3M2 12h3M19 12h3'></path></svg>
      </button>
    </>
  );
}

export default function App() {

  const [demoMode, setDemoMode] = useState(true);
  const [restrooms, setRestrooms] = useState(demoData);
  const [selectedRestroom, setSelectedRestroom] = useState(null);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [userLoc, setUserLoc] = useState([40.7820, -73.9650]); // Central park area fallback
  const [filters, setFilters] = useState({ freeOnly: false, accessible: false, openNow: false, gender: 'all', maxDistance: '' });
  const [loading, setLoading] = useState(false);
  const [geoError, setGeoError] = useState(null);
  
  // Feedback state
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [hasNavigated, setHasNavigated] = useState(false);


  const requestLocation = () => {
    setLoading(true);
    setGeoError(null);
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLoc([latitude, longitude]);
        
        try {
          const liveData = await fetchLiveRestrooms(latitude, longitude);
          if (liveData.length > 0) {
            setRestrooms(liveData);
            setDemoMode(false);
          } else {
            setGeoError("No restrooms found nearby. Showing demo data.");
          }
        } catch (err) {
          setGeoError("Failed to load live data. Showing demo data.");
        }
        setLoading(false);
      },
      (error) => {
        setGeoError("Location permission denied. Showing demo data.");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (selectedRestroom) {
      setHasNavigated(false);
      setFeedbackRating(0);
      setFeedbackComment("");
    }
  }, [selectedRestroom?.id]);

  const handleEmergency = () => {
    setEmergencyMode(true);
    // Find best
    const best = [...restrooms].sort((a, b) => {
      const scoreA = calculateScore(a.factors).score;
      const scoreB = calculateScore(b.factors).score;
      return scoreB - scoreA;
    })[0];
    setSelectedRestroom(best);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!selectedRestroom || feedbackRating === 0) return;
    
    // Map 1-5 to 20-100
    const ratingScore = feedbackRating * 20;
    
    const updated = restrooms.map(r => {
      if (r.id === selectedRestroom.id) {
        const newFactors = { ...r.factors };
        
        // Update cleanliness and facilities based on user rating to affect reliability score
        newFactors.cleanliness = newFactors.cleanliness !== null ? (newFactors.cleanliness + ratingScore) / 2 : ratingScore;
        newFactors.facilities = newFactors.facilities !== null ? (newFactors.facilities + ratingScore) / 2 : ratingScore;
        // Optionally influence availability
        newFactors.availability = newFactors.availability !== null ? (newFactors.availability * 0.8 + ratingScore * 0.2) : ratingScore;

        return {
          ...r,
          factors: newFactors,
          reports: [{ type: 'rating', rating: feedbackRating, comment: feedbackComment, timestamp: Date.now() }, ...r.reports]
        };
      }
      return r;
    });
    setRestrooms(updated);
    setSelectedRestroom(updated.find(r => r.id === selectedRestroom.id));
    setFeedbackRating(0);
    setFeedbackComment("");
    alert('Thank you for your feedback! The reliability score has been updated.');
  };

  const filteredRestrooms = restrooms.filter(r => {
    if (filters.freeOnly && r.factors.affordability !== 100) return false;
    if (filters.accessible && r.factors.accessibility !== 100) return false;
    if (filters.gender === 'male' && !r.facilities.includes('Male') && !r.facilities.includes('Unisex')) return false;
    if (filters.gender === 'female' && !r.facilities.includes('Female') && !r.facilities.includes('Unisex')) return false;
    if (filters.openNow && r.factors.availability < 80) return false;
    if (filters.maxDistance && !isNaN(parseInt(filters.maxDistance))) {
      if (r.distanceMeters > parseInt(filters.maxDistance)) return false;
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden', background: '#E7EEE9', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '440px', flex: 'none', height: '100%', boxSizing: 'border-box', background: '#FFFFFF', borderRight: '1px solid #DDE5E3', padding: '24px 24px 0 24px', display: 'flex', flexDirection: 'column', gap: '18px', overflowY: 'auto' }}>

        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: '#0B6564', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-6-5.2-6-10a6 6 0 1112 0c0 4.8-6 10-6 10z"></path><circle cx="12" cy="11" r="2.2"></circle></svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.15' }}>
              <span style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.02em' }}>Relivo</span>
              <span style={{ fontSize: '13px', color: '#4F6468' }}>Relief, right when you need it.</span>
            </div>
          </div>
          {demoMode && <span style={{ fontSize: '12px', fontWeight: '700', color: '#7A4A00', background: '#FFF1D0', borderRadius: '999px', padding: '6px 10px' }}>Demo data</span>}
        </header>

        <button onClick={handleEmergency} style={{ width: '100%', height: '68px', border: '0', borderRadius: '18px', background: '#C93F2A', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', boxShadow: '0 8px 20px rgba(201,63,42,0.28)', cursor: 'pointer', transition: 'transform 0.1s' }} onMouseDown={e => e.currentTarget.style.transform='scale(0.98)'} onMouseUp={e => e.currentTarget.style.transform='scale(1)'} onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="3"></circle><path d="M12 1v3M12 20v3M1 12h3M20 12h3"></path></svg>
          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1.2' }}>
            <span style={{ fontSize: '19px', fontWeight: '800' }}>Find a toilet now</span>
            <span style={{ fontSize: '13px', fontWeight: '500', opacity: '0.92' }}>Nearest open one</span>
          </span>
        </button>

        <section style={{ border: '1px solid #DDE5E3', borderRadius: '16px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '0' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B6564" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-6-5.2-6-10a6 6 0 1112 0c0 4.8-6 10-6 10z"></path><circle cx="12" cy="11" r="2.2"></circle></svg>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.25', minWidth: '0' }}>
                <span style={{ fontSize: '15px', fontWeight: '700' }}>{demoMode ? 'Upper West Side' : 'Current Location'}</span>
                <span style={{ fontSize: '12px', color: '#4F6468' }}>{demoMode ? 'Demo location' : 'Live location'}</span>
              </div>
            </div>
            <button onClick={requestLocation} disabled={loading} style={{ height: '36px', padding: '0 14px', borderRadius: '10px', border: '1.5px solid #0B6564', background: '#FFFFFF', color: '#0B6564', fontSize: '13px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer' }}>{loading ? 'Locating...' : 'Use my location'}</button>
          </div>
          {demoMode && <p style={{ margin: '0', fontSize: '12.5px', lineHeight: '1.45', color: '#7A4A00', background: '#FFF6E0', borderRadius: '10px', padding: '8px 10px' }}>Location access is off, so distances are measured from the demo spot. Allow location in your browser for accurate results.</p>}
          {geoError && <p style={{ margin: '0', fontSize: '12.5px', lineHeight: '1.45', color: '#7A4A00', background: '#FFF6E0', borderRadius: '10px', padding: '8px 10px' }}>{geoError}</p>}
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button onClick={() => setFilters({...filters, freeOnly: !filters.freeOnly})} style={{ height: '40px', padding: '0 16px', borderRadius: '999px', border: filters.freeOnly ? '1.5px solid #0B6564' : '1.5px solid #C9D5D2', background: filters.freeOnly ? '#0B6564' : '#FFFFFF', color: filters.freeOnly ? '#FFFFFF' : '#10262B', fontSize: '14px', fontWeight: filters.freeOnly ? '700' : '600', cursor: 'pointer' }}>Free</button>
            <button onClick={() => setFilters({...filters, openNow: !filters.openNow})} style={{ height: '40px', padding: '0 16px', borderRadius: '999px', border: filters.openNow ? '1.5px solid #0B6564' : '1.5px solid #C9D5D2', background: filters.openNow ? '#0B6564' : '#FFFFFF', color: filters.openNow ? '#FFFFFF' : '#10262B', fontSize: '14px', fontWeight: filters.openNow ? '700' : '600', cursor: 'pointer' }}>Open now</button>
            <button onClick={() => setFilters({...filters, accessible: !filters.accessible})} style={{ height: '40px', padding: '0 16px', borderRadius: '999px', border: filters.accessible ? '1.5px solid #0B6564' : '1.5px solid #C9D5D2', background: filters.accessible ? '#0B6564' : '#FFFFFF', color: filters.accessible ? '#FFFFFF' : '#10262B', fontSize: '14px', fontWeight: filters.accessible ? '700' : '600', cursor: 'pointer' }}>Wheelchair accessible</button>
          </div>
          <div style={{ display: 'flex', background: '#EAF0EF', borderRadius: '12px', padding: '4px', gap: '4px' }}>
            <button onClick={() => setFilters({...filters, gender: 'all'})} style={{ flex: '1', height: '36px', border: '0', borderRadius: '9px', background: filters.gender === 'all' ? '#FFFFFF' : 'transparent', color: filters.gender === 'all' ? '#10262B' : '#4F6468', fontSize: '14px', fontWeight: filters.gender === 'all' ? '700' : '600', boxShadow: filters.gender === 'all' ? '0 1px 3px rgba(16,38,43,0.15)' : 'none', cursor: 'pointer' }}>All</button>
            <button onClick={() => setFilters({...filters, gender: 'male'})} style={{ flex: '1', height: '36px', border: '0', borderRadius: '9px', background: filters.gender === 'male' ? '#FFFFFF' : 'transparent', color: filters.gender === 'male' ? '#10262B' : '#4F6468', fontSize: '14px', fontWeight: filters.gender === 'male' ? '700' : '600', boxShadow: filters.gender === 'male' ? '0 1px 3px rgba(16,38,43,0.15)' : 'none', cursor: 'pointer' }}>Men</button>
            <button onClick={() => setFilters({...filters, gender: 'female'})} style={{ flex: '1', height: '36px', border: '0', borderRadius: '9px', background: filters.gender === 'female' ? '#FFFFFF' : 'transparent', color: filters.gender === 'female' ? '#10262B' : '#4F6468', fontSize: '14px', fontWeight: filters.gender === 'female' ? '700' : '600', boxShadow: filters.gender === 'female' ? '0 1px 3px rgba(16,38,43,0.15)' : 'none', cursor: 'pointer' }}>Women</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <label htmlFor="dist" style={{ fontWeight: '700' }}>Max distance</label>
              <span style={{ fontWeight: '700', color: '#0B6564' }}>{filters.maxDistance || 'Any'} m</span>
            </div>
            <input id="dist" type="range" min="100" max="2000" step="100" value={filters.maxDistance || 2000} onChange={e => setFilters({...filters, maxDistance: e.target.value})} style={{ width: '100%', accentColor: '#0B6564', margin: '0' }} />
          </div>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: '1', minHeight: '0', overflowY: 'auto', paddingBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '8px' }}>
            <h2 style={{ margin: '0', fontSize: '16px', fontWeight: '800' }}>{filteredRestrooms.length} restrooms nearby</h2>
            <span style={{ fontSize: '13px', color: '#4F6468' }}>Nearest first</span>
          </div>

          {filteredRestrooms.map(r => {
            const isSelected = selectedRestroom?.id === r.id;
            return (
              <article key={r.id} onClick={() => setSelectedRestroom(r)} style={{ border: isSelected ? '2px solid #0B6564' : '1px solid #DDE5E3', background: isSelected ? '#F0F8F6' : '#FFFFFF', borderRadius: '16px', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '6px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.25' }}>
                    <span style={{ fontSize: '16px', fontWeight: '800' }}>{r.name}</span>
                    <span style={{ fontSize: '13px', color: '#4F6468' }}>Reliability Score: {calculateScore(r.factors).score}</span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: isSelected ? '#FFFFFF' : '#10262B', background: isSelected ? '#0B6564' : '#EAF0EF', borderRadius: '999px', padding: '5px 10px', whiteSpace: 'nowrap' }}>{r.distance}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '12.5px' }}>
                  <span style={{ fontWeight: '700', color: '#1B6B3A' }}>{r.factors.availability > 80 ? 'Likely Open' : 'Status Unknown'}</span>
                  <span style={{ color: '#8DA0A3' }}>•</span>
                  <span style={{ color: '#4F6468' }}>{r.walkingTime} walk</span>
                  {r.factors.affordability === 100 && <span style={{ background: isSelected ? '#DDEFEA' : '#EAF0EF', color: isSelected ? '#0B5453' : '#33494D', fontWeight: '700', borderRadius: '6px', padding: '3px 8px' }}>Free</span>}
                  {r.factors.accessibility === 100 && <span style={{ background: isSelected ? '#DDEFEA' : '#EAF0EF', color: isSelected ? '#0B5453' : '#33494D', fontWeight: '700', borderRadius: '6px', padding: '3px 8px' }}>Wheelchair</span>}
                </div>
              </article>
            );
          })}
        </section>
      </aside>

      {/* Map Area */}
      <main style={{ flex: '1', position: 'relative', height: '100%', background: '#E7EEE9', overflow: 'hidden' }}>
        <MapContainer center={userLoc} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeView center={userLoc} zoom={15} />
          <MapOverlays requestLocation={requestLocation} />
          {filteredRestrooms.map(r => (
            <Marker key={r.id} position={[r.lat, r.lon]}>
              <Popup>
                <div className="font-bold">{r.name}</div>
                <div>{r.distance} away</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Zoom controls */}
        <div style={{ position: 'absolute', right: '24px', top: '24px', display: 'flex', flexDirection: 'column', background: '#FFFFFF', borderRadius: '14px', boxShadow: '0 4px 16px rgba(16,38,43,0.18)', overflow: 'hidden', zIndex: 1000 }}>
          <button aria-label='Zoom in' style={{ width: '48px', height: '48px', border: '0', background: '#FFFFFF', fontSize: '24px', fontWeight: '500', color: '#10262B', cursor: 'pointer' }}>+</button>
          <div style={{ height: '1px', background: '#DDE5E3' }}></div>
          <button aria-label='Zoom out' style={{ width: '48px', height: '48px', border: '0', background: '#FFFFFF', fontSize: '24px', fontWeight: '500', color: '#10262B', cursor: 'pointer' }}>−</button>
        </div>
        
        <button onClick={requestLocation} aria-label='Center on my location' style={{ position: 'absolute', right: '24px', top: '150px', width: '48px', height: '48px', border: '0', borderRadius: '14px', background: '#FFFFFF', boxShadow: '0 4px 16px rgba(16,38,43,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, cursor: 'pointer' }}>
          <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='#0B6564' strokeWidth='2' strokeLinecap='round' aria-hidden='true'><circle cx='12' cy='12' r='7'></circle><circle cx='12' cy='12' r='2'></circle><path d='M12 2v3M12 19v3M2 12h3M19 12h3'></path></svg>
        </button>


        {/* Floating Callout for Selected Restroom */}
        {selectedRestroom && (
          <div style={{ position: 'absolute', left: '24px', top: '24px', width: '320px', boxSizing: 'border-box', background: '#FFFFFF', borderRadius: '18px', padding: '16px', boxShadow: '0 12px 32px rgba(16,38,43,0.25)', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 1000 }}>
            <button onClick={() => setSelectedRestroom(null)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#8DA0A3' }}>✕</button>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.25', paddingRight: '20px' }}>
              <span style={{ fontSize: '17px', fontWeight: '800' }}>{selectedRestroom.name}</span>
              <span style={{ fontSize: '13px', color: '#4F6468' }}>{selectedRestroom.distance} • {selectedRestroom.walkingTime} walk • {selectedRestroom.factors.affordability === 100 ? 'Free' : 'Paid'}</span>
            </div>
            
            {hasNavigated && (
              <div style={{ borderTop: '1px solid #DDE5E3', paddingTop: '12px', marginTop: '4px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#4F6468', marginBottom: '8px' }}>Leave Feedback</h4>
                <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '4px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setFeedbackRating(star)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Star size={24} fill={star <= feedbackRating ? "#f59e0b" : "none"} color={star <= feedbackRating ? "#f59e0b" : "#9ca3af"} />
                      </button>
                    ))}
                  </div>
                  <textarea value={feedbackComment} onChange={(e) => setFeedbackComment(e.target.value)} placeholder="Share your experience..." style={{ width: '100%', padding: '8px', fontSize: '13px', border: '1px solid #DDE5E3', borderRadius: '8px', resize: 'none' }} rows="2" />
                  <button type="submit" disabled={feedbackRating === 0} style={{ width: '100%', padding: '8px', background: '#0B6564', color: '#FFFFFF', borderRadius: '8px', fontSize: '13px', fontWeight: '700', border: 'none', cursor: feedbackRating === 0 ? 'not-allowed' : 'pointer', opacity: feedbackRating === 0 ? 0.5 : 1 }}>Submit Feedback</button>
                </form>
              </div>
            )}
            
            {!hasNavigated && selectedRestroom.reports.filter(r => r.type === 'rating' && r.comment).length > 0 && (
              <div style={{ maxHeight: '80px', overflowY: 'auto', fontSize: '12px', color: '#4F6468', borderTop: '1px solid #DDE5E3', paddingTop: '8px' }}>
                <span style={{ fontWeight: '700', display: 'block', marginBottom: '4px' }}>Recent Comments</span>
                {selectedRestroom.reports.filter(r => r.type === 'rating' && r.comment).map((r, i) => (
                  <div key={i} style={{ background: '#F0F8F6', padding: '6px', borderRadius: '6px', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', gap: '2px', marginBottom: '2px' }}>
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={10} fill={s <= r.rating ? "#f59e0b" : "none"} color={s <= r.rating ? "#f59e0b" : "#9ca3af"} />
                      ))}
                    </div>
                    {r.comment}
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${selectedRestroom.lat},${selectedRestroom.lon}`} target="_blank" rel="noreferrer" onClick={() => setHasNavigated(true)} style={{ flex: '1', height: '44px', border: '0', borderRadius: '12px', background: '#10262B', color: '#FFFFFF', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>Get directions</a>
            </div>
          </div>
        )}
      </main>
    </div>

  );
}
