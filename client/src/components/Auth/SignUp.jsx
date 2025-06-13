import { useState } from "react";
import { motion as Motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { IconEye, IconEyeOff, IconLoader2 } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { signUp } from "@/assets";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { signUp as signUpThunk } from "../../store/slices/authSlice";
import { showToast } from "../ui/Toaster";
import { validateSignUpForm } from "../../lib/validations";

const SignUp = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector((state) => state.auth.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = validateSignUpForm({ name, email, password });
    if (errorMessage) {
      showToast({ type: "error", message: errorMessage });
      return;
    }

    const resultAction = await dispatch(signUpThunk({ name, email, password }));

    if (signUpThunk.fulfilled.match(resultAction)) {
      showToast({
        type: "success",
        message: "Account created successfully!",
      });
      setName("");
      setEmail("");
      setPassword("");
    } else {
      showToast({
        type: "error",
        message: resultAction.payload || "Failed to sign up",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full items-center">
        <div className="hidden lg:block">
          <img
            src={signUp}
            alt="SignUp Illustration"
            className="w-full h-auto max-w-lg mx-auto object-contain"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>

        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="border border-slate-300 rounded-lg p-6 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] 
           w-full max-w-md mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-10">
              <h3 className="text-custom-copy text-3xl font-semibold text-center">
                Sign Up
              </h3>
              <p className="text-custom-copy-light text-sm mt-4 leading-6 text-center">
                Create your account to start managing tasks and staying
                productive every day.
              </p>
            </div>

            <div>
              <label className="text-custom-copy text-sm font-medium mb-2 block">
                Name
              </label>
              <Input
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
                className="w-full text-sm text-custom-copy border border-slate-300 pl-4 pr-10 py-3 outline-none"
              />
            </div>

            <div>
              <label className="text-custom-copy text-sm font-medium mb-2 block">
                Email
              </label>
              <Input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full text-sm text-custom-copy border border-slate-300 pl-4 pr-10 py-3 outline-none"
              />
            </div>

            <div>
              <label className="text-custom-copy text-sm font-medium mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  placeholder="Enter password"
                  className="w-full text-sm text-custom-copy border border-slate-300 pl-4 pr-10 py-3 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-custom-copy-light cursor-pointer 
                    hover:text-custom-copy"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <IconEyeOff size={18} />
                  ) : (
                    <IconEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="custom"
                disabled={loading}
                className="w-full rounded"
              >
                {loading ? (
                  <>
                    <IconLoader2 className="h-4 w-4 animate-spin" />
                    Signing up
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
              <p className="text-sm !mt-6 text-center text-custom-copy-light">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="text-custom-primary-dark font-medium hover:underline underline-offset-2 ml-1"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </Motion.div>
      </div>
    </div>
  );
};

export default SignUp;
