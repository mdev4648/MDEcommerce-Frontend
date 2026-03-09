import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../features/auth/authApi";
import loginImg from "../assets/login_avator.png";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import ForgotPasswordModal from "../components/ForgotPasswordModal";

function Auth() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const [registerUser, { isLoading: registerLoading }] =
    useRegisterUserMutation();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
    profile_image: null,
  });

  const [preview, setPreview] = useState(null);
  const [openForgot, setOpenForgot] = useState(false);

  /* ================= LOGIN ================= */

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(loginData).unwrap();

      // localStorage.setItem("access", res.access);
      dispatch(setCredentials({
           access: res.access,
          refresh: res.refresh,
      })
    );
      localStorage.setItem("refresh", res.refresh);

      toast.success("Login successful 🎉");
    } catch (err) {
      const errorMessage = err?.data?.detail || "Invalid email or password";
      toast.error(errorMessage);
    }
  };

  /* ================= REGISTER ================= */

  const handleRegister = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.password2) {
      toast.error("Passwords do not match");
      return;
    }

    const formData = new FormData();

    formData.append("email", registerData.email);
    formData.append("username", registerData.username);
    formData.append("password", registerData.password);
    formData.append("password2", registerData.password2);

    if (registerData.profile_image) {
      formData.append("profile_image", registerData.profile_image);
    }

    try {
      await registerUser(formData).unwrap();
      toast.success("Account created successfully 🎉");
      setIsLogin(true);
    } catch (err) {
      const errorMessage =
        err?.data?.email?.[0] ||
        err?.data?.username?.[0] ||
        err?.data?.password?.[0] ||
        "Registration failed";

      toast.error(errorMessage);
    }
  };

  /* ================= IMAGE PREVIEW ================= */

  const handleImage = (e) => {
    const file = e.target.files[0];

    setRegisterData({
      ...registerData,
      profile_image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-background
      text-foreground
      p-6
      relative
      "
    >
      {/* BACKGROUND IMAGE */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url('/src/assets/login2.jpg')" }}
      /> */}

      {/* CARD */}

      <div
        className="
        w-[950px]
        bg-card
        border border-border
        backdrop-blur-xl
        rounded-2xl
        shadow-2xl
        flex
        overflow-hidden
        "
      >
        {/* LEFT IMAGE */}

        <div className="w-1/2 hidden md:flex items-center justify-center p-10">

          <motion.img
            key={isLogin}
            src={loginImg}
            alt="login"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-sm"
          />

        </div>

        {/* DIVIDER */}

        <div className="hidden md:block w-px bg-border"></div>

        {/* FORM */}

        <div className="w-full md:w-1/2 p-10">

          {/* TABS */}

          <div className="flex mb-8">

            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-lg transition ${
                isLogin
                  ? "border-b-2 border-primary text-primary font-semibold"
                  : "opacity-60"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-lg transition ${
                !isLogin
                  ? "border-b-2 border-primary text-primary font-semibold"
                  : "opacity-60"
              }`}
            >
              Register
            </button>

          </div>

          <motion.div
            key={isLogin}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >

            {isLogin ? (
              <>
                <form onSubmit={handleLogin} className="space-y-5">

                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="
                    w-full
                    border border-border
                    bg-background
                    p-3
                    rounded-xl
                    focus:ring-2
                    focus:ring-primary
                    outline-none
                    "
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        email: e.target.value,
                      })
                    }
                  />

                  {/* PASSWORD */}

                  <div className="relative">

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                      className="
                      w-full
                      border border-border
                      bg-background
                      p-3
                      rounded-xl
                      focus:ring-2
                      focus:ring-primary
                      outline-none
                      "
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          password: e.target.value,
                        })
                      }
                    />

                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 cursor-pointer opacity-70"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>

                  </div>

                  {/* BUTTON */}

                  <button
                    disabled={loginLoading}
                    className="
                    w-full
                    bg-primary
                    text-white
                    py-3
                    rounded-lg
                    flex
                    justify-center
                    items-center
                    gap-2
                    hover:opacity-90
                    transition
                    "
                  >
                    {loginLoading ? (
                      <>
                        <ImSpinner2 className="animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>

                </form>

                {/* REMEMBER */}

                <div className="flex justify-between pt-7 items-center text-sm">

                  <div className="flex items-center gap-2">

                    <span>Remember</span>

                    <button
                      onClick={() => setRemember(!remember)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                        remember ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                          remember ? "translate-x-6" : ""
                        }`}
                      />
                    </button>

                  </div>

                  <div className="text-primary cursor-pointer hover:underline">
                    <p className="text-primary cursor-pointer" onClick={() => setOpenForgot(true)}>Forgot Password?</p>
                    
                  </div>

                </div>

              </>
            ) : (

              <form onSubmit={handleRegister} className="space-y-4">

                <input
                  type="text"
                  placeholder="Username"
                  required
                  className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary"
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      username: e.target.value,
                    })
                  }
                />

                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary"
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      email: e.target.value,
                    })
                  }
                />

                {/* PASSWORD */}

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 cursor-pointer opacity-70"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>

                </div>

                {/* CONFIRM */}

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary"
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password2: e.target.value,
                    })
                  }
                />

                {/* FILE */}

                <label className="border border-border bg-muted p-3 rounded-lg flex justify-between cursor-pointer">

                  <span>
                    {registerData.profile_image
                      ? registerData.profile_image.name
                      : "Upload Profile Image"}
                  </span>

                  <input type="file" hidden onChange={handleImage} />

                </label>

                {preview && (
                  <img
                    src={preview}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}

                <button
                  disabled={registerLoading}
                  className="w-full bg-primary text-white py-3 rounded-lg flex justify-center items-center gap-2"
                >
                  {registerLoading ? (
                    <>
                      <ImSpinner2 className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

              </form>

            )}

          </motion.div>

        </div>

      </div>

      <ForgotPasswordModal open={openForgot} onClose={() => setOpenForgot(false)} />

    </div>
  );
}

export default Auth;