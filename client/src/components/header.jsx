import { FaSearch, FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false); 
  const [show,setShow] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Handle search
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // Keep search term synced with URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = (e) => {
    e.preventDefault(); // prevent navigation from <Link>
    setOpen((prev) => !prev); // toggle dropdown
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-md relative">
      <div className="flex flex-wrap justify-between items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo and Home Link */}
        <Link to="/" className="flex items-center mb-2 sm:mb-0">
          <FaHome className="text-white text-3xl mr-2" />
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white">
            <span>Rental</span>
            <span>Dost</span>
          </h1>
        </Link>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white p-2 rounded-lg shadow-md w-full sm:w-auto sm:mb-0"
        >
          <input
            type="text"
            placeholder="Search for student rooms..."
            className="bg-transparent focus:outline-none flex-grow text-sm sm:text-lg px-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="text-blue-600 text-xl" />
          </button>
        </form>

        {/* Navigation Links */}
        <ul className="flex gap-4 sm:gap-6 items-center mt-3 sm:mt-0 relative" ref={menuRef}>
          <Link to="/signup-host">
            <li className="text-white hover:underline text-sm sm:text-lg">Become a host</li>
          </Link>
          <Link to="/">
            <li className="text-white hover:underline text-sm sm:text-lg">Home</li>
          </Link>
          <Link to="/about">
            <li className="text-white hover:underline text-sm sm:text-lg">About</li>
          </Link>

          {/* Profile Avatar or Sign in */}
          {currentUser ? (
            <div className="relative">
              <button onClick={handleProfileClick} className="focus:outline-none">
                <img
                  className="rounded-full h-8 w-8 sm:h-9 sm:w-9 object-cover hover:ring-2 hover:ring-yellow-300 "
                  src={currentUser.avatar}
                  alt="profile"
                />
              </button>

              {/* Dropdown Menu */}
              {open && (
                <div className="absolute right-0 mt-4 w-44 sm:w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  
                  <ul className="py-2 text-gray-700 text-sm sm:text-base">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link to="/profile">My Profile</Link>
                    </li>
                   
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link to="/">Logout</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/sign-in">
              <li className="text-white hover:underline text-sm sm:text-lg">Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
