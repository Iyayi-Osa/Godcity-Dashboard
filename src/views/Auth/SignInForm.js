import React, { useState } from "react";
import {
	FormControl,
	FormLabel,
	Input,
	Switch,
	Text,
	Button,
	Flex,
	Link,
    Heading,
    useColorModeValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function SignInForm({ onSubmit }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
    const textColor = useColorModeValue("gray.400", "white");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(email, password, rememberMe);
	};

	return (
		<Flex
			direction="column"
			w="100%"
			background="transparent"
			p="48px"
			mt={{ md: "150px", lg: "80px" }}
			as="form"
			onSubmit={handleSubmit}
		>
			<Heading color="primary.DEFAULT" fontSize="32px" mb="10px">
				Welcome Back to GodCi†y
			</Heading>
			<Text
				mb="36px"
				ms="4px"
				color={textColor}
				fontWeight="bold"
				fontSize="14px"
			>
				Enter your email and password to sign in
			</Text>
			<FormControl>
				<FormLabel ms="4px" fontSize="sm" fontWeight="normal">
					Email
				</FormLabel>
				<Input
					borderRadius="15px"
					mb="24px"
					fontSize="sm"
					type="email"
					placeholder="Your email address"
					size="lg"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<FormLabel ms="4px" fontSize="sm" fontWeight="normal">
					Password
				</FormLabel>
				<Input
					borderRadius="15px"
					mb="36px"
					fontSize="sm"
					type="password"
					placeholder="Your password"
					size="lg"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<FormControl display="flex" alignItems="center">
					<Switch
						id="remember-login"
						colorScheme="yellow"
						me="10px"
						isChecked={rememberMe}
						onChange={(e) => setRememberMe(e.target.checked)}
					/>
					<FormLabel htmlFor="remember-login" mb="0" ms="1" fontWeight="normal">
						Remember me
					</FormLabel>
				</FormControl>
				<Button
					fontSize="10px"
					type="submit"
					bg="primary.DEFAULT"
					w="100%"
					h="45"
					mb="20px"
					color="white"
					mt="20px"
					_hover={{ bg: "primary.dark" }}
					_active={{ bg: "yellow" }}
				>
					SIGN IN
				</Button>
			</FormControl>
			<Flex
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				maxW="100%"
				mt="0px"
			>
				<Text fontWeight="medium">
					Don't have an account?
					<NavLink to="/auth/signup">
						<Link
							ml="5px"
							fontWeight="bold"
							color="#c0a700"
							_hover={{ color: "#e0c100" }}
						>
							Sign Up
						</Link>
					</NavLink>
				</Text>
			</Flex>
		</Flex>
	);
}

export default SignInForm;
