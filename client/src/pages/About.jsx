import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-blue-100 to-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQS8469CWcG0jmfblNS5dE29NNXplReMpVDw&s)',
        }}
      ></div>

      <div className="relative z-10">
        {/* About Section */}
        <section className="max-w-6xl mx-auto py-16 px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-6">
            About StudentNest
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
            At StudentNest, we understand the challenges students face when looking for a place to live. 
            That's why we’ve created a platform that simplifies the process of finding safe, affordable, 
            and convenient rooms just for students.
          </p>
          <img
            src="https://images.unsplash.com/photo-1484712401471-05c7215830eb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Student living"
            className="mx-auto rounded-lg shadow-md mb-6 w-full sm:w-3/4"
          />
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
            Our mission is to make student life easier by providing verified listings, transparent pricing, 
            and a user-friendly experience. Whether you’re moving to a new city or just looking for a better 
            place to stay, StudentNest is here to help you find your perfect student home.
          </p>
        </section>

        {/* Mission Section */}
        <section className="bg-blue-500 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-lg shadow-lg bg-blue-600">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p>To provide a reliable platform for students to find safe and affordable accommodation.</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-blue-600">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p>To become the go-to platform for student housing across the globe.</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-blue-600">
              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              <p>Transparency, safety, and affordability are at the core of everything we do.</p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-16 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            Join the StudentNest Community
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6">
            Ready to find your next student home? Start exploring our listings today!
          </p>
          <a
            href="/listings"
            className="bg-blue-500 text-white py-3 px-6 rounded-full font-bold shadow-md hover:bg-blue-600 transition"
          > Made by vivek
            Browse Listings
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;
