import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import bgHero from "assets/img/hero.jpg";
import { useAuth } from "context/AuthContext";
import { useHistory } from "react-router-dom";

const Home = () => {
	useEffect(() => {
		AOS.init({ duration: 1000 });
	}, []);
	const { user } = useAuth();
	const history = useHistory();

	useEffect(() => {
		if (user) {
			history.push("/admin/dashboard");
		}
	}, [user, history]);

	return (
		<Box overflow="hidden">
			<Box
				as="section"
				display="flex"
				flexDirection="column"
				bgImage={bgHero}
				bgSize="cover"
				minHeight="100vh"
				textAlign="center"
				color={{ base: "text.DEFAULT", dark: "text.dark" }}
				py="20"
				justifyContent="center"
				alignItems="center"
			>
				<Box
					bgColor="rgba(0, 0, 0, 0.25)"
					m="4"
					p="8"
					borderRadius="3xl"
					color="text.dark"
				>
					<Heading
						fontSize={{
							base: "3xl",
						}}
						fontWeight="bold"
						mb="4"
						data-aos="fade-up"
					>
						Welcome to GodCi†y
					</Heading>
					<Text
						fontSize={{
							base: "base",
						}}
						mb="8"
						data-aos="fade-up"
						data-aos-delay="100"
					>
						Unify. Serve. Inspire.
					</Text>
					<Text
						p="10"
						fontSize={{
							base: "lg",
						}}
						fontStyle="italic"
						fontWeight="light"
						data-aos="fade-up"
						data-aos-delay="200"
					>
						"For where two or three gather in my name, there am I with them." –
						Matthew 18:20
					</Text>
					<Link
						as={NavLink}
						to="/auth/signin"
						bg="primary.DEFAULT"
						color="white"
						fontSize={{
							base: "sm",
						}}
						px={{
							base: "4",
						}}
						py={{ base: "5" }}
						borderRadius="full"
						_hover={{ bg: "primary.dark" }}
						transition="background-color 0.2s"
						data-aos="fade-up"
						data-aos-delay="300"
						display="inline-block"
					>
						Get Started
					</Link>
				</Box>
			</Box>
		</Box>
	);
};

export default Home;
