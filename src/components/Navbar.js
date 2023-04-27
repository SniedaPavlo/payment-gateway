import { getToken, removeToken } from "@/constants/token";
import { AiFillHome } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Navbar = ({ token }) => {
	const [logoutBtn, setLogoutBtn] = useState(false);
	const router = useRouter();
	useEffect(() => {
		if (typeof window !== "undefined") {
			if (localStorage.getItem("token")) {
				setLogoutBtn(true);
			} else {
				setLogoutBtn(false);
			}
		}
	}, [logoutBtn]);
	const handleLogout = () => {
		removeToken();
		router.push("/login");
	};
	return (
		<div className="w-full px-4 md:px-8 py-4">
			<div className="flex w-100 items-center justify-between">
				<Link href="/">
					<Image
						src="/nord.svg"
						width={180}
						height={20}
						alt="McMine University Logo"
					/>
				</Link>
				<div className="flex items-center gap-2">
					<Link href="https://www.nord.no/en/Student/">
						<div className="p-4 bg-white block ml-6 text-[#01608A] md:ml-14 rounded-lg">
							<AiFillHome />
						</div>
					</Link>
					{logoutBtn && router?.asPath !== "/login" && (
						<button
							className={`bg-[#01608A] text-white px-6 flex items-center justify-center text-center text-sm py-4 rounded-xl`}
							onClick={() => handleLogout()}
						>
							Logout
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
