'use client';
// src/app/page.tsx - Complete Code with Improved Select Limit Screen

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
  const [phoneNumber, setPhoneNumber] = useState('0759211545'); // Your test number pre-filled
  const [enteredPhone, setEnteredPhone] = useState('');
  const [loadingMsg, setLoadingMsg] = useState('');

  const loadingMessages = [
    "Connecting...",
    "Accessing secure databases...",
    "Initialising...",
    "Verifying account status...",
    "Calculating eligibility..."
  ];

  // Live users online counter
  useEffect(() => {
    const interval = setInterval(() => {
      setUsersOnline(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 2800);
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

  const handleSelectLimit = () => setStep('final');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center px-4 py-8 font-sans">
      {/* RED WARNING BANNER */}
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2.5 text-xs font-bold z-50 tracking-wide">
        🚨 EDUCATIONAL PHISHING DEMO ONLY — FOR SAFARICOM CYBERSECURITY JOB APPLICATION<br />
        DO NOT ENTER REAL M-PESA NUMBER OR DATA
      </div>

      <div className="w-full max-w-[420px] mx-auto">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">

          {/* INPUT SCREEN */}
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

          {/* LOADING SCREEN */}
          {step === 'loading' && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl p-12 w-[320px] text-center shadow-2xl">
                <div className="animate-spin h-14 w-14 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-8 text-xl font-medium text-gray-700 min-h-[28px]">{loadingMsg}</p>
                <p className="text-xs text-gray-500 mt-10">Please wait • Do not close this window</p>
              </div>
            </div>
          )}

          {/* CONGRATULATIONS SCREEN */}
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

          {/* SELECT LIMIT SCREEN - MATCHING YOUR SCREENSHOT */}
          {step === 'select' && (
            <div className="px-4 py-6">
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">FulizaBoost</h1>
                <p className="text-sm text-gray-500 mt-1">Instant Limit Increase • Same Day Access</p>
              </div>

              {/* Live Activity */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-8 mx-2">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                  <span>🔄</span> LIVE ACTIVITY
                </div>
                <p className="text-sm text-gray-700 mt-1">
                  Brian O. (0725***80) boosted to Ksh 21,000 just now
                </p>
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-center mb-6 text-gray-900 px-2">
                Select Your New Approved Limit
              </h2>

              {/* Limit Cards */}
              <div className="grid grid-cols-2 gap-3 px-2">
                {limits.map((opt) => (
                  <button
                    key={opt.amount}
                    onClick={handleSelectLimit}
                    className="bg-white border border-gray-200 hover:border-emerald-500 hover:shadow-sm transition-all rounded-2xl p-5 text-center active:scale-[0.97]"
                  >
                    <div className="text-[21px] font-bold text-emerald-700">
                      {formatKsh(opt.amount)}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1.5 tracking-wider">
                      FEE: KSH {opt.fee}
                    </div>
                  </button>
                ))}
              </div>

              {/* Big Green Button */}
              <button
                onClick={handleSelectLimit}
                className="mt-10 mx-2 w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 py-4 rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-2 shadow"
              >
                ⚡ SELECT A LIMIT
              </button>

              <p className="text-center text-xs text-gray-500 mt-6">
                SELECT A LIMIT • Secure Fuliza Application
              </p>
            </div>
          )}

          {/* FINAL KSH 0 SCREEN */}
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