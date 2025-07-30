import { useState, useRef, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapPicker from '../components/MapPicker';

const CHECKBOX_FIELDS = [
  { id: 'sharing', label: 'Sharing room' },
  { id: 'single', label: 'Single room' },
  { id: 'studyTable', label: 'Study Table' },
  { id: 'bathroom', label: 'Attached bathroom' },
  { id: 'balcony', label: 'Balcony' },
  { id: 'electricityBill', label: 'Electricity Included' },
  { id: 'offer', label: 'Offer' },
];

export default function CreateListing() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'single',
    floor: 0,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    studyTable: false,
    bathroom: false,
    balcony: false,
    electricityBill: false,
    latitude: '',
    longitude: '',
    location: null,
  });

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    mapInstance.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapInstance.current);

    mapInstance.current.on('click', (e) => {
      const { lat, lng } = e.latlng;
      setFormData((prev) => ({
        ...prev,
        latitude: lat.toFixed(6),
        longitude: lng.toFixed(6),
      }));

      if (markerRef.current) {
        markerRef.current.setLatLng(e.latlng);
      } else {
        markerRef.current = L.marker(e.latlng).addTo(mapInstance.current);
      }
    });
  }, []);

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        null,
        reject,
        () => getDownloadURL(uploadTask.snapshot.ref).then(resolve)
      );
    });
  };

  const handleImageSubmit = async () => {
    if (files.length + formData.imageUrls.length > 6) {
      return setImageUploadError('Max 6 images allowed');
    }

    setUploading(true);
    setImageUploadError('');

    try {
      const urls = await Promise.all([...files].map((file) => storeImage(file)));
      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...urls],
      }));
    } catch {
      setImageUploadError('Upload failed. Images must be under 2MB');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const isBooleanField = type === 'checkbox';

    setFormData((prev) => ({
      ...prev,
      [id]: isBooleanField ? checked : value,
      ...(id === 'sharing' || id === 'single' ? { type: id } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.imageUrls.length < 1) return setError('Upload at least 1 image');
    if (+formData.discountPrice > +formData.regularPrice)
      return setError('Discount must be lower than regular price');
    if (!formData.latitude || !formData.longitude)
      return setError('Select a location on the map');

    setLoading(true);
    try {
      console.log({ ...formData, userRef: currentUser._id });

      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');

      if (!formData.latitude )
        return setError('Please select a location on the map');

      setLoading(true);
      setError(false);

      console.log(formData)
      // const res = await fetch('https://student-nest-vivek.onrender.com/api/listing/create', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     userRef: currentUser._id,
      //   }),
      // });

      // const data = await res.json();
      // setLoading(false);
      // if (data.success === false) return setError(data.message);

      // navigate(`/listing/${data._id}`);
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input type='text' id='name' value={formData.name} placeholder='Name' required className='border p-3 rounded-lg' onChange={handleChange} />
          <textarea id='description' value={formData.description} placeholder='Description' required className='border p-3 rounded-lg' onChange={handleChange} />
          <input type='text' id='address' value={formData.address} placeholder='Address' required className='border p-3 rounded-lg' onChange={handleChange} />

          <div className='flex flex-wrap gap-6'>
            {CHECKBOX_FIELDS.map(({ id, label }) => (
              <label key={id} className='flex items-center gap-2'>
                <input type='checkbox' id={id} checked={formData[id] || formData.type === id} onChange={handleChange} className='w-5 h-5' />
                {label}
              </label>
            ))}
          </div>

          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input type='number' id='floor' value={formData.floor} onChange={handleChange} className='p-3 border rounded-lg' />
              <span>Floor</span>
            </div>
            <div className='flex items-center gap-2'>
              <input type='number' id='regularPrice' value={formData.regularPrice} onChange={handleChange} className='p-3 border rounded-lg' />
              <span>Regular Price (₹/month)</span>
            </div>
            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input type='number' id='discountPrice' value={formData.discountPrice} onChange={handleChange} className='p-3 border rounded-lg' />
                <span>Discount Price (₹/month)</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className='flex flex-col gap-4 flex-1'>
          <p className='font-semibold'>Images: <span className='text-gray-600'>First image is cover (max 6)</span></p>
          <div className='flex gap-4'>
            <input type='file' multiple accept='image/*' onChange={(e) => setFiles(e.target.files)} className='p-3 border rounded w-full' />
            <button type='button' onClick={handleImageSubmit} disabled={uploading} className='p-3 text-green-700 border rounded hover:shadow-lg'>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          {imageUploadError && <p className='text-red-700 text-sm'>{imageUploadError}</p>}

          {formData.imageUrls.map((url, index) => (
            <div key={url} className='flex justify-between items-center p-3 border'>
              <img src={url} alt='Listing' className='w-20 h-20 object-contain rounded' />
              <button onClick={() => handleRemoveImage(index)} className='text-red-700'>Delete</button>
            </div>
          ))}
                <MapPicker onLocationSelect={({ lat, lng }) => setFormData({ ...formData, latitude: lat, longitude: lng })} />


          <button disabled={loading || uploading} className='p-3 bg-slate-700 text-white rounded hover:opacity-95'>
            {loading ? 'Creating...' : 'Create Listing'}
          </button>

          {error && <p className='text-red-700'>{error}</p>}
        </div>
      </form>

      
    </main>
  );
}