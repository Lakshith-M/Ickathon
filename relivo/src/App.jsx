import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { calculateScore, demoData, fetchLiveRestrooms } from './utils';
import { Moon, Sun, AlertTriangle, Filter, CheckCircle2, Navigation, AlertCircle, MapPin, Loader2, Star } from 'lucide-react';

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [demoMode, setDemoMode] = useState(true);
  const [restrooms, setRestrooms] = useState(demoData);
  const [selectedRestroom, setSelectedRestroom] = useState(null);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [userLoc, setUserLoc] = useState([40.7820, -73.9650]); // Central park area fallback
  const [filters, setFilters] = useState({ freeOnly: false, accessible: false });
  const [loading, setLoading] = useState(false);
  const [geoError, setGeoError] = useState(null);
  
  // Feedback state
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState("");


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
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

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
    return true;
  });

  return (
    <div className="flex h-screen w-full flex-col md:flex-row overflow-hidden bg-brand-offWhite dark:bg-gray-900 transition-colors">
      
      {/* Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 h-1/2 md:h-full flex flex-col shadow-xl z-20 bg-white dark:bg-brand-plumDark">
        <div className="p-6 bg-brand-plum text-white flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">RELIVO</h1>
            <p className="text-sm opacity-90 mt-1">Relief, right when you need it.</p>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-white/20">
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <button 
            onClick={handleEmergency}
            className="w-full bg-brand-coral hover:bg-red-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform transition active:scale-95 flex items-center justify-center gap-3 text-lg mb-6"
          >
            <AlertTriangle size={24} />
            FIND A TOILET NOW
          </button>

          <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold flex items-center gap-2 dark:text-gray-200">
                <MapPin size={18} /> Location
              </div>
              <button 
                onClick={requestLocation}
                disabled={loading}
                className="text-xs bg-brand-plum text-white px-3 py-1.5 rounded-lg hover:bg-brand-plumDark transition disabled:opacity-50 flex items-center gap-1"
              >
                {loading ? <Loader2 size={12} className="animate-spin" /> : null}
                Use My Location
              </button>
            </div>
            {geoError && <p className="text-xs text-red-500 mt-1">{geoError}</p>}
          </div>

          <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-3 font-semibold dark:text-gray-200">
              <Filter size={18} /> Filters
            </div>
            <div className="flex flex-col gap-2 text-sm dark:text-gray-300">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={filters.freeOnly} onChange={e => setFilters({...filters, freeOnly: e.target.checked})} className="rounded text-brand-plum" />
                Free only
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={filters.accessible} onChange={e => setFilters({...filters, accessible: e.target.checked})} className="rounded text-brand-plum" />
                Wheelchair accessible
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <span>{filteredRestrooms.length} results</span>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                {demoMode ? 'Demo Data' : 'Live Data'}
              </span>
            </div>

            {filteredRestrooms.length === 0 ? (
              <div className="text-center p-8 text-gray-400">
                No restrooms match your filters.
              </div>
            ) : (
              filteredRestrooms.map(r => {
                const scoreData = calculateScore(r.factors);
                return (
                  <div 
                    key={r.id} 
                    onClick={() => setSelectedRestroom(r)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${selectedRestroom?.id === r.id ? 'border-brand-plum bg-brand-plum/5 dark:bg-brand-plum/20' : 'border-transparent bg-gray-50 dark:bg-gray-800 hover:shadow-md'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg dark:text-white">{r.name}</h3>
                      <div className="flex flex-col items-end">
                        <span className="text-xl font-black text-brand-plum dark:text-brand-coral">{scoreData.score}</span>
                        <span className="text-[10px] text-gray-500 uppercase">Score</span>
                      </div>
                    </div>
                    <div className="flex gap-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <span className="font-semibold">{r.walkingTime} walk</span> • <span>{r.distance}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {scoreData.provisional && (
                        <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-1">
                          <AlertCircle size={10} /> Provisional ({scoreData.coverage}%)
                        </span>
                      )}
                      {r.factors.availability > 80 && (
                        <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full flex items-center gap-1">
                          <CheckCircle2 size={10} /> Likely Open
                        </span>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative h-1/2 md:h-full z-10">
        <MapContainer center={userLoc} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeView center={userLoc} zoom={15} />
          {filteredRestrooms.map(r => (
            <Marker key={r.id} position={[r.lat, r.lon]}>
              <Popup>
                <div className="font-bold">{r.name}</div>
                <div>{r.distance} away</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Detail Overlay */}
      {selectedRestroom && (
        <div className="absolute bottom-4 left-1/3 ml-4 right-4 md:right-auto md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-30 p-6 border border-gray-100 dark:border-gray-700">
          <button 
            onClick={() => setSelectedRestroom(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold mb-1 dark:text-white pr-6">{selectedRestroom.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">{selectedRestroom.distance} • {selectedRestroom.walkingTime} walk</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-center">
              <div className="text-2xl font-black text-brand-plum dark:text-brand-coral">
                {calculateScore(selectedRestroom.factors).score}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Reliability</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-center flex flex-col justify-center">
              <span className="text-sm font-semibold dark:text-gray-300">
                {selectedRestroom.reports.length > 0 ? 'Recent Reports' : 'No Reports'}
              </span>
              <span className="text-xs text-gray-400 mt-1">Local demo data</span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Facilities</h4>
            <div className="flex flex-wrap gap-2">
              {selectedRestroom.facilities.map(f => (
                <span key={f} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {selectedRestroom.reports.filter(r => r.type === 'rating' && r.comment).length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Recent Comments</h4>
              <div className="flex flex-col gap-2 max-h-32 overflow-y-auto pr-2">
                {selectedRestroom.reports.filter(r => r.type === 'rating' && r.comment).map((r, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-900 p-2 rounded text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={12} fill={s <= r.rating ? "#f59e0b" : "none"} color={s <= r.rating ? "#f59e0b" : "#9ca3af"} />
                      ))}
                    </div>
                    {r.comment}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6 border-t dark:border-gray-700 pt-4">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Leave Feedback</h4>
            <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-3">
              <div className="flex gap-1 justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFeedbackRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      size={28}
                      fill={star <= feedbackRating ? "#f59e0b" : "none"}
                      color={star <= feedbackRating ? "#f59e0b" : "#9ca3af"}
                    />
                  </button>
                ))}
              </div>
              <textarea
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                placeholder="Share your experience (optional)"
                className="w-full p-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-brand-plum outline-none resize-none"
                rows="2"
              />
              <button 
                type="submit" 
                disabled={feedbackRating === 0}
                className="w-full py-2 bg-brand-plum text-white rounded-lg hover:bg-brand-plumDark transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                Submit & Update Score
              </button>
            </form>
          </div>

          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${selectedRestroom.lat},${selectedRestroom.lon}`}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-3 px-4 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-800 transition"
          >
            <Navigation size={18} />
            Navigate Here
          </a>
        </div>
      )}
    </div>
  );
}
