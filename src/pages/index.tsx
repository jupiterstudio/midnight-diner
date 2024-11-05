/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from '@/components/Navbar';

const HomePage = () => {
 
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-teal-50 to-white text-gray-800">
      {/* Navigation Bar */}
      <Navbar />


      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center h-[80vh] text-center p-8">
        <h2 className="text-5xl font-semibold mb-4 text-gray-800">Find Peace at Midnight Diner</h2>
        <p className="text-lg max-w-2xl mb-6 text-gray-600">
          Welcome to a place of comfort and emotional healing. Midnight Diner is your trusted AI-powered therapist,
          here to guide you through tough times and help you heal. Come in, reflect, and find your inner peace.
        </p>

        <div className="w-full max-w-md">
          <img
            src="https://res.cloudinary.com/dkkwc6wnw/image/upload/v1729318491/midnight-diner/chef_li2aht.png"
            alt="Midnight Diner"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
