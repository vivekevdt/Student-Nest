import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const { currentUser } = useSelector(state => state.user);

  // Change this to `true` to use static sample listings
  const useMockData = false;

  const userListings = [
    {
      _id: '1',
      name: 'Cozy Single Room with Desk',
      regularPrice: 6500,
      imageUrls: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c'],
    },
    {
      _id: '2',
      name: 'Modern Shared PG near Campus',
      regularPrice: 4800,
      imageUrls: ['https://images.unsplash.com/photo-1560185127-6a8c0c1f1ed4'],
    },
    {
      _id: '3',
      name: 'Private Studio with Balcony View',
      regularPrice: 10500,
      imageUrls: ['https://images.unsplash.com/photo-1600585152930-378b5c6f4be3'],
    },
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
    <div className='flex flex-col gap-4'>
    <h1 className='text-center mt-7 text-2xl font-semibold'>
      Your Listings
    </h1>
    {userListings.map((listing) => (
      <div
        key={listing._id}
        className='border rounded-lg p-3 flex justify-between items-center gap-4'
      >
        <Link to={`/listing/${listing._id}`}>
          <img
            src={listing.imageUrls[0]}
            alt='listing cover'
            className='h-16 w-16 object-contain'
          />
        </Link>
        <Link
          className='text-slate-700 font-semibold  hover:underline truncate flex-1'
          to={`/listing/${listing._id}`}
        >
          <p>{listing.name}</p>
        </Link>

        <div className='flex flex-col item-center'>
          <button
            onClick={() => handleListingDelete(listing._id)}
            className='text-red-700 uppercase'
          >
            Delete
          </button>
          <Link to={`/update-listing/${listing._id}`}>
            <button className='text-green-700 uppercase'>Edit</button>
          </Link>
        </div>
      </div>
    ))}
  </div>
  );
}
