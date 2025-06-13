import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "motion/react";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../store/slices/authSlice";
import { Skeleton } from "@/components/ui/Skeleton";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { checkingAuth, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <header
      className={twMerge(
        "sticky top-0 bg-custom-foreground flex items-center justify-between py-2 px-4 sm:px-10 min-h-[70px] z-50",
        !isOpen && "border"
      )}
    >
      <Link to="/">
        <img src="/logo.png" alt="Logo Image" className="w-auto h-8" />
      </Link>

      <div className="hidden sm:flex items-center space-x-6">
        {checkingAuth ? (
          <>
            <Skeleton className="h-[40px] w-[100px] bg-gray-200" />
            <Skeleton className="h-[40px] w-[100px] bg-gray-200" />
          </>
        ) : isLoggedIn ? (
          <Link
            to="/dashboard"
            className="px-6 py-2 font-medium bg-custom-primary text-white w-fit transition-all shadow-[3px_3px_0px_black] 
            hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/sign-in"
              className="px-6 py-2 font-medium whitespace-nowrap text-base"
            >
              Sign in
            </Link>
            <Link
              to="/sign-up"
              className="px-6 py-2 font-medium bg-custom-primary text-white w-fit transition-all shadow-[3px_3px_0px_black] 
              hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            >
              Sign up
            </Link>
          </>
        )}
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
        className="block sm:hidden cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <line
          x1="3"
          y1="6"
          x2="21"
          y2="6"
          className={twMerge(
            "origin-left transition",
            isOpen && "rotate-45 -translate-y-1"
          )}
        />
        <line
          x1="3"
          y1="12"
          x2="21"
          y2="12"
          className={twMerge("transition", isOpen && "opacity-0")}
        />
        <line
          x1="3"
          y1="18"
          x2="21"
          y2="18"
          className={twMerge(
            "origin-left transition",
            isOpen && "-rotate-45 translate-y-1"
          )}
        />
      </svg>

      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-full sm:hidden overflow-hidden z-40
          bg-gray-50 text-base font-medium shadow"
          >
            <div className="flex flex-col items-center py-4 space-y-4 text-center">
              {checkingAuth ? (
                <>
                  <Skeleton className="h-[40px] w-1/2 bg-gray-200" />
                  <Skeleton className="h-[40px] w-1/2 bg-gray-200" />
                </>
              ) : isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className={twMerge(
                    `px-6 py-2 font-medium bg-custom-primary text-white w-1/2 transition-all 
                    shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]`,
                    location.pathname == "/dashboard" && "bg-custom-secondary"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/sign-in"
                    className={twMerge(
                      `px-6 py-2 font-medium bg-custom-primary text-white w-1/2 transition-all 
                      shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]`,
                      location.pathname == "/sign-in" && "bg-custom-secondary"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/sign-up"
                    className={twMerge(
                      `px-6 py-2 font-medium bg-custom-primary text-white w-1/2 transition-all 
                      shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]`,
                      location.pathname == "/sign-up" && "bg-custom-secondary"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
