import { ALL_COUNTRIES, studentLoginDetail } from "@/constants";
import { setToken } from "@/constants/token";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Rings } from "react-loader-spinner";
import Select from "react-select";
const stripePromise = loadStripe(process.env.stripe_public_key);

const StudentDetails = () => {
	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors },
	} = useForm();

	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const feesAmountInput = watch("feesAmount");

	const onSubmit = async (data) => {
		setLoading(true);
		if (
			data?.studentReferenceNumber === studentLoginDetail?.studentReferenceNo &&
			data?.studentCountry?.value?.toLowerCase() === "india"
		) {
			try {
				const stripe = await stripePromise;
				const paymentSession = await axios.post("/api/payment-session", {
					email: data?.email,
					amount: data?.tutionFees,
				});

				const result = await stripe.redirectToCheckout({
					sessionId: paymentSession.data.id,
				});
			} catch (e) {
				toast.error(e?.response?.data?.message || "Something went wrong!");
				setLoading(false);
			}
			setLoading(false);
		} else if (data?.studentCountry?.value?.toLowerCase() !== "india") {
			toast.error(
				"Student country must be India. As This portal is relevant for applicants with education from India interested in English taught programmes at Nord University."
			);
			setLoading(false);
			return null;
		} else {
			toast.error("Oops! Reference Id is Incorrect!");
			setLoading(false);
		}
	};

	const whoIsMakingPaymentArr = [
		{
			label: "Student",
			value: "student",
		},
		{
			label: "Parent of Student",
			value: "parent",
		},
		{
			label: "Relative to Student",
			value: "relative",
		},
		{
			label: "Other",
			value: "other",
		},
	];

	const feesDescription = [
		{
			label: "Tution Fees",
			value: "tutionFees",
		},
		{
			label: "Entry Fees",
			value: "entryFees",
		},
		{
			label: "Deposit Fees",
			value: "depositFees",
		},
		{
			label: "Accommodation Fees",
			value: "accommodationFees",
		},
	];

	return (
		<div className="flex flex-col w-full p-6 md:p-8 rounded-xl gap-6 bg-gradient-to-r to-[#03618B] from-[#03618B]">
			<h3 className="text-2xl font-medium text-gray-300">Payment Details</h3>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<Controller
							name="whoIsMakingPayment"
							control={control}
							rules={{
								required: {
									value: true,
									message: "Field is required",
								},
							}}
							render={({ field: { onChange, value = [], ref } }) => (
								<Select
									styles={{
										control: (baseStyles, state) => ({
											...baseStyles,
											padding: "6px 10px",
											borderRadius: "12px",
										}),
									}}
									placeholder="Who is making payment? *"
									className="text-sm"
									options={whoIsMakingPaymentArr}
									onChange={(e) => {
										onChange(e);
									}}
								/>
							)}
						/>
						{errors?.whoIsMakingPayment && (
							<span className="text-red-400 text-xs">
								{errors?.whoIsMakingPayment?.message}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<Controller
							name="studentCountry"
							control={control}
							rules={{
								required: {
									value: true,
									message: "Field is required",
								},
							}}
							render={({ field: { onChange, value = [], ref } }) => (
								<Select
									styles={{
										control: (baseStyles, state) => ({
											...baseStyles,
											padding: "6px 10px",
											borderRadius: "12px",
										}),
									}}
									placeholder="Student Country *"
									className="text-sm"
									options={ALL_COUNTRIES}
									onChange={(e) => {
										onChange(e);
									}}
								/>
							)}
						/>
						{errors?.studentCountry && (
							<span className="text-red-400 text-xs">
								{errors?.studentCountry?.message}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<Controller
							control={control}
							name="whatCountryPayFrom"
							rules={{
								required: {
									value: true,
									message: "Field is required",
								},
							}}
							render={({ field: { onChange, value = [], ref } }) => (
								<Select
									styles={{
										control: (baseStyles, state) => ({
											...baseStyles,
											padding: "6px 10px",
											borderRadius: "12px",
										}),
									}}
									placeholder="What country are you paying from? *"
									className="text-sm"
									options={ALL_COUNTRIES}
									onChange={(e) => {
										onChange(e);
									}}
								/>
							)}
						/>
						{errors?.whatCountryPayFrom && (
							<span className="text-red-400 text-xs">
								{errors?.whatCountryPayFrom?.message}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<input
							type="text"
							className="bg-white placeholder-gray-500 px-5 md:px-6 text-sm py-4 rounded-xl"
							placeholder="Student Reference No. *"
							name="studentReferenceNumber"
							{...register("studentReferenceNumber", {
								required: {
									value: true,
									message: "Reference No. is required",
								},
							})}
						/>
						{errors?.studentReferenceNumber && (
							<span className="text-red-400 text-xs">
								{errors?.studentReferenceNumber?.message}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<input
							type="text"
							className="bg-white placeholder-gray-500 px-5 md:px-6 text-sm py-4 rounded-xl"
							placeholder="Tution Fees *"
							name="tutionFees"
							{...register("tutionFees", {
								required: {
									value: true,
									message: "Tution Fees is required",
								},
							})}
						/>
						{errors?.tutionFees && (
							<span className="text-red-400 text-xs">
								{errors?.tutionFees?.message}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<Controller
							control={control}
							name="feesDescription"
							rules={{
								required: {
									value: true,
									message: "Field is required",
								},
							}}
							render={({ field: { onChange, value = [], ref } }) => (
								<Select
									styles={{
										control: (baseStyles, state) => ({
											...baseStyles,
											padding: "6px 10px",
											borderRadius: "12px",
										}),
									}}
									placeholder="Fees Description *"
									className="text-sm"
									options={feesDescription}
									onChange={(e) => {
										onChange(e);
									}}
								/>
							)}
						/>
						{errors?.feesDescription && (
							<span className="text-red-400 text-xs">
								{errors?.feesDescription?.message}
							</span>
						)}
					</div>
				</div>
				<button
					className={`bg-[#1A1916] px-6 flex items-center justify-center text-center text-sm ${
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
						<span className="text-white">
							Process Transaction
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

export default StudentDetails;
