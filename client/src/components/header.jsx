import { FaSearch, FaHome } from 'react-icons/fa'; // Importing FaHome icon
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-gradient-to-r from-blue-600 to-blue-400 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-5'>
        <Link to='/' className='flex items-center'>
          {/* Home Icon as Logo */}
          <FaHome className='text-white text-3xl mr-2' /> {/* Home icon */}
          <h1 className='font-bold text-xl sm:text-2xl flex flex-wrap bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white'>
            <span className=''>Student</span>
            <span className=''>Nest</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-white p-3 rounded-lg flex items-center shadow-md'
        >
          <input
            type='text'
            placeholder='Search for student rooms...'
            className='bg-transparent focus:outline-none w-24 sm:w-64 text-lg'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch className='text-blue-600' />
          </button>
        </form>
        <ul className='flex gap-6'>
          <Link to='/'>
            <li className='text-white hover:underline text-lg'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='text-white hover:underline text-lg'>About</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-9 w-9 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className='text-white hover:underline text-lg'> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
