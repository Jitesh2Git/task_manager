import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { checkAuth } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { checkingAuth, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <Header checkingAuth={checkingAuth} isLoggedIn={isLoggedIn} />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer isLoggedIn={isLoggedIn} />
    </>
  );
};

export default MainLayout;
