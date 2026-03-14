// src/app/api/mock-stk-push/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone, amount, apiRef } = body;

    if (!phone || !amount || !apiRef) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }

    // Normalize phone
    let normalizedPhone = phone.replace(/\D/g, '');
    if (normalizedPhone.startsWith('0')) normalizedPhone = `254${normalizedPhone.slice(1)}`;
    if (!normalizedPhone.startsWith('254')) normalizedPhone = `254${normalizedPhone}`;

    console.log('Received payload:', JSON.stringify(body, null, 2));

    // ── HashPay real integration ──
    if (process.env.HASHPAY_API_KEY && process.env.HASHPAY_WALLET_ID) {
      console.log('Using REAL HashPay integration');

      const payload = {
        phone_number: normalizedPhone,
        amount: Number(amount),
        reference: apiRef,
        wallet_id: process.env.HASHPAY_WALLET_ID,
        // callback_url: 'https://your-vercel-url.vercel.app/api/hashpay-callback', // add if required
      };

      console.log('Sending to HashPay:', JSON.stringify(payload, null, 2));

      const startTime = Date.now();

      let res;
      try {
        res = await fetch('https://api.hashpay.co.ke/v1/payments/stk-push', { // ← CHANGE THIS TO REAL ENDPOINT
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.HASHPAY_API_KEY}`,
            // Alternative: 'X-HashPay-Key': process.env.HASHPAY_API_KEY,
          },
          body: JSON.stringify(payload),
        });
      } catch (fetchErr: any) {
        console.error('Fetch network error:', fetchErr.message);
        throw new Error(`Fetch failed: ${fetchErr.message}`);
      }

      const duration = Date.now() - startTime;
      console.log(`HashPay request took ${duration}ms, status: ${res.status}`);

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error('Failed to parse HashPay JSON response');
        data = { raw: await res.text() };
      }

      console.log('HashPay response:', JSON.stringify(data, null, 2));

      if (!res.ok) {
        return NextResponse.json(
          { ok: false, error: data?.message || `HashPay failed with status ${res.status}` },
          { status: res.status }
        );
      }

      return NextResponse.json({ ok: true, message: 'STK push sent', data });
    }

    // ── Mock fallback ──
    console.log('Using SAFE MOCK (HashPay env vars missing)');
    await new Promise(resolve => setTimeout(resolve, 2000));

    return NextResponse.json({
      ok: true,
      message: 'Mock STK push initiated',
      trackingId: 'MOCK-' + Date.now(),
    });
  } catch (error: any) {
    console.error('Route error:', error.message || error.stack || error);
    return NextResponse.json(
      { ok: false, error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}