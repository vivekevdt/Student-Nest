import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axiosInstance from '../../utils/axiosInstance';


export default function MyListings() {
  const [listings, setListings] = useState([]);
  const { currentUser } = useSelector(state => state.user);

  const navigate = useNavigate();

  // Change this to `true` to use static sample listings
  const useMockData = false;

  const userListings = [
    {
      _id: '1',
      name: 'Cozy Single Room with Desk and Table',
      description: 'A comfortable and well-lit single room ideal for students or working professionals. The room includes a cozy bed, a spacious study desk, and a sturdy table — perfect for studying, working, or dining. With its simple yet welcoming setup, this room offers a peaceful environment for focus and relaxation.',
      regularPrice: 6500,
      DiscountedPrice: 6000,
      address: 'Kota, Raipur',
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

      try {
        const res = await axiosInstance.get(`/api/user/listings/${currentUser.userDetail._id}`)
        const data = res.data
        console.log(data)
        setListings(data?.listings);
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

  const handleBack = () =>{
    navigate('/dashboard');
  }
  console.log(listings)

  return (
    <div className='flex flex-col gap-4'>
    <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition mt-5 ml-3 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12" onClick={handleBack}><ArrowBackIosNewIcon fontSize="small"/></button>
    <h1 className='text-center mt-3 text-3xl font-semibold'>
      Your Listings
    </h1>
    <div className="flex flex-col items-center justify-center gap-6 p-4">
       {listings?.map((listing) => (
      <div
        key={listing._id}
        className='w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col sm:flex-row sm:items-start gap-4'
      >
        {/* IMAGE SECTION */}
        <Link to={`/listing/${listing._id}`} className="flex-shrink-0">
          <img
            src={listing.imageUrls[0]}
            alt='listing cover'
            className='w-full sm:w-64 h-56 object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-t-none shadow-md'
          />
        </Link>

        {/* CONTENT SECTION */}
        <div className='flex-1 flex flex-col justify-between p-4 text-center sm:text-left'>
          <Link
            to={`/listing/${listing._id}`}
            className='text-slate-800 font-semibold text-lg hover:underline block'
          >
            {listing.name}
          </Link>

          {/* Show description if exists */}
          {listing.description && (
            <p className='text-slate-600 text-sm mt-1 line-clamp-2'>
              {listing.description}
            </p>
          )}

          {/* Show address */}
          {listing.address && (
            <p className='text-slate-500 text-sm mt-1'>
              📍 {listing.address}
            </p>
          )}

          {/* Show price details */}
          <div className='flex items-center justify-center sm:justify-start gap-2 mt-2'>
            {listing.DiscountedPrice ? (
              <>
                <p className='text-green-700 font-semibold'>
                  ₹{listing.DiscountedPrice}
                </p>
                <p className='text-gray-500 line-through text-sm'>
                  ₹{listing.regularPrice}
                </p>
              </>
            ) : (
              <p className='text-green-700 font-semibold'>
                ₹{listing.regularPrice}
              </p>
            )}
          </div>
        </div>
        
        {/* BUTTON SECTION */}
        <div className='flex justify-center sm:justify-start gap-3 mt-4'>
          <button
            onClick={() => handleListingDelete(listing._id)}
            className='text-red-700 uppercase'
          >
            Delete
          </button>
          <Link to={`/update-listing/${listing._id}`}>
            <button className='text-green-700 uppercase mr-2'>Edit</button>
          </Link>
        </div>
      </div>
    ))}

    </div>
   
  </div>
  );
}
