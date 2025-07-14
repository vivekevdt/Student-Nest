import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function EditListing() {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(`/api/listing/get/${id}`);
      const data = await res.json();
      setFormData(data);
    };
    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/listing/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    alert('Listing updated');
  };

  if (!formData) return <p className='p-6'>Loading...</p>;

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h2 className='text-xl font-bold mb-4'>Edit Listing</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input name='name' value={formData.name} onChange={handleChange} className='w-full border px-4 py-2' />
        <input name='address' value={formData.address} onChange={handleChange} className='w-full border px-4 py-2' />
        <input name='latitude' type='number' value={formData.latitude} onChange={handleChange} className='w-full border px-4 py-2' />
        <input name='longitude' type='number' value={formData.longitude} onChange={handleChange} className='w-full border px-4 py-2' />
        <input name='regularPrice' type='number' value={formData.regularPrice} onChange={handleChange} className='w-full border px-4 py-2' />
        <textarea name='description' value={formData.description} onChange={handleChange} className='w-full border px-4 py-2' />
        <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded'>Save Changes</button>
      </form>
    </div>
  );
}
