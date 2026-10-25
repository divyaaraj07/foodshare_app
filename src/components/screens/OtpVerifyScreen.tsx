import React, { useState, useEffect } from 'react';
import { ScreenType, UserRole } from '../../types';

interface OtpVerifyScreenProps {
  setScreen: (screen: ScreenType) => void;
  userRole: UserRole;
  onShowToast: (msg: string) => void;
}

export const OtpVerifyScreen: React.FC<OtpVerifyScreenProps> = ({
  setScreen,
  userRole,
  onShowToast
}) => {
  const [otp, setOtp] = useState(['4', '8', '2', '1', '', '']);
  const [seconds, setSeconds] = useState(28);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const handleChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto advance focus
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      onShowToast('வணக்கம்! Mobile verified successfully under FSSAI IFSA portal.');
      setScreen(userRole === 'recipient' ? 'activity' : 'dashboard');
    }, 700);
  };

  const handleResend = () => {
    setSeconds(30);
    onShowToast('New 6-digit OTP dispatched to +91 98401 24892');
  };

  return (
    <div className="flex flex-col w-full pb-20 animate-in fade-in duration-200">
      {/* Top Back Nav */}
      <div className="flex items-center justify-between py-2 mb-3">
        <button
          onClick={() => setScreen('login')}
          className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary text-body-sm font-semibold transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Sign In</span>
        </button>

        <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-label-sm font-bold">
          SMS OTP VERIFICATION
        </span>
      </div>

      <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-surface-container flex flex-col items-center text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-primary-fixed/40 flex items-center justify-center text-primary mb-3 shadow-xs">
          <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            mark_chat_unread
          </span>
        </div>

        <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold">
          Enter Verification Code
        </h1>
        <p className="font-body-sm text-on-surface-variant mt-1 max-w-[280px]">
          We sent a 6-digit one-time passcode to <strong className="text-on-surface">+91 98401 24892</strong>
        </p>

        <form onSubmit={handleVerify} className="w-full flex flex-col items-center mt-6 gap-6">
          {/* 6 Digit Inputs */}
          <div className="flex justify-center gap-2 w-full max-w-xs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-11 h-13 rounded-xl bg-surface-container-low border border-surface-container text-center text-headline-sm font-bold text-primary focus:bg-surface-container-lowest focus:border-primary outline-none transition-all shadow-xs"
              />
            ))}
          </div>

          <div className="flex items-center justify-between w-full max-w-xs text-body-sm">
            {seconds > 0 ? (
              <span className="text-on-surface-variant font-label-sm">
                Resend code in <strong className="text-primary font-bold">{seconds}s</strong>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-primary font-label-md font-bold hover:underline"
              >
                Resend SMS OTP
              </button>
            )}

            <button
              type="button"
              onClick={() => setScreen('login')}
              className="text-secondary font-label-sm hover:underline"
            >
              Change Number
            </button>
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full max-w-xs h-12 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-label-lg text-label-lg font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span>
            ) : (
              <>
                <span>Verify &amp; Launch Portal</span>
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-surface-container w-full text-center">
          <p className="font-label-sm text-[11px] text-on-surface-variant flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-primary">security</span>
            Protected by Government of India FSSAI IFSA Network
          </p>
        </div>
      </div>
    </div>
  );
};
