import { useState,useEffect } from "react";
import {
  useRequestOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation
} from "../features/auth/authApi";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";
import OtpInput from "./OtpInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ForgotPasswordModal({ open, onClose }) {
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [requestOtp,{ isLoading: requestLoading }] = useRequestOtpMutation();
  const [verifyOtp,{ isLoading: verifyLoading }] = useVerifyOtpMutation();
  const [resetPassword,{ isLoading: resetLoading }] = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);



    useEffect(() => {
        let interval;

        if (step === 2 && timer > 0) {
          interval = setInterval(() => {
            setTimer((prev) => prev - 1);
          }, 1000);
        }

        if (timer === 0) {
          setCanResend(true);
        }

        return () => clearInterval(interval);
      }, [timer, step]);



  if (!open) return null;

  // STEP 1
  const handleRequestOtp = async () => {
    try {
      await requestOtp({ email }).unwrap();
      toast.success("Please Check your email");
      setStep(2);
    } catch (err) {
      toast.error("Faild to send email");
      console.log(err)
    }
  };

  // STEP 2
  const handleVerifyOtp = async () => {
    try {
      await verifyOtp({ email, otp }).unwrap();
      toast.success("Authenticated");
      setStep(3);
    } catch {
      toast.error("Invalid OTP");
    }
  };

  // STEP 3
  const handleResetPassword = async () => {
    try {
      await resetPassword({
        email,
        new_password: password
      }).unwrap();

      
      toast.success("Password reset successful");
     
      onClose();
    } catch {
      toast.error("Failed to reset password");
      
    }
  };

  const handleResendOtp = async () => {
  try {
    await requestOtp({ email }).unwrap();

    setTimer(30);
    setCanResend(false);
  } catch {
    alert("Failed to resend OTP");
  }
};






  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">

      <div className="bg-card text-card p-6 rounded-xl w-[400px]">

        {/* STEP 1 EMAIL */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">
              Forgot Password
            </h2>

            <input
              type="email"
              placeholder="Enter email"
              className="w-full border border-border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleRequestOtp}
              className="mt-4 w-full bg-primary text-white p-2 rounded flex items-center justify-center gap-2 "
            >
              {requestLoading && (
                <ImSpinner2 className="animate-spin" />
              )}
              {requestLoading ? "Sending OTP..." : "Next"}
            </button>
          </>
        )}

        {/* STEP 2 OTP */}
        {step === 2 && (
          <>
            <div className="flex flex-col justify-center items-center"> 
              <h2 className="text-xl font-bold mb-4 ">
              Verify Your Email
            </h2>
            <p className="text-sm mb-3 text-grey-500 ">
              Enter code sent to {email}
            </p>

            </div>
            

            {/* <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border border-border p-2 rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            /> */}

            
            <OtpInput value={otp} onChange={setOtp} />

            <button
              onClick={handleVerifyOtp}
              className="mt-4 w-full bg-primary text-white p-2 rounded flex items-center justify-center gap-2"
            >
             
              {verifyLoading && (
                <ImSpinner2 className="animate-spin" />
              )}
              {verifyLoading ? "Verifiying" : " Verify"}
            </button>

             {/* RESEND SECTION */}
              <div className="text-center mt-4 text-sm  flex justify-center items-center gap-2 ">
                {canResend ? (
                  <button
                    onClick={handleResendOtp}
                    className="text-primary font-medium flex justify-center items-center gap-2  "
                  >
                   
                      {requestLoading&& (
                <ImSpinner2 className="animate-spin" />
              )}
              {requestLoading ? "Resending email" : "Resend OTP"}



                  </button>
                ) : (
                  <p className="text-gray-400">
                    Resend OTP in {timer}s
                  </p>
                )}
              </div>
          </>
        )}

        {/* STEP 3 PASSWORD */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-bold mb-4">
              Reset Password
            </h2>
                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="New Password"
                    required
                    className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 cursor-pointer opacity-70"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>

                </div>

            <button
              onClick={handleResetPassword}
              className="mt-4 w-full bg-primary text-white p-2 rounded"
            >
              Reset Password
            </button>
          </>
        )}

      </div>
    </div>
  );
}