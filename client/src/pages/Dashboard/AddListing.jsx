import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function AddListing() {
  const { currentUser } = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    regularPrice: '',
    description: '',
    imageUrls: [],
    userRef: currentUser._id
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        alert('Failed to create listing');
        return;
      }
      alert('Listing created');
    } catch (err) {
      alert('Something went wrong');
    }
  };

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h2 className='text-xl font-bold mb-4'>Add New Listing</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input name='name' placeholder='Name' onChange={handleChange} required className='w-full border px-4 py-2' />
        <input name='address' placeholder='Address' onChange={handleChange} required className='w-full border px-4 py-2' />
        <input name='latitude' type='number' placeholder='Latitude' onChange={handleChange} className='w-full border px-4 py-2' />
        <input name='longitude' type='number' placeholder='Longitude' onChange={handleChange} className='w-full border px-4 py-2' />
        <input name='regularPrice' type='number' placeholder='Price (INR)' onChange={handleChange} className='w-full border px-4 py-2' />
        <textarea name='description' placeholder='Description' onChange={handleChange} className='w-full border px-4 py-2' />
        <input name='imageUrls' type='text' placeholder='Image URL (comma separated)' onChange={(e) => {
          setFormData(prev => ({
            ...prev,
            imageUrls: e.target.value.split(',').map(url => url.trim())
          }));
        }} className='w-full border px-4 py-2' />
        <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded'>Submit</button>
      </form>
    </div>
  );
}
