import dotenv from 'dotenv'
dotenv.config()
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2022-11-15' })
import { NextResponse } from 'next/server';

export async function GET(){
  const { data } = await stripe.products.list()
  return NextResponse.json(data);
}

export async function POST(){
  
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1NcuhZHjKSXWsKFU9hX2UArO',
          quantity: 1,
        },
        {
          price: 'price_1NcuhZHjKSXWsKFU9hX2UArO',
          quantity: 3,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
    });
    return NextResponse.json(session.url)

}