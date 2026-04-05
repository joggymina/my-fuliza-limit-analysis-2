'use client';
// src/app/page.tsx  -  Educational Demo Matching ish-fuliza-boost.vercel.app

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
  const [step, setStep] = useState<'hero' | 'loading' | 'result' | 'select' | 'modal'>('hero');
  const [usersOnline, setUsersOnline] = useState(138);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [selectedLimit, setSelectedLimit] = useState(limits[3]); // default 10,000
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Live users online
  useEffect(() => {
    const interval = setInterval(() => {
      setUsersOnline((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadingMessages = [
    "Connecting...",
    "Accessing secure databases...",
    "Initialising...",
    "Verifying account status...",
    "Calculating new limit..."
  ];

  const handleCheckEligibility = () => {
    setStep('loading');
    let i = 0;
    const interval = setInterval(() => {
      setLoadingMsg(loadingMessages[i] || "Eligibility confirmed!");
      i++;
      if (i >= loadingMessages.length) {
        clearInterval(interval);
        setTimeout(() => {
          setStep('result');
        }, 800);
      }
    }, 1200);
  };

  const handleProceed = () => {
    setStep('select');
  };

  const openPaymentModal = (limit: typeof limits[0]) => {
    setSelectedLimit(limit);
    setStep('modal');
  };

  const handleSubmit = async () => {
    if (!idNumber || phoneNumber.replace(/\D/g, '').length < 9) {
      alert("Please fill in ID and Phone Number (demo only)");
      return;
    }
    setIsProcessing(true);
    // Simulate STK push
    setTimeout(() => {
      setIsProcessing(false);
      alert("Demo: M-PESA STK Push sent (this is a simulation for educational purposes only)");
      // In real demo you could move to success screen here
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white font-sans">
      {/* RED EDUCATIONAL WARNING - MUST KEEP FOR JOB PRESENTATION */}
      <div className="bg-red-600 text-white text-center py-2.5 text-xs font-bold tracking-wide">
        🚨 THIS IS AN EDUCATIONAL PHISHING DEMO ONLY — FOR SAFARICOM CYBERSECURITY JOB APPLICATION<br />
        DO NOT ENTER REAL DATA — REAL FULIZA CANNOT BE BOOSTED VIA WEBSITES
      </div>

      {/* Header */}
      <header className="bg-emerald-600 text-white py-4 px-4 flex items-center justify-between sticky top-0 z-50">
        <div className="font-bold text-2xl">Fuliza Plus+</div>
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="font-semibold">{usersOnline}</span> Users Online
          </div>
          <div className="flex items-center gap-1">
            🔒 <span>SSL Secured</span>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 pt-8 pb-20">

        {/* HERO / MAIN SCREEN */}
        {step === 'hero' && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm mb-6">
              Official Verification Portal
            </div>
            <h1 className="text-4xl font-bold text-emerald-700">Congratulations!</h1>
            <p className="mt-3 text-2xl font-semibold text-gray-800">High Trust Score Detected</p>
            <p className="mt-8 text-lg text-gray-700">
              Your M-PESA account is eligible for an instant Fuliza limit boost.
            </p>

            <button
              onClick={handleCheckEligibility}
              className="mt-12 w-full bg-emerald-600 hover:bg-emerald-700 transition py-5 rounded-2xl text-white text-xl font-semibold shadow-xl"
            >
              Check My Eligibility
            </button>

            <div className="mt-16 text-xs text-gray-500">
              Instant Limit Increase • Same Day Access • No Paperwork
            </div>
          </div>
        )}

        {/* LOADING SCREEN */}
        {step === 'loading' && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-10 w-80 text-center shadow-2xl">
              <div className="animate-spin mx-auto h-14 w-14 border-4 border-emerald-600 border-t-transparent rounded-full"></div>
              <p className="mt-8 text-lg font-medium text-gray-700">{loadingMsg}</p>
              <p className="text-xs text-gray-500 mt-10">Please wait • Do not refresh</p>
            </div>
          </div>
        )}

        {/* RESULT SCREEN - Shows "Ksh 0" like the original */}
        {step === 'result' && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-emerald-700">Eligibility Confirmed</h2>
            <div className="mt-10 bg-white rounded-3xl p-10 shadow">
              <p className="text-gray-600">Your Fuliza limit will be boosted to</p>
              <p className="text-6xl font-bold text-emerald-600 mt-4">Ksh 0</p>
              <p className="text-xs text-rose-500 mt-8">* Final limit depends on verification</p>
            </div>

            <button
              onClick={handleProceed}
              className="mt-12 w-full bg-emerald-600 hover:bg-emerald-700 py-5 rounded-2xl text-white text-xl font-semibold"
            >
              Proceed to Upgrade Limit
            </button>
          </div>
        )}

        {/* LIMIT SELECTION SCREEN */}
        {step === 'select' && (
          <div>
            <h2 className="text-center text-2xl font-semibold text-emerald-700 mb-8">
              Select Your New Approved Limit
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {limits.map((opt) => (
                <button
                  key={opt.amount}
                  onClick={() => openPaymentModal(opt)}
                  className="bg-white border border-emerald-200 hover:border-emerald-600 hover:shadow-md transition-all rounded-2xl p-5 text-left"
                >
                  <div className="font-bold text-xl text-emerald-700">{formatKsh(opt.amount)}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    Fee: {formatKsh(opt.fee)}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 mt-8">
              SELECT A LIMIT • Secure Fuliza Application
            </p>
          </div>
        )}

        {/* PAYMENT / DETAILS MODAL */}
        {step === 'modal' && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-3xl w-full max-w-md p-8">
              <h3 className="text-xl font-semibold text-center text-emerald-700">
                Enter Details to Activate {formatKsh(selectedLimit.amount)}
              </h3>

              <div className="mt-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">National ID Number</label>
                  <input
                    type="text"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeholder="12345678"
                    className="w-full border border-gray-300 focus:border-emerald-600 rounded-2xl px-5 py-4 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Phone Number</label>
                  <div className="flex rounded-2xl overflow-hidden border border-gray-300 focus-within:border-emerald-600">
                    <div className="bg-gray-100 px-5 flex items-center text-gray-600 font-medium">+254</div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="712345678"
                      className="flex-1 px-5 py-4 outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="mt-10 w-full bg-emerald-600 disabled:bg-gray-400 py-4 rounded-2xl text-white font-semibold text-lg"
              >
                {isProcessing ? "Sending M-PESA Prompt..." : "Pay Fee & Activate"}
              </button>

              <button
                onClick={() => setStep('select')}
                className="mt-4 w-full text-gray-500 py-3"
              >
                Cancel
              </button>

              <p className="text-center text-[10px] text-rose-600 mt-6">
                ⚠️ Never share your M-PESA PIN on any website
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}