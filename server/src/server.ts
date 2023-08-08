import { fastify } from 'fastify'
import cors from '@fastify/cors'
import Stripe from 'stripe';
const app = fastify()
import dotenv from 'dotenv'
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2022-11-15' })

app.register(cors, {origin: true})

app.get('/', async (_request, reply) => {
  const { data } = await stripe.products.list()
  reply.send(data).status(200);
})

const YOUR_DOMAIN = 'http://localhost:3333';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1NcuhZHjKSXWsKFU9hX2UArO',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  console.log(session)
  //@ts-ignore
  res.redirect(303, session.url);
});

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Servidor iniciado porta: ${address}`)
})


// https://blog.avneesh.tech/payments-in-next

// https://dev.to/byteslash/stripe-checkout-with-next-js-the-complete-guide-3i1


// https://checkout.stripe.com/c/pay/cs_test_a1wK2HGPh5cGnl66OUVMcLHiPIW0LUf6vadfCUREJy4SFsx2VaWhXs1Yoo#fidkdWxOYHwnPyd1blpxYHZxWjA0S2ZxdEdNb05WXVJ2TkNQPW93YTw3bU9SQ3RgS2hIbkg9VUZgaURSZml1YFZTaFxIbk1DaHdwYn1jZGJxMF1sUTNJQDFBXHVBUF1uU3ZAZ3QzVV01NkFKNTU8d3JsXFc2YicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl