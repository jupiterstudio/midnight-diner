import Link from "next/link";

const Navbar = () => {


  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-700">Midnight Diner</h1>
        <div className="space-x-4 flex">
          <Link href="/login">
            <div className="text-gray-700 hover:text-blue-600 transition-colors">Log In</div>
          </Link>
          <Link href="/signup">
            <div className="text-gray-700 hover:text-blue-600 transition-colors">Sign Up</div>
          </Link>
        </div>
      </nav>
  );
};

export default Navbar;
