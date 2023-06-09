import Navbar from "@/components/Navbar";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const Success = () => {
	return (
		<>
			<Head>
				<title>Nord University Fees Portal</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="w-100 h-screen pb-12 gap-10 flex flex-col px-8">
				<div className="px-2 md:px-10 flex flex-col gap-10">
					<div className="flex flex-col gap-3 items-center">
						<h1 className="text-2xl md:text-4xl font-medium bg-gradient-to-r from-[#035F89] to-blue-500 text-transparent bg-clip-text text-center mb-6">
							Hurray! Your Fees paid Successfully.
						</h1>
						<Link href="/" legacyBehavior>
							<a className="text-white bg-[#035F89] px-6 text-center py-2 rounded-full">
								Go to Home Page
							</a>
						</Link>
					</div>
				</div>
			</main>
		</>
	);
};

export default Success;
