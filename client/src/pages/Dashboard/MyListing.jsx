import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const { currentUser } = useSelector(state => state.user);

  // Change this to `true` to use static sample listings
  const useMockData = false;

  const mockListings = [
    {
      _id: '1',
      name: 'Sunny Single Room - 2nd Floor',
      regularPrice: 7500,
    },
    {
      _id: '2',
      name: 'Spacious Sharing Room with Balcony',
      regularPrice: 5500,
    },
    {
      _id: '3',
      name: 'Modern Studio Apartment',
      regularPrice: 12000,
    }
  ];

  useEffect(() => {
    const fetchListings = async () => {
      if (useMockData) {
        setListings(mockListings);
        return;
      }

      try {
        const res = await fetch(`/api/listing/user/${currentUser._id}`);
        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };

    fetchListings();
  }, [currentUser._id]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    if (!useMockData) {
      try {
        await fetch(`/api/listing/delete/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }

    setListings(prev => prev.filter(listing => listing._id !== id));
  };

  return (
    <div className='max-w-5xl mx-auto p-6'>
        
      <h2 className='text-2xl font-bold mb-6 text-slate-800'>My Listings</h2>

      {listings.length === 0 ? (
        <p className='text-slate-600'>No listings found.</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full border border-slate-300 rounded-md overflow-hidden'>
            <thead className='bg-slate-100'>
              <tr>
                <th className='p-3 text-left text-sm font-semibold text-slate-700'>Name</th>
                <th className='p-3 text-left text-sm font-semibold text-slate-700'>Price</th>
                <th className='p-3 text-left text-sm font-semibold text-slate-700'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map(listing => (
                <tr key={listing._id} className='border-t hover:bg-slate-50'>
                  <td className='p-3 text-slate-800'>{listing.name}</td>
                  <td className='p-3 text-green-700 font-medium'>₹{listing.regularPrice.toLocaleString('en-IN')}</td>
                  <td className='p-3 space-x-4'>
                    <Link
                      to={`/dashboard/edit/${listing._id}`}
                      className='text-blue-600 hover:underline text-sm'
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(listing._id)}
                      className='text-red-600 hover:underline text-sm'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
