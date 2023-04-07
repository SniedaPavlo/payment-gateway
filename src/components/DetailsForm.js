import { studentLoginDetail } from "@/constants";
import { setToken } from "@/constants/token";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/router";
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
	const router = useRouter();

	const feesAmountInput = watch("feesAmount");

	const onSubmit = (data) => {
		setLoading(true);
		if (
			data?.studentId === studentLoginDetail?.studentId &&
			data?.password === studentLoginDetail?.password
		) {
			setToken(studentLoginDetail?.studentId);
			router.push("/");
		} else {
			toast.error("Oops! Invalid Credentials!");
		}
		setLoading(false);
	};

	return (
		<div className="flex flex-col w-full p-6 md:p-8 rounded-xl gap-6 bg-gradient-to-r to-[#03618B] from-[#03618B]">
			<h3 className="text-2xl font-medium text-gray-300">Student Login</h3>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="flex flex-col w-full gap-2">
					<input
						type="text"
						className="bg-white w-full placeholder-gray-700 px-5 md:px-6 text-sm py-4 rounded-xl"
						placeholder="Student ID *"
						name="studentId"
						{...register("studentId", {
							required: {
								value: true,
								message: "Student ID is required",
							},
						})}
					/>
					{errors?.studentId && (
						<span className="text-red-200 text-xs">
							{errors?.studentId?.message}
						</span>
					)}
				</div>
				<div className="flex flex-col w-full gap-2">
					<input
						type="password"
						className="bg-white w-full placeholder-gray-700 px-5 md:px-6 text-sm py-4 rounded-xl"
						placeholder="Password *"
						name="password"
						{...register("password", {
							required: {
								value: true,
								message: "Password is required",
							},
						})}
					/>
					{errors?.password && (
						<span className="text-red-200 text-xs">
							{errors?.password?.message}
						</span>
					)}
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
							LOGIN
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
