import Navbar from "@/components/Navbar";
import App from "next/app";
import { getToken } from "@/constants/token";
import "@/styles/globals.css";
import Footer from "@/components/Footer";

export default function MyApp({ Component, pageProps, token }) {
	return (
		<div className="bg-[url('/nord-build.png')] bg-no-repeat bg-cover w-100 min-h-screen flex flex-col gap-8 ">
			<Navbar token={token} />
			<div className="max-w-[1440px] flex flex-col items-start">
				<Component {...pageProps} />
			</div>
			<Footer />
		</div>
	);
}

MyApp.getInitialProps = async (appContext) => {
	const appProps = await App.getInitialProps(appContext);
	const token = await getToken();
	return {
		token,
		...appProps,
	};
};
