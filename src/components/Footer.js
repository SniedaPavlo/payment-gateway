import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<div className="d-flex flex-col">
			<div className="w-100 px-5 py-4 bg-[#3C3C3B]">
				<div className="flex items-start md:items-center flex-col md:flex-row gap-6 text-white text-xs">
					<Link legacyBehavior href="https://www.nord.no/en/about/contact">
						<a>Contact Us</a>
					</Link>
					<Link legacyBehavior href="https://www.nord.no/en/about">
						<a>About Us</a>
					</Link>
					<Link legacyBehavior href="https://www.nord.no/en/about/privacy">
						<a>Privacy Policy</a>
					</Link>
					<Link
						legacyBehavior
						href="https://www.nord.no/en/about/privacy/cookies"
					>
						<a>Cookie Policy</a>
					</Link>
					<Link
						legacyBehavior
						href="https://www.nord.no/en/about/rules-regulations/Documents/Regulations-relating-to-studies-and-examinations-at-Nord-University-jan-21.pdf"
					>
						<a>Terms & Conditions</a>
					</Link>
					<Link
						legacyBehavior
						href="https://www.nord.no/en/about/contact/report-misconduct/Pages/default.aspx"
					>
						<a>Report Misconduct</a>
					</Link>
					<Link
						legacyBehavior
						href="https://www.nord.no/en/studies/admission/frequently-asked-questions"
					>
						<a>FAQs</a>
					</Link>
					<Link
						legacyBehavior
						href="https://www.nord.no/en/studies/admission/country/india"
					>
						<a>India</a>
					</Link>
				</div>
			</div>
			<div className="w-100 px-5 py-4 bg-[#1A1916] text-white text-center text-xs">
				Office Address: Universitetsalléen 11 8026 Bodø | Mail Address: Post box
				1490 8049 Bodø
			</div>
		</div>
	);
};

export default Footer;
