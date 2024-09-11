// src/views/NotFound/NotFound.js

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import animationData from "animations/404-animation.json"; // Replace with the path to your Lottie animation file

function NotFound() {
	useEffect(() => {
		AOS.init({ duration: 1500 });
	}, []);

	return (
		<div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-gray-500 to-gold-500 overflow-hidden">
			{/* Background Animated SVGs */}
			<div className="absolute inset-0">
				<Lottie
					animationData={animationData}
					loop={true}
					className="absolute top-0 left-0 w-1/3 opacity-25"
				/>
				<Lottie
					animationData={animationData}
					loop={true}
					className="absolute bottom-0 right-0 w-1/3 opacity-25"
				/>
			</div>

			{/* Main Content */}
			<div className="text-center z-10" data-aos="fade-up">
				<h1
					className="text-9xl font-extrabold text-white tracking-widest"
					data-aos="zoom-in"
					data-aos-delay="500"
				>
					404
				</h1>
				<div
					className="bg-gold-500 px-4 text-white py-[2px] text-xs rounded rotate-12 absolute top-20 left-1/2 transform -translate-x-1/2"
					data-aos="fade-down"
					data-aos-delay="1000"
				>
					Page Not Found
				</div>
				<div className="mt-5">
					<p
						className="text-white text-2xl"
						data-aos="fade-right"
						data-aos-delay="1500"
					>
						Oops! The page you're looking for doesn't exist.
					</p>
					<p
						className="text-white text-lg mt-2"
						data-aos="fade-left"
						data-aos-delay="2000"
					>
						But don't worry, you can find plenty of other things on our
						homepage.
					</p>
					<Link to="/">
						<button
							className="mt-10 p-4 bg-gold-500 text-white font-semibold rounded-full shadow-lg hover:bg-gold-400 transition duration-300 ease-in-out transform hover:-translate-y-1"
							data-aos="zoom-in"
							data-aos-delay="2500"
						>
							Go Home
						</button>
					</Link>
				</div>
			</div>

			{/* Abstract Decorative Elements */}
			<div className="absolute top-0 left-0 w-72 h-72 bg-gold-700 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
			<div className="absolute top-0 right-0 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
			<div className="absolute bottom-0 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
		</div>
	);
}

export default NotFound;
