// src/app/api/mock-stk-push/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone, amount, apiRef } = body;

    if (!phone || !amount || !apiRef) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }

    // Normalize phone to 254XXXXXXXXX format
    let normalizedPhone = phone.replace(/\D/g, '');
    if (normalizedPhone.startsWith('0')) normalizedPhone = `254${normalizedPhone.slice(1)}`;
    if (!normalizedPhone.startsWith('254')) normalizedPhone = `254${normalizedPhone}`;

    console.log('Received payload:', JSON.stringify(body, null, 2));

    // Check if HashPay env vars are set
    if (process.env.HASHPAY_API_KEY && process.env.HASHPAY_WALLET_ID) {
      console.log('Using REAL HashPay integration');

      const payload = {
        phone_number: normalizedPhone,
        amount: Number(amount),
        reference: apiRef,
        wallet_id: process.env.HASHPAY_WALLET_ID,
        // Add other required fields based on HashPay docs, e.g.:
        // callback_url: 'https://yourdomain.com/api/hashpay-callback',
        // customer_name: 'Test User',
      };

      const res = await fetch('https://api.hashpay.co.ke/v1/payments/stk-push', {  // ← confirm exact endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.HASHPAY_API_KEY}`, // or X-HashPay-Key, check docs
          // 'X-HashPay-Key': process.env.HASHPAY_API_KEY,  // alternative if Bearer doesn't work
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('HashPay status:', res.status);
      console.log('HashPay body:', data);

      if (!res.ok) {
        return NextResponse.json(
          { ok: false, error: data?.message || 'HashPay request failed' },
          { status: res.status }
        );
      }

      return NextResponse.json({ ok: true, message: 'STK push sent', data });
    }

    // Fallback to pure mock if no env vars
    console.log('Using SAFE MOCK (HashPay env vars missing)');
    await new Promise((resolve) => setTimeout(resolve, 2000)); // fake delay

    return NextResponse.json({
      ok: true,
      message: 'Mock STK push initiated (HashPay env vars not set)',
      trackingId: 'MOCK-' + Date.now(),
    });
  } catch (error: any) {
    console.error('Route error:', error.message || error);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}