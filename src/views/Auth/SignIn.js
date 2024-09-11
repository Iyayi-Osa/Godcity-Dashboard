import React, { useState } from "react";
import {
	Box,
	Flex,
	Button,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { NavLink, useHistory } from "react-router-dom";
import SignInForm from "./SignInForm";
import SignInImage from "./SignInImage";
import { useAuth } from "context/AuthContext";
import { BACKEND_URL } from "backendurl";
import Cookies from "js-cookie";

function SignIn() {
	const titleColor = useColorModeValue("gold.300", "gold.200");
	const toast = useToast();
	const history = useHistory();
	const { login } = useAuth();
	
	const handleSubmit = async (email, password, rememberMe) => {
		try {
			const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (response.ok && data.responseCode === 200) {
				const { user, token } = data.data;

				// Store token and user information in cookies
				Cookies.set("USER", JSON.stringify(user), { expires: rememberMe ? 7 : null });
				Cookies.set("TOKEN", token, { expires: rememberMe ? 7 : null });

				// Call your login function to update the context/state
				login(user);

				toast({
					title: "Login successful.",
					description: "You have successfully logged in.",
					status: "success",
					duration: 5000,
					isClosable: true,
				});

				history.push("/admin/dashboard"); // Navigate to the dashboard
			} else {
				toast({
					title: "Login failed.",
					description: data.msg || "Invalid credentials.",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			}
		} catch (error) {
			toast({
				title: "An error occurred.",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};
	

	return (
		<Flex position="relative" mb="40px">
			<Flex
				h={{ sm: "initial", md: "75vh", lg: "85vh" }}
				w="100%"
				maxW="1044px"
				mx="auto"
				justifyContent="space-between"
				mb="30px"
				pt={{ sm: "100px", md: "0px" }}
			>
				<Flex
					alignItems="center"
					justifyContent="start"
					style={{ userSelect: "none" }}
					w={{ base: "100%", md: "50%", lg: "42%" }}
				>
					<SignInForm onSubmit={handleSubmit} />
				</Flex>
				<SignInImage />
			</Flex>
		</Flex>
	);
}

export default SignIn;
