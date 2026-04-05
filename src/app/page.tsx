'use client';
// src/app/page.tsx - Exact Match to https://ish-fuliza-boost.vercel.app/ (Educational Demo)

import React, { useState, useEffect } from 'react';

export default function FulizaBoostExactClone() {
  const [step, setStep] = useState<'input' | 'loading' | 'congrats' | 'select' | 'final'>('input');
  const [usersOnline, setUsersOnline] = useState(137);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loadingMsg, setLoadingMsg] = useState('');
  const [enteredPhone, setEnteredPhone] = useState(''); // Store phone for congrats screen

  // Live users online counter
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

    const messages = ["Connecting...", "Accessing secure databases..."];
    let i = 0;

    const interval = setInterval(() => {
      setLoadingMsg(messages[i] || "Verifying...");
      i++;
      if (i >= messages.length) {
        clearInterval(interval);
        setTimeout(() => setStep('congrats'), 800);
      }
    }, 1300);
  };

  const handleProceedToUpgrade = () => {
    setStep('select'); // You can expand this with limit grid later
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center px-4 py-12 font-sans">
      {/* RED WARNING BANNER - MUST KEEP FOR JOB PRESENTATION */}
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2.5 text-xs font-bold z-50 tracking-wide">
        🚨 EDUCATIONAL PHISHING DEMO ONLY — FOR SAFARICOM CYBERSECURITY JOB APPLICATION<br />
        DO NOT ENTER REAL M-PESA NUMBER OR DATA
      </div>

      <div className="w-full max-w-[380px]">

        {/* Main Card */}
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
                  className="w-full bg-emerald-600 hover:bg-emerald-700 transition py-4 rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-2"
                >
                  Check My Eligibility <span>›</span>
                </button>
              </div>
            </>
          )}

          {/* Loading Screen */}
          {step === 'loading' && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl p-10 w-80 text-center">
                <div className="animate-spin h-12 w-12 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-6 text-lg font-medium text-gray-700">{loadingMsg}</p>
              </div>
            </div>
          )}

          {/* Congratulations Screen - Exact Match to Your Screenshot */}
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
                className="mt-10 w-full bg-gray-900 hover:bg-black transition py-4 rounded-2xl text-white font-semibold text-lg"
              >
                Proceed to Upgrade Limit
              </button>
            </div>
          )}

          {/* Bottom Bar - Visible on Input Screen */}
          {step === 'input' && (
            <div className="border-t border-gray-100 py-4 px-8 flex items-center justify-between text-xs text-gray-500 bg-gray-50">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-500">●</span> {usersOnline} USERS ONLINE
              </div>
              <div className="flex items-center gap-1">🔒 SSL SECURED</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}