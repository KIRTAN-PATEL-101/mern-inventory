import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <section className="py-10 bg-gray-100 sm:py-16 lg:py-24 h-screen">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Please login to have the full experience</h2>
            <p className="mt-4 text-2xl font-medium">Your inventories are waiting to be managed</p>

            <div className="flex flex-col items-center justify-center px-16 mt-8 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row lg:mt-12 sm:px-0">
                <Link to="/login" title="" className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md sm:w-auto hover:bg-blue-700 focus:bg-blue-700" role="button"> Login </Link>

            </div>

            <p className="mt-6 text-base text-black">Don't have an account? <Link to="/register" title="" className="text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">Register</Link></p>
        </div>
    </div>
</section>

    </div>
  )
}

export default Landing
