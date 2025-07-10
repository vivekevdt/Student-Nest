import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import { FaSearch } from 'react-icons/fa';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    studyTable: false,
    bathroom: false,
    balcony: false,
    electricityBill: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const studyTableFromUrl = urlParams.get('studyTable');
    const bathroomFromUrl = urlParams.get('bathroom');
    const balconyFromUrl = urlParams.get('balcony');
    const electricityBillFromUrl = urlParams.get('electricityBill');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      studyTableFromUrl ||
      bathroomFromUrl ||
      balconyFromUrl ||
      electricityBillFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        studyTable: studyTableFromUrl === 'true',
        bathroom: bathroomFromUrl === 'true',
        balcony: balconyFromUrl === 'true',
        electricityBill: electricityBillFromUrl === 'true',
        offer: offerFromUrl === 'true',
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`https://student-nest-vivek.onrender.com/api/listing/get?${searchQuery}`);
      const data = await res.json();
      console.log(data)

      if (data.length > 8) {
        setShowMore(true);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'single' ||
      e.target.id === 'sharing'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'studyTable' ||
      e.target.id === 'bathroom' ||
      e.target.id === 'balcony' ||
      e.target.id === 'electricityBill' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('studyTable', sidebardata.studyTable);
    urlParams.set('bathroom', sidebardata.bathroom);
    urlParams.set('balcony', sidebardata.balcony);
    urlParams.set('electricityBill', sidebardata.electricityBill);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`https://student-nest-api.onrender.com/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className='flex flex-col md:flex-row bg-white'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen bg-blue-50'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold text-blue-600'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search for rooms...'
              className='border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold text-blue-600'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'all'}
              />
              <span>Single & Sharing</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='single'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'single'}
              />
              <span>single</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sharing'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'sharing'}
              />
              <span>sharing</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold text-blue-600'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='studyTable'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.studyTable}
              />
              <span>Study Table</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='bathroom'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.bathroom}
              />
              <span>Attached Bathroom</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='balcony'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.balcony}
              />
              <span>Balcony</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='electricityBill'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.electricityBill}
              />
              <span>Electricity Bill</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold text-blue-600'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-blue-600 text-white p-3 rounded-lg uppercase hover:opacity-95 transition-all duration-200'>
            <FaSearch className='inline mr-2' /> Search
          </button>
        </form>
      </div>
      <div className='flex-1 p-5'>
        <h1 className='text-3xl font-semibold border-b p-3 text-blue-700 mt-5'>
          Listing Results:
        </h1>
        <div className='flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-blue-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-blue-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-blue-600 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
