import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { calculateScore, fetchLiveRestrooms } from './utils';
import { AlertTriangle, Filter, CheckCircle, Navigation, AlertCircle, MapPin, Loader2, Star, X, Info, Plus } from 'lucide-react';
import AdminDashboard from './AdminDashboard';

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function App() {
  const adminEmails = ['admin@relivo.com', 'lakshithalizar@gmail.com'];
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('relivo_auth') !== null);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('relivo_auth') === 'admin');
  const [showAdmin, setShowAdmin] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');
  
  const [customRestrooms, setCustomRestrooms] = useState(() => JSON.parse(localStorage.getItem('relivo_custom_restrooms') || '[]'));
  const [deletedIds, setDeletedIds] = useState(() => JSON.parse(localStorage.getItem('relivo_deleted_ids') || '[]'));
  const [requests, setRequests] = useState(() => JSON.parse(localStorage.getItem('relivo_requests') || '[]'));
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRestroomForm, setNewRestroomForm] = useState({ name: '', free: false, accessible: false });

  const [restrooms, setRestrooms] = useState([]);
  const [selectedRestroom, setSelectedRestroom] = useState(null);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [userLoc, setUserLoc] = useState([12.7508, 80.1973]); // SSN College fallback
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
          const combined = [...liveData, ...customRestrooms].filter(r => !deletedIds.includes(r.id));
          if (combined.length > 0) {
            setRestrooms(combined);
          } else {
            setGeoError("No restrooms found nearby.");
          }
        } catch (err) {
          setGeoError("Failed to load live data.");
        }
        setLoading(false);
      },
      (error) => {
        setGeoError("Location permission denied.");
        setLoading(false);
      }
    );
  };

  const handleEmergency = () => {
    setEmergencyMode(true);
    
    // Sort by distance roughly (parse integer from distance string like "200m")
    const withScoreAndDist = restrooms.map(r => ({
      ...r,
      distInt: parseInt(r.distance) || 9999,
      scoreInt: calculateScore(r.factors).score
    }));

    const sortedByDist = [...withScoreAndDist].sort((a, b) => a.distInt - b.distInt);
    const sortedByScore = [...withScoreAndDist].sort((a, b) => b.scoreInt - a.scoreInt);

    const nearest = sortedByDist[0];
    const best = sortedByScore[0];
    
    // Find an alternative that is neither nearest nor best, preferably high score
    let alternative = null;
    for (const r of sortedByScore) {
      if (r.id !== nearest.id && r.id !== best.id) {
        alternative = r;
        break;
      }
    }

    setRecommendations({ nearest, best, alternative });
    setSelectedRestroom(nearest);
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

  const handleReport = (type) => {
    if (!selectedRestroom) return;
    const updated = restrooms.map(r => {
      if (r.id === selectedRestroom.id) {
        return {
          ...r,
          reports: [{ type, timestamp: Date.now() }, ...r.reports]
        };
      }
      return r;
    });
    setRestrooms(updated);
    setSelectedRestroom(updated.find(r => r.id === selectedRestroom.id));
    if (emergencyMode && recommendations) {
       // Recompute recommendations if in emergency mode so report reflects
    }
    alert(`Report "${type}" saved!`);
  };

  const filteredRestrooms = restrooms.filter(r => {
    if (filters.freeOnly && r.factors.affordability !== 100) return false;
    if (filters.accessible && r.factors.accessibility !== 100) return false;
    return true;
  });

  const getFreshnessLabel = (timestamp) => {
    const diffMins = (Date.now() - timestamp) / 60000;
    if (diffMins < 30) return "Very fresh";
    if (diffMins < 120) return "Recent";
    if (diffMins < 1440) return "Aging";
    return "Stale";
  };

  const handleAuth = (e) => {
    e.preventDefault();
    setAuthError('');
    
    if (!loginForm.email || !loginForm.password) {
      setAuthError('Please fill in all fields');
      return;
    }

    const users = JSON.parse(localStorage.getItem('relivo_users') || '[]');

    if (authMode === 'signup') {
      if (adminEmails.includes(loginForm.email)) {
        setAuthError('Cannot register as admin.');
        return;
      }
      if (users.find(u => u.email === loginForm.email)) {
        setAuthError('User already exists. Please login.');
        return;
      }
      users.push({ email: loginForm.email, password: loginForm.password });
      localStorage.setItem('relivo_users', JSON.stringify(users));
      localStorage.setItem('relivo_auth', 'user');
      setIsAuthenticated(true);
      setIsAdmin(false);
    } else {
      if (adminEmails.includes(loginForm.email) && loginForm.password === 'admin') {
        localStorage.setItem('relivo_auth', 'admin');
        setIsAuthenticated(true);
        setIsAdmin(true);
        return;
      }

      const user = users.find(u => u.email === loginForm.email && u.password === loginForm.password);
      if (user) {
        localStorage.setItem('relivo_auth', 'user');
        setIsAuthenticated(true);
        setIsAdmin(false);
      } else {
        setAuthError('Invalid email or password');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('relivo_auth');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setShowAdmin(false);
    setLoginForm({ email: '', password: '' });
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!newRestroomForm.name) return;
    const req = {
      id: 'req-' + Date.now(),
      ...newRestroomForm,
      lat: userLoc[0] + (Math.random() * 0.002 - 0.001), // Dummy jitter around user loc
      lon: userLoc[1] + (Math.random() * 0.002 - 0.001)
    };
    const updated = [...requests, req];
    setRequests(updated);
    localStorage.setItem('relivo_requests', JSON.stringify(updated));
    setShowAddModal(false);
    setNewRestroomForm({ name: '', free: false, accessible: false });
    alert('Request sent to admin for approval!');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-brand-offWhite dark:bg-gray-900 transition-colors">
        <div className="w-full max-w-md p-8 bg-white dark:bg-brand-plumDark rounded-3xl shadow-2xl m-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-brand-plum mb-2 tracking-tight">RELIVO</h1>
            <p className="text-gray-500 dark:text-gray-300">Relief, right when you need it.</p>
          </div>
          
          {authError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
              <AlertCircle size={16} />
              {authError}
            </div>
          )}
          
          <form onSubmit={handleAuth} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Email</label>
              <input 
                type="email" 
                required
                value={loginForm.email}
                onChange={e => setLoginForm({...loginForm, email: e.target.value})}
                placeholder="you@example.com"
                className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-brand-plum outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Password</label>
              <input 
                type="password" 
                required
                value={loginForm.password}
                onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                placeholder="••••••••"
                className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-brand-plum outline-none transition"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-brand-plum hover:bg-brand-plumDark text-white font-bold py-3 px-4 rounded-xl shadow-lg mt-2 transition transform active:scale-95"
            >
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
            
            <div className="text-center mt-4 text-sm">
              <button 
                type="button" 
                onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setAuthError(''); }}
                className="text-brand-plum font-semibold hover:underline"
              >
                {authMode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Log in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col md:flex-row overflow-hidden bg-brand-offWhite dark:bg-gray-900 transition-colors">
      
      {/* Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 h-1/2 md:h-full flex flex-col shadow-xl z-20 bg-white dark:bg-brand-plumDark">
        <div className="p-6 bg-brand-plum text-white flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">RELIVO</h1>
            <p className="text-sm opacity-90 mt-1">Relief, right when you need it.</p>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button onClick={() => setShowAdmin(true)} className="text-xs bg-brand-coral font-bold px-3 py-1.5 rounded transition hover:bg-red-500 shadow">
                Admin Panel
              </button>
            )}
            <button onClick={handleLogout} className="text-xs font-semibold hover:bg-white/20 px-3 py-1.5 rounded transition border border-white/20">
              Log Out
            </button>
          </div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {!emergencyMode ? (
            <button 
              onClick={handleEmergency}
              className="w-full bg-brand-coral hover:bg-red-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform transition active:scale-95 flex items-center justify-center gap-3 text-lg mb-6"
            >
              <AlertTriangle size={24} />
              FIND A TOILET NOW
            </button>
          ) : (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-brand-coral p-4 rounded-r-xl">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-red-800 dark:text-red-200 flex items-center gap-2">
                  <AlertTriangle size={18} /> EMERGENCY MODE
                </h3>
                <button onClick={() => setEmergencyMode(false)} className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-white px-2 py-1 bg-white dark:bg-gray-800 rounded shadow">Cancel</button>
              </div>
              <p className="text-xs text-red-600 dark:text-red-300 mb-4">We found the best options for you based on distance and reliability score.</p>
              
              {recommendations && (
                <div className="flex flex-col gap-3">
                  <div 
                    onClick={() => setSelectedRestroom(recommendations.nearest)}
                    className={`p-3 rounded-lg cursor-pointer border ${selectedRestroom?.id === recommendations.nearest.id ? 'border-brand-coral bg-white dark:bg-gray-800' : 'border-transparent bg-white/50 dark:bg-gray-800/50'}`}
                  >
                    <div className="text-[10px] font-bold text-brand-coral uppercase tracking-wider mb-1">Nearest (Closest to you)</div>
                    <div className="font-semibold text-sm dark:text-white">{recommendations.nearest.name}</div>
                    <div className="text-xs text-gray-500">{recommendations.nearest.distance} away</div>
                  </div>
                  
                  <div 
                    onClick={() => setSelectedRestroom(recommendations.best)}
                    className={`p-3 rounded-lg cursor-pointer border ${selectedRestroom?.id === recommendations.best.id ? 'border-brand-plum bg-white dark:bg-gray-800' : 'border-transparent bg-white/50 dark:bg-gray-800/50'}`}
                  >
                    <div className="text-[10px] font-bold text-brand-plum dark:text-brand-coral uppercase tracking-wider mb-1 flex justify-between">
                      <span>Highest Rated (Best Quality)</span>
                      <span>Score: {recommendations.best.scoreInt}</span>
                    </div>
                    <div className="font-semibold text-sm dark:text-white">{recommendations.best.name}</div>
                    <div className="text-xs text-gray-500">{recommendations.best.distance} away</div>
                  </div>

                  {recommendations.alternative && (
                    <div 
                      onClick={() => setSelectedRestroom(recommendations.alternative)}
                      className={`p-3 rounded-lg cursor-pointer border ${selectedRestroom?.id === recommendations.alternative.id ? 'border-gray-400 bg-white dark:bg-gray-800' : 'border-transparent bg-white/50 dark:bg-gray-800/50'}`}
                    >
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Alternative Option</div>
                      <div className="font-semibold text-sm dark:text-white">{recommendations.alternative.name}</div>
                      <div className="text-xs text-gray-500">{recommendations.alternative.distance} away</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

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
                          <CheckCircle size={10} /> Likely Open
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
            attribution='&copy; Google Maps'
            url="https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&gl=IN"
            subdomains={['0','1','2','3']}
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
        <div className="absolute bottom-4 left-1/3 ml-4 right-4 md:right-auto md:w-[28rem] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-30 p-6 border border-gray-100 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
          <button 
            onClick={() => setSelectedRestroom(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 p-1 rounded-full"
          >
            <X size={16} />
          </button>
          <h2 className="text-2xl font-bold mb-1 dark:text-white pr-8">{selectedRestroom.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">{selectedRestroom.distance} • {selectedRestroom.walkingTime} walk</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-center flex flex-col justify-center">
              <div className="text-3xl font-black text-brand-plum dark:text-brand-coral">
                {calculateScore(selectedRestroom.factors).score}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Reliability Score</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-center flex flex-col justify-center items-center">
              <span className="text-sm font-semibold dark:text-gray-300">
                {selectedRestroom.reports.length > 0 ? (
                   <div className="flex flex-col gap-1 items-center">
                     <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded-full">
                       {getFreshnessLabel(selectedRestroom.reports[0].timestamp)}
                     </span>
                     <span className="text-[10px]">{selectedRestroom.reports.length} Reports</span>
                   </div>
                ) : 'No Reports Yet'}
              </span>
              <span className="text-[10px] text-gray-400 mt-1">Community sourced</span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Facilities</h4>
            <div className="flex flex-wrap gap-2">
              {selectedRestroom.facilities.map(f => (
                <span key={f} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
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
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Community Reports</h4>
            
            {selectedRestroom.reports.filter(r => r.type !== 'rating').length > 0 ? (
              <div className="mb-4 space-y-2 max-h-24 overflow-y-auto pr-2">
                {selectedRestroom.reports.filter(r => r.type !== 'rating').map((rep, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-2 bg-gray-50 dark:bg-gray-900 rounded">
                    <span className="font-semibold capitalize dark:text-gray-200">User reported: {rep.type}</span>
                    <span className="text-gray-400">{getFreshnessLabel(rep.timestamp)}</span>
                  </div>
                ))}
              </div>
            ) : null}

            <p className="text-xs text-gray-500 mb-2">Add a new report:</p>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button onClick={() => handleReport('clean')} className="py-2 px-1 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded hover:bg-green-100 transition text-sm font-semibold">✨ Clean</button>
              <button onClick={() => handleReport('dirty')} className="py-2 px-1 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded hover:bg-red-100 transition text-sm font-semibold">🗑️ Dirty</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleReport('closed')} className="py-2 px-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 transition text-sm font-semibold">🔒 Closed</button>
              <button onClick={() => handleReport('accessible')} className="py-2 px-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded hover:bg-blue-100 transition text-sm font-semibold">♿ Accessible</button>
            </div>
          </div>

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
            className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-3 px-4 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-800 transition shadow-lg"
          >
            <Navigation size={18} />
            Navigate Here
          </a>
        </div>
      )}

      {/* Floating Add Restroom Button for Users */}
      {!isAdmin && !showAddModal && (
        <button 
          onClick={() => setShowAddModal(true)}
          className="absolute bottom-6 left-6 z-40 bg-brand-plum text-white p-4 rounded-full shadow-2xl hover:bg-brand-plumDark hover:scale-105 transition transform"
          title="Suggest a new restroom"
        >
          <Plus size={28} />
        </button>
      )}

      {/* Add Restroom Request Modal */}
      {showAddModal && (
        <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-sm shadow-2xl relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4 dark:text-white">Suggest a Restroom</h2>
            <form onSubmit={handleRequestSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 dark:text-gray-200">Name / Landmark</label>
                <input 
                  type="text" 
                  required
                  value={newRestroomForm.name}
                  onChange={e => setNewRestroomForm({...newRestroomForm, name: e.target.value})}
                  className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-brand-plum"
                  placeholder="E.g. Central Park Toilet"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 dark:text-gray-200 text-sm">
                  <input type="checkbox" checked={newRestroomForm.free} onChange={e => setNewRestroomForm({...newRestroomForm, free: e.target.checked})} className="rounded text-brand-plum" />
                  Is it free to use?
                </label>
                <label className="flex items-center gap-2 dark:text-gray-200 text-sm">
                  <input type="checkbox" checked={newRestroomForm.accessible} onChange={e => setNewRestroomForm({...newRestroomForm, accessible: e.target.checked})} className="rounded text-brand-plum" />
                  Is it wheelchair accessible?
                </label>
              </div>
              <button type="submit" className="w-full mt-2 bg-brand-plum text-white font-bold py-3 rounded-xl hover:bg-brand-plumDark transition shadow-lg">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Full Screen Admin Dashboard */}
      {showAdmin && isAdmin && (
        <AdminDashboard 
          restrooms={restrooms}
          setRestrooms={setRestrooms}
          requests={requests}
          setRequests={setRequests}
          customRestrooms={customRestrooms}
          setCustomRestrooms={setCustomRestrooms}
          deletedIds={deletedIds}
          setDeletedIds={setDeletedIds}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </div>
  );
}
