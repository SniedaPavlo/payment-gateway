import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Rings } from "react-loader-spinner";
const stripePromise = loadStripe(process.env.stripe_public_key);

const DetailsForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const [loading, setLoading] = useState(false);

	const feesAmountInput = watch("feesAmount");

	const onSubmit = async (data) => {
		setLoading(true);
		const stripe = await stripePromise;
		const paymentSession = await axios.post("/api/payment-session", {
			email: data?.email,
			amount: data?.feesAmount,
		});

		const result = await stripe.redirectToCheckout({
			sessionId: paymentSession.data.id,
		});

		if (result?.error) {
			toast.error(result?.error?.message);
		}
		setLoading(false);
	};

	return (
		<div className="flex flex-col w-full lg:w-1/2 p-6 md:p-8 rounded-xl gap-6 bg-gradient-to-r to-cyan-500 from-blue-500">
			<h3 className="text-2xl font-medium text-gray-900">Your Details</h3>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<input
						type="text"
						className="bg-white placeholder-gray-700 px-5 md:px-6 text-sm py-4 rounded-xl"
						placeholder="Your Full Name *"
						name="fullName"
						{...register("fullName", {
							required: "Field is required",
							pattern: {
								value: /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/,
								message: "Only alphabets are allowed",
							},
						})}
					/>
					{errors?.fullName && (
						<span className="text-red-900 text-xs">
							{errors?.fullName?.message}
						</span>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<input
						type="text"
						className="bg-white placeholder-gray-700 px-5 md:px-6 text-sm py-4 rounded-xl"
						placeholder="Your Email *"
						name="email"
						{...register("email", {
							required: {
								value: true,
								message: "Field is required",
							},
							pattern: {
								value: /^\S+@\S+\.\S+$/,
								message: "Please enter a valid email address",
							},
						})}
					/>
					{errors?.email && (
						<span className="text-red-900 text-xs">
							{errors?.email?.message}
						</span>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<input
						type="text"
						className="bg-white placeholder-gray-700 px-5 md:px-6 text-sm py-4 rounded-xl"
						placeholder="Fee Amount AUD *"
						name="feesAmount"
						{...register("feesAmount", {
							required: {
								value: true,
								message: "Field is required",
							},
							pattern: {
								value: /^(?!0\d)\d{0,4}(\.\d{1,2})?$|10000(\.0{1,2})?$/,
								message:
									"Enter vaild amount and it should not be greater than 10000 USD",
							},
						})}
					/>
					{errors?.feesAmount && (
						<span className="text-red-900 text-xs">
							{errors?.feesAmount?.message}
						</span>
					)}
				</div>
				<button
					className={`bg-gray-900 px-6 flex items-center justify-center jus text-center text-sm ${
						!loading && "py-4"
					} rounded-xl`}
				>
					{loading ? (
						<Rings
							height="50"
							width="50"
							color="#fff"
							radius="6"
							wrapperStyle={{}}
							wrapperClass=""
							visible={true}
							ariaLabel="rings-loading"
						/>
					) : (
						<span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
							Pay Fees{" "}
							{feesAmountInput &&
								feesAmountInput > 0 &&
								`( ${feesAmountInput} USD )`}
						</span>
					)}
				</button>
			</form>
		</div>
	);
};

export default DetailsForm;
