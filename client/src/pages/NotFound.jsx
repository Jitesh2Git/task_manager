import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="text-center">
        <p className="text-lg font-semibold text-custom-primary">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="bg-white mt-6 flex items-center justify-center">
          <Link
            to="/"
            className="px-6 py-2 font-medium bg-custom-primary text-custom-primary-content w-fit transition-all shadow-[3px_3px_0px_black] 
            hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
