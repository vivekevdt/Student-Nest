import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1460317442991-0ec209397118?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHN0dWRlbnQlMjByb29tfGVufDB8fDB8fHww')`,
      }}
    >
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-blue-500 bg-opacity-70 text-white transition-all duration-300 ease-in-out">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 transition-transform transform hover:scale-105">
          Find Your Perfect Student Home
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Safe, Affordable, and Convenient Rooms Just for Students
        </p>

      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white bg-opacity-80 transition-all duration-300 ease-in-out">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <img
              src="https://plus.unsplash.com/premium_photo-1725667824810-cbf1ad00a7e1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHN0dWRlbnQlMjByb29tfGVufDB8fDB8fHww"
              alt="Spacious Rooms"
              className="w-full h-48 object-cover mb-4 rounded-lg" // Increased height
            />
            <h2 className="text-2xl font-bold text-blue-500 mb-4">Spacious Rooms</h2>
            <p>Enjoy ample space for studying and relaxing, designed for student comfort.</p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1645725677294-ed0843b97d5c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="High-Speed Internet"
              className="w-full h-48 object-cover mb-4 rounded-lg" // Increased height
            />
            <h2 className="text-2xl font-bold text-blue-500 mb-4">High-Speed Internet</h2>
            <p>Stay connected with fast internet, perfect for studying and streaming.</p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1463620910506-d0458143143e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Modern Amenities"
              className="w-full h-48 object-cover mb-4 rounded-lg" // Increased height
            />
            <h2 className="text-2xl font-bold text-blue-500 mb-4">Modern Amenities</h2>
            <p>Rooms equipped with essential amenities for a comfortable student lifestyle.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-500 bg-opacity-70 text-white py-20 px-4 text-center transition-all duration-300 ease-in-out">
        <h2 className="text-3xl font-bold mb-4 transition-transform transform hover:scale-105">
          Ready to Find Your New Home?
        </h2>
        <p className="text-lg mb-8">
          Start browsing our listings and find the perfect place to live during your studies.
        </p>
        <Link
          to="/search"
          className="bg-white text-blue-500 py-3 px-6 rounded-full font-bold shadow-md hover:bg-gray-100 transition ease-in-out duration-300"
        >
          Browse Listings
        </Link>
      </section>
    </div>
  );
};

export default Home;
