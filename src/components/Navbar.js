import Image from "next/image";
import React from "react";

const Navbar = () => {
	return (
		<div className="w-full px-1 md:px-8 py-4">
			<Image
				src="/mu.png"
				width={222}
				height={59}
				alt="McMine University Logo"
			/>
		</div>
	);
};

export default Navbar;
