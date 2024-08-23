import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(reqm, res) {
    if (reqm.method === 'POST') {
        try {
            const { cartItems, successUrl, cancelUrl } = reqm.body;

            // Ensure that required fields are present
            if (!Array.isArray(cartItems) || cartItems.length === 0) {
                return res.status(400).json({ error: 'Cart items are required' });
            }

            // Create line items for Stripe Checkout
            const lineItems = cartItems.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        description: item.description,
                    },
                    unit_amount: item.price * 100, // Convert price to cents
                },
                quantity: item.quantity,
            }));

            // Create a checkout session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: successUrl, // URL to redirect to on successful payment
                cancel_url: cancelUrl,   // URL to redirect to if payment is canceled
            });

            // Send the session ID back to the client
            res.status(200).json({ sessionId: session.id });
        } catch (error) {
            console.error('Error creating Stripe session:', error);
            res.status(500).json({ error: 'Failed to create checkout session', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${reqm.method} Not Allowed`);
    }
}
