import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../store/slices/authSlice";
import { Skeleton } from "@/components/ui/Skeleton";
import { Link } from "react-router-dom";
import { motion as Motion } from "motion/react";

const Hero = () => {
  const dispatch = useDispatch();
  const { checkingAuth, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('@/assets/heroBg.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-1 before:transform before:-translate-x-1/2">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="mt-5 max-w-xl text-center mx-auto">
          <h1 className="block font-bold text-custom-copy text-4xl md:text-5xl lg:text-6xl">
            Plan Smarter. Work Faster.
          </h1>
        </div>

        <div className="mt-5 max-w-3xl text-center mx-auto">
          <p className="text-lg text-custom-copy-light">
            Your all-in-one task management tool to prioritize, track, and
            complete work—beautifully.
          </p>
        </div>

        <div className="mt-8 gap-3 flex justify-center">
          {checkingAuth ? (
            <Skeleton className="h-[40px] w-[200px] bg-gray-200" />
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
                className="px-6 py-2 font-medium bg-custom-primary text-white w-fit transition-all shadow-[3px_3px_0px_black] 
              hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>

      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative max-w-5xl mx-auto px-4 sm:px-8"
      >
        <div className="w-full object-cover h-96 sm:h-120 bg-[url('@/assets/heroImage.jpg')] bg-no-repeat bg-center bg-cover rounded-xl" />

        <div className="absolute bottom-12 -start-20 -z-1 size-48 bg-linear-to-b from-orange-500 to-white p-px rounded-lg">
          <div className="bg-white size-48 rounded-lg"></div>
        </div>

        <div className="absolute -top-12 -end-20 -z-1 size-48 bg-linear-to-t from-blue-600 to-cyan-400 p-px rounded-full">
          <div className="bg-white size-48 rounded-full"></div>
        </div>
      </Motion.div>
    </div>
  );
};

export default Hero;
