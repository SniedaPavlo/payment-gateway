import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }) {
	let stripePromise = null;

	const getStripe = () => {
		if (!stripePromise) {
			stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);
		}
		return stripePromise;
	};

	const stripe = await getStripe();

	await stripe.redirectToCheckout({
		mode: "payment",
		lineItems,
		successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
		cancelUrl: window.location.origin,
	});
}

export const setCookie = ({ cName, cValue, exDays, exMinutes }) => {
	if (typeof window !== "undefined") {
		const d = new Date();
		d.setTime(
			d.getTime() +
				(exDays ? exDays * 24 * 60 * 60 * 1000 : exMinutes * 60 * 1000)
		);
		const expires = "expires=" + d.toUTCString();
		document.cookie = cName + "=" + cValue + ";" + expires + ";path=/";
	}
};

export const getCookie = (cName) => {
	if (typeof window !== "undefined") {
		const name = cName + "=";
		const decodedCookie = decodeURIComponent(document.cookie);
		const ca = decodedCookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	return "";
};

export const clearCookie = () => {
	const cookies = document.cookie.split(";");
	cookies.forEach((c) => {
		document.cookie = c
			.replace(/^ +/, "")
			.replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
	});
};
