import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

import { FaMapMarkerAlt, FaShare } from 'react-icons/fa';
import ArticleIcon from '@mui/icons-material/Article';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import ShowerIcon from '@mui/icons-material/Shower';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import BalconyIcon from '@mui/icons-material/Balcony';

import Contact from '../components/Contact';

SwiperCore.use([Navigation]);

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://student-nest-vivek.onrender.com/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) throw new Error();
        setListing(data);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}

      {listing && !loading && !error && (
        <div>
          {/* Image Slider */}
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[500px] sm:h-[550px] bg-center bg-no-repeat bg-cover'
                  style={{ backgroundImage: `url(${url})` }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Share Button */}
          <div className='fixed top-[13%] right-[3%] z-10 border shadow-md rounded-full w-12 h-12 flex justify-center items-center bg-white cursor-pointer'>
            <FaShare
              className='text-slate-600'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            />
          </div>

          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 bg-white border shadow-md px-4 py-2 rounded-md'>
              Link copied!
            </p>
          )}

          {/* Listing Content */}
          <div className='flex flex-col max-w-5xl mx-auto p-4 sm:p-6 my-10 gap-5'>

            {/* Title and Price */}
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold text-slate-800'>
                {listing.name} - ₹
                {listing.offer
                  ? listing.discountPrice.toLocaleString('en-IN')
                  : listing.regularPrice.toLocaleString('en-IN')}
                {listing.type === 'single' && ' / month'}
              </h1>
              <p className='flex items-center gap-2 text-slate-600 text-sm'>
                <FaMapMarkerAlt className='text-green-700' />
                {listing.address}
              </p>
            </div>

            {/* Tags */}
            <div className='flex gap-4 flex-wrap'>
              <span className='bg-blue-600 text-white px-3 py-1 rounded-md text-sm'>
                {listing.type === 'single' ? 'Single Room' : 'Sharing Room'}
              </span>
              {listing.offer && (
                <span className='bg-green-600 text-white px-3 py-1 rounded-md text-sm'>
                  ₹{(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-IN')} OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className='text-slate-700 leading-relaxed'>
              <span className='font-semibold text-slate-900'>Description:</span> {listing.description}
            </p>

            {/* Features */}
            <ul className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-slate-800 font-medium text-sm'>
              <li className='flex items-center gap-2'><HouseSidingIcon /> {listing.floor}th floor</li>
              <li className='flex items-center gap-2'><TableRestaurantIcon /> {listing.studyTable ? 'Study Table' : 'No Study Table'}</li>
              <li className='flex items-center gap-2'><ShowerIcon /> {listing.bathroom ? 'Attached Bathroom' : 'Common Bathroom'}</li>
              <li className='flex items-center gap-2'><BalconyIcon /> {listing.balcony ? 'Balcony' : 'No Balcony'}</li>
              <li className='flex items-center gap-2'><ArticleIcon /> {listing.electricityBill ? 'Electricity Bill excluded' : 'Electricity Bill included'}</li>
            </ul>

            {/* Contact Button */}
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-800 text-white mt-6 py-3 px-5 rounded-lg hover:bg-slate-700 transition duration-200 uppercase text-sm tracking-wide w-full sm:w-fit'
              >
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}

            {/* Google Maps Location */}
            {true ? (
              <div className='mt-10 w-full h-[300px] rounded-lg overflow-hidden'>
                <iframe
                  src={`https://www.google.com/maps?q=${21.255398},${81.599250}&z=15&output=embed`}
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  allowFullScreen=''
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  title='Location Map'
                ></iframe>
              </div>
            ) : (
              <p className='mt-6 text-slate-500 text-sm italic'>Location coordinates not available.</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
