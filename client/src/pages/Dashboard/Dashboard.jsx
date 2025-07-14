import { Link } from 'react-router-dom';

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start py-10 px-4">
      {/* Hero Section */}
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side: Text */}
          <div className="p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Welcome, Property Owner!
            </h1>
            <p className="text-slate-600 text-lg italic mb-4">
              "Real estate cannot be lost or stolen, nor can it be carried away. 
              Purchased with common sense, paid for in full, and managed with reasonable care, 
              it is about the safest investment in the world."
            </p>
            <p className="text-sm text-slate-500 mb-6">– Franklin D. Roosevelt</p>

            {/* Quick Links */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard/add"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-3 rounded-md shadow transition"
              >
                + Add New Listing
              </Link>
              <Link
                to="/dashboard/listings"
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-6 py-3 rounded-md shadow transition"
              >
                📋 View My Listings
              </Link>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="h-64 md:h-auto w-full">
            <img
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1050&q=80"
              alt="Apartment"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Footer Motivation */}
      <div className="mt-12 text-center max-w-xl">
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">
          Build your empire, one listing at a time. 🏙️
        </h2>
        <p className="text-slate-600">
          Manage your properties, attract tenants, and grow your business effortlessly. 
          The future of property management is just a click away.
        </p>
      </div>
    </div>
  );
}
