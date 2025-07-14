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
      if (data.length > 8) {
        setShowMore(true);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;

    if (['all', 'single', 'sharing'].includes(id)) {
      setSidebardata({ ...sidebardata, type: id });
    } else if (id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: value });
    } else if (['studyTable', 'bathroom', 'balcony', 'electricityBill', 'offer'].includes(id)) {
      setSidebardata({ ...sidebardata, [id]: checked });
    } else if (id === 'sort_order') {
      const [sort, order] = value.split('_');
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
    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreClick = async () => {
    const startIndex = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const res = await fetch(`https://student-nest-vivek.onrender.com/api/listing/get?${urlParams}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className='p-4 bg-zinc-100'>
      {/* Top Search Bar */}
      <form
        onSubmit={handleSubmit}
        className='bg-blue-50 p-4 rounded-lg shadow-md flex flex-wrap gap-4 items-center justify-between'
      >
        <input
          type='text'
          id='searchTerm'
          placeholder='Search rooms...'
          className='border p-2 rounded-lg flex-1 min-w-[180px]'
          value={sidebardata.searchTerm}
          onChange={handleChange}
        />

        <select
          id='sort_order'
          onChange={handleChange}
          defaultValue='created_at_desc'
          className='border p-2 rounded-lg'
        >
          <option value='regularPrice_desc'>Price high to low</option>
          <option value='regularPrice_asc'>Price low to high</option>
          <option value='createdAt_desc'>Latest</option>
          <option value='createdAt_asc'>Oldest</option>
        </select>

        <div className='flex gap-2 items-center flex-wrap text-sm'>
          <label>Type:</label>
          {['all', 'single', 'sharing'].map((t) => (
            <label key={t} className='flex items-center gap-1'>
              <input
                type='radio'
                id={t}
                name='type'
                onChange={handleChange}
                checked={sidebardata.type === t}
              />
              {t}
            </label>
          ))}
        </div>

        <div className='flex gap-2 items-center flex-wrap text-sm'>
          <label>Amenities:</label>
          {['studyTable', 'bathroom', 'balcony', 'electricityBill', 'offer'].map((a) => (
            <label key={a} className='flex items-center gap-1 capitalize'>
              <input
                type='checkbox'
                id={a}
                onChange={handleChange}
                checked={sidebardata[a]}
              />
              {a.replace(/([A-Z])/g, ' $1')}
            </label>
          ))}
        </div>

        <button className='bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 flex items-center gap-2'>
          <FaSearch /> Search
        </button>
      </form>

      {/* Listings */}
      <div className='mt-6'>
        <h2 className='text-2xl font-bold text-blue-700 mb-4'>Listing Results:</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
          {!loading && listings.length === 0 && (
            <p className='text-blue-600 col-span-full'>No listing found.</p>
          )}
          {loading && (
            <p className='text-blue-600 col-span-full text-center'>Loading...</p>
          )}
          {!loading &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>

        {showMore && (
          <button
            onClick={onShowMoreClick}
            className='text-blue-600 hover:underline p-6 text-center w-full block'
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}
