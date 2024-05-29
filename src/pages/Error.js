import React from "react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-400 to-purple-500">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-4">Oops! Page not found.</p>
        <p className="text-lg mb-8">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <a
          href="/"
          className="text-lg bg-white text-blue-500 hover:text-blue-700 py-2 px-4 rounded-full shadow"
        >
          Go back to homepage
        </a>
      </div>
    </div>
  );
}

export default NotFound;
