import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden rounded-2xl border border-gray-200">
      <Link to={`/listing/${listing._id}`}>
        <div className="relative">
          <img
            src={
              listing.imageUrls[0] ||
              'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
            }
            alt="listing cover"
            className="h-60 sm:h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-slate-800 truncate">{listing.name}</h3>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MdLocationOn className="text-green-600" />
            <span className="truncate">{listing.address}</span>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-lg font-bold text-blue-700">
              ₹
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && <span className="text-sm font-medium text-gray-500"> / month</span>}
            </p>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize font-medium">
              {listing.type} room
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
