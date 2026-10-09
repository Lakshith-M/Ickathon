import { useState } from 'react';
import { Trash2, Check, X, Plus, Edit } from 'lucide-react';

export default function AdminDashboard({ 
  restrooms, 
  setRestrooms, 
  requests, 
  setRequests, 
  customRestrooms, 
  setCustomRestrooms, 
  deletedIds, 
  setDeletedIds,
  onClose 
}) {
  
  const handleApprove = (req) => {
    const newRestroom = {
      id: 'custom-' + Date.now(),
      name: req.name,
      lat: req.lat,
      lon: req.lon,
      distance: 'Unknown',
      distM: 9999,
      walkingTime: 'Unknown',
      factors: {
        availability: 80,
        cleanliness: 50,
        accessibility: req.accessible ? 100 : 0,
        facilities: req.free ? 80 : 50,
        affordability: req.free ? 100 : 0
      },
      facilities: [],
      reports: []
    };
    if (req.free) newRestroom.facilities.push('Free');
    if (req.accessible) newRestroom.facilities.push('Wheelchair access');

    const updatedCustom = [...customRestrooms, newRestroom];
    setCustomRestrooms(updatedCustom);
    localStorage.setItem('relivo_custom_restrooms', JSON.stringify(updatedCustom));
    
    const updatedRestrooms = [...restrooms, newRestroom];
    setRestrooms(updatedRestrooms);

    handleReject(req.id);
  };

  const handleReject = (id) => {
    const updatedReqs = requests.filter(r => r.id !== id);
    setRequests(updatedReqs);
    localStorage.setItem('relivo_requests', JSON.stringify(updatedReqs));
  };

  const handleDeleteRestroom = (id) => {
    const updatedDeleted = [...deletedIds, id];
    setDeletedIds(updatedDeleted);
    localStorage.setItem('relivo_deleted_ids', JSON.stringify(updatedDeleted));
    
    setRestrooms(restrooms.filter(r => r.id !== id));
  };

  return (
    <div className="absolute inset-0 z-50 bg-gray-50 dark:bg-gray-900 overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-brand-plum dark:text-brand-coral">Admin Dashboard</h1>
            <p className="text-gray-500">Manage restrooms and user requests</p>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-gray-800 text-white rounded-lg font-bold">
            Exit Admin
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Requests Panel */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 dark:text-white border-b pb-2">Pending Requests ({requests.length})</h2>
            {requests.length === 0 ? (
              <p className="text-gray-500 text-sm">No pending requests.</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {requests.map(req => (
                  <div key={req.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="font-bold text-lg dark:text-white">{req.name}</div>
                    <div className="text-sm text-gray-500 mb-2">Lat: {req.lat.toFixed(4)}, Lon: {req.lon.toFixed(4)}</div>
                    <div className="flex gap-2 mb-4">
                      {req.free && <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Free</span>}
                      {req.accessible && <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Accessible</span>}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(req)} className="flex-1 bg-brand-plum text-white py-2 rounded font-bold hover:bg-brand-plumDark flex justify-center items-center gap-1">
                        <Check size={16} /> Approve
                      </button>
                      <button onClick={() => handleReject(req.id)} className="flex-1 bg-red-100 text-red-700 py-2 rounded font-bold hover:bg-red-200 flex justify-center items-center gap-1">
                        <X size={16} /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Restrooms Panel */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border dark:border-gray-700">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-bold dark:text-white">Active Restrooms ({restrooms.length})</h2>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {restrooms.map(r => (
                <div key={r.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
                  <div>
                    <div className="font-bold text-sm dark:text-white">{r.name}</div>
                    <div className="text-xs text-gray-500">{r.distance} away</div>
                  </div>
                  <button 
                    onClick={() => handleDeleteRestroom(r.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                    title="Delete Restroom"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
