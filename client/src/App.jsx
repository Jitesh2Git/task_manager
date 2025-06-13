import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

const Home = lazy(() => import("@/pages/Home"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const SignIn = lazy(() => import("@/components/Auth/SignIn"));
const SignUp = lazy(() => import("@/components/Auth/SignUp"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route
            path="*"
            element={
              <>
                <Header />
                <NotFound />
                <Footer />
              </>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
