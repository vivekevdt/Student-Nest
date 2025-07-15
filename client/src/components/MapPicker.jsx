import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ position, onSelect }) {
  useMapEvents({
    click: (e) => {
      onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    }
  });

  return position ? (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const newPos = e.target.getLatLng();
          onSelect({ lat: newPos.lat, lng: newPos.lng });
        }
      }}
    />
  ) : null;
}


function ChangeMapView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center]);
  return null;
}

export default function MapPicker({ onLocationSelect }) {
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // India
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        const coords = [latitude, longitude];
        setMapCenter(coords);
        updateLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim().length < 3) {
        setSuggestions([]);
        return;
      }

      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&addressdetails=1&limit=5`,
        {
          headers: {
            'User-Agent': 'LeafletApp/1.0',
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => {
          console.error('Suggestion fetch failed:', err);
          setSuggestions([]);
        });
    }, 400); // debounce

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const updateLocation = async (coords) => {
    setSelectedPosition(coords);
    setMapCenter([coords.lat, coords.lng]);
    onLocationSelect(coords);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`,
        {
          headers: {
            'User-Agent': 'LeafletApp/1.0',
          },
        }
      );
      const data = await res.json();
      setAddress(data.display_name || 'Unknown location');
    } catch (err) {
      console.error('Reverse geocoding failed:', err);
      setAddress('Unable to fetch address');
    }
  };

  const handleSelectSuggestion = (item) => {
    const coords = {
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    };
    setSearchQuery(item.display_name);
    setSuggestions([]);
    updateLocation(coords);
  };
  console.log(suggestions)
  return (
    <div className='space-y-4 w-full mt-4'>
      {/* Search bar and suggestions */}
      <div className='relative z-50'>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search location (city, address, etc)'
          className='w-full p-2 border border-gray-300 rounded'
        />
  
        {suggestions.length > 0 && (
          <ul className='absolute z-50 bg-white border border-gray-300 w-full mt-1 rounded shadow max-h-60 overflow-y-auto text-sm'>
            {suggestions.map((item) => (
              <li
                key={item.place_id}
                className='px-3 py-2 hover:bg-gray-100 cursor-pointer'
                onClick={() => handleSelectSuggestion(item)}
              >
                {item.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
  
      {/* Map and current location button */}
      <div className='relative w-full h-[400px] sm:h-[450px] rounded overflow-hidden'>
      <button
  onClick={() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          updateLocation(coords);
        },
        () => {
          alert('Unable to fetch your location.');
        }
      );
    } else {
      alert('Geolocation not supported.');
    }
  }}
  className='absolute top-2 right-2 sm:top-4 sm:right-4 z-[1000] bg-blue-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded shadow hover:bg-blue-700'
>
  📍 Use My Location
</button>

  
        <MapContainer
          center={mapCenter}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
          className="z-[1]"  // 👈 Add this

        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; OpenStreetMap contributors'
          />
          <ChangeMapView center={mapCenter} />
          <LocationMarker
            position={selectedPosition}
            onSelect={(coords) => updateLocation(coords)}
          />
        </MapContainer>
      </div>
  
      {/* Location Info */}
      {/* {selectedPosition && (
        <div className='grid sm:grid-cols-2 gap-4 text-sm text-gray-700'>
          <div>
            <label className='font-medium'>Latitude</label>
            <input
              type='text'
              readOnly
              className='mt-1 w-full p-2 border rounded bg-gray-50'
              value={selectedPosition.lat.toFixed(6)}
            />
          </div>
          <div>
            <label className='font-medium'>Longitude</label>
            <input
              type='text'
              readOnly
              className='mt-1 w-full p-2 border rounded bg-gray-50'
              value={selectedPosition.lng.toFixed(6)}
            />
          </div>
          <div className='sm:col-span-2'>
            <label className='font-medium'>Address</label>
            <p className='mt-1 bg-gray-50 p-2 border rounded'>{address}</p>
          </div>
        </div>
      )} */}
    </div>
  );
  
}
