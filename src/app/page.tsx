'use client';
// src/app/page.tsx - Updated with Accurate Select Limit Screen

import React, { useState, useEffect } from 'react';

const formatKsh = (amount: number) => `Ksh ${amount.toLocaleString('en-KE')}`;

const limits = [
  { amount: 3000, fee: 250 },
  { amount: 5000, fee: 293 },
  { amount: 7500, fee: 350 },
  { amount: 10000, fee: 500 },
  { amount: 12500, fee: 747 },
  { amount: 16000, fee: 898 },
  { amount: 21000, fee: 1015 },
  { amount: 25500, fee: 1220 },
  { amount: 30000, fee: 1533 },
  { amount: 35000, fee: 1730 },
  { amount: 45000, fee: 2000 },
  { amount: 60000, fee: 2250 },
  { amount: 70000, fee: 2500 },
];

export default function FulizaBoostExactClone() {
  const [step, setStep] = useState<'input' | 'loading' | 'congrats' | 'select' | 'final'>('input');
  const [usersOnline, setUsersOnline] = useState(137);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [enteredPhone, setEnteredPhone] = useState('');
  const [loadingMsg, setLoadingMsg] = useState('');

  const loadingMessages = [
    "Connecting...",
    "Accessing secure databases...",
    "Initialising...",
    "Verifying account status...",
    "Calculating eligibility..."
  ];

  // Live users online
  useEffect(() => {
    const interval = setInterval(() => {
      setUsersOnline(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckEligibility = () => {
    if (!phoneNumber.trim()) {
      alert("Please enter your M-Pesa number (demo only)");
      return;
    }

    setEnteredPhone(phoneNumber.trim());
    setStep('loading');
    setLoadingMsg(loadingMessages[0]);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < loadingMessages.length) {
        setLoadingMsg(loadingMessages[i]);
      } else {
        clearInterval(interval);
        setTimeout(() => setStep('congrats'), 900);
      }
    }, 1300);
  };

  const handleProceedToUpgrade = () => setStep('select');

  const handleSelectLimit = () => {
    setStep('final'); // Shows "Ksh 0" like the real scam site
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center px-4 py-12 font-sans">
      {/* RED WARNING BANNER */}
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2.5 text-xs font-bold z-50 tracking-wide">
        🚨 EDUCATIONAL PHISHING DEMO ONLY — FOR SAFARICOM CYBERSECURITY JOB APPLICATION<br />
        DO NOT ENTER REAL M-PESA NUMBER OR DATA
      </div>

      <div className="w-full max-w-[380px]">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Input Screen */}
          {step === 'input' && (
            <>
              <div className="pt-10 pb-6 flex flex-col items-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center relative">
                  <span className="text-5xl">👤</span>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow text-xl">🛡️</div>
                </div>
                <h1 className="mt-6 text-4xl font-bold text-gray-900">Fuliza Plus+</h1>
                <p className="text-emerald-600 font-semibold text-lg">OFFICIAL VERIFICATION PORTAL</p>
                <p className="mt-6 px-8 text-center text-gray-600 text-[15px]">
                  Verify your identity to unlock higher daily transaction limits.
                </p>
              </div>

              <div className="px-8 pb-10">
                <div className="relative mb-8">
                  <div className="absolute left-5 top-4 text-emerald-600 text-xl">📱</div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter M-Pesa Number"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 rounded-2xl pl-14 pr-6 py-4 text-base outline-none"
                  />
                </div>

                <button
                  onClick={handleCheckEligibility}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-2"
                >
                  Check My Eligibility <span>›</span>
                </button>
              </div>

              <div className="border-t border-gray-100 py-4 px-8 flex items-center justify-between text-xs text-gray-500 bg-gray-50">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500">●</span> {usersOnline} USERS ONLINE
                </div>
                <div>🔒 SSL SECURED</div>
              </div>
            </>
          )}

          {/* Loading Screen */}
          {step === 'loading' && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl p-12 w-[320px] text-center shadow-2xl">
                <div className="animate-spin h-14 w-14 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-8 text-xl font-medium text-gray-700 min-h-[28px]">{loadingMsg}</p>
                <p className="text-xs text-gray-500 mt-10">Please wait • Do not close this window</p>
              </div>
            </div>
          )}

          {/* Congratulations Screen */}
          {step === 'congrats' && (
            <div className="px-8 py-12 text-center">
              <div className="mx-auto w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-5xl font-light">✓</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Congratulations!</h2>
              <p className="mt-6 text-gray-700">
                High Trust Score Detected.{' '}
                <span className="text-emerald-600 font-medium">{enteredPhone}</span> is eligible for a boost.
              </p>
              <button
                onClick={handleProceedToUpgrade}
                className="mt-10 w-full bg-gray-900 hover:bg-black py-4 rounded-2xl text-white font-semibold text-lg"
              >
                Proceed to Upgrade Limit
              </button>
            </div>
          )}

          {/* === SELECT LIMIT SCREEN (Now Improved & Accurate) === */}
          {step === 'select' && (
            <div className="px-6 py-8">
              <h2 className="text-center text-2xl font-semibold text-gray-900 mb-8">
                Select Your New Approved Limit
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {limits.map((opt) => (
                  <button
                    key={opt.amount}
                    onClick={handleSelectLimit}
                    className="bg-white border-2 border-emerald-100 hover:border-emerald-600 hover:shadow-md active:scale-95 transition-all rounded-2xl p-6 text-left"
                  >
                    <div className="text-2xl font-bold text-emerald-700">
                      {formatKsh(opt.amount)}
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Fee: {formatKsh(opt.fee)}
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-center text-xs text-gray-500 mt-10">
                SELECT A LIMIT • Secure Fuliza Application
              </p>
            </div>
          )}

          {/* Final Ksh 0 Screen */}
          {step === 'final' && (
            <div className="px-8 py-16 text-center">
              <h2 className="text-3xl font-bold text-emerald-700">Limit will be boosted to</h2>
              <p className="text-7xl font-bold text-emerald-600 mt-8">Ksh 0</p>
              <p className="mt-8 text-sm text-red-500">* Final amount depends on full verification</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}