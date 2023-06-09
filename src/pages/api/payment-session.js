/* eslint-disable import/no-anonymous-default-export */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
	const { email, amount } = req?.body;
	const item = {
		quantity: 1,
		price_data: {
			currency: "INR",
			unit_amount: amount * 100,
			product_data: {
				name: "Nord University Fees",
				// images: [`${process.env.HOST}/mu.png`],
			},
		},
	};
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [item],
			mode: "payment",
			success_url: `${process.env.HOST}/success`,
			cancel_url: `${process.env.HOST}`,
			metadata: {
				email: email,
				// images: [`${process.env.HOST}/mu.png`],
			},
		});
		res.status(200).json({ id: session.id });
	} catch (e) {
		res.status(400).json({ message: e?.raw?.message });
	}
};
