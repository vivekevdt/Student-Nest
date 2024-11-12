import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: `url('data:image/jpeg;base64,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')`,
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
