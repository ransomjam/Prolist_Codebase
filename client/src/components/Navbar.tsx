import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md flex justify-between items-center p-4">
      <img src="/assets/logo.svg" alt="ProList Logo" className="h-8"/>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary text-white px-4 py-2 rounded-lg shadow-neonBlue"
        >
          Menu ▼
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">My Listings</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Logout</a>
          </div>
        )}
      </div>
    </nav>
  );
}
