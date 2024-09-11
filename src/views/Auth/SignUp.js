import React, { useState } from "react";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Icon,
	Input,
	Link,
	Switch,
  Heading,
	Text,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { NavLink, useHistory } from "react-router-dom";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import BgSignUp from "assets/img/BgSignUpg.png";
import { BACKEND_URL } from "backendurl";



function SignUp() {
	const titleColor = useColorModeValue("gold.300", "gold.200");
	const textColor = useColorModeValue("gray.700", "white");
  const subtitleColor = useColorModeValue("gray.400", "white");
	const bgColor = useColorModeValue("white", "gray.700");
	const bgIcons = useColorModeValue("gold.200", "rgba(255, 255, 255, 0.5)");

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [demographics, setDemographics] = useState("");
	const [affiliation, setAffiliation] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

	const toast = useToast();

	const handleSubmit = async (e) => {

		e.preventDefault();

		try {
			const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					password,
					phone,
					address,
					demographics,
					affiliation,
				}),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();

			if (data.token) {
				toast({
					title: "Registration successful.",
					description: "You have successfully registered.",
					status: "success",
					duration: 5000,
					isClosable: true,
				});

				// Login immediately after registration
				const loginResponse = await fetch(`${BACKEND_URL}/api/auth/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						password,
					}),
				});

				if (!loginResponse.ok) {
					throw new Error("Login failed after registration.");
				}

				const loginData = await loginResponse.json();
				console.log(loginData);
				localStorage.setItem("USER", loginData.data);

				// const data = await response.json();

				// if (data.responseCode=200 && data) {

				if ((loginData.responseCode = 200 && data)) {
					toast({
						title: "Login successful.",
						description: "You have been logged in.",
						status: "success",
						duration: 5000,
						isClosable: true,
					});

					// Redirect to dashboard
					window.location.href = "/#/admin/dashboard";
				} else {
					toast({
						title: "Login failed.",
						description: loginData.message,
						status: "error",
						duration: 5000,
						isClosable: true,
					});
				}
			} else {
				toast({
					title: "Registration failed.",
					description: data.message,
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
		<Flex
			direction="column"
			alignSelf="center"
			justifySelf="center"
			overflow="hidden"
		>
			<Box
				position="absolute"
				minH={{ base: "70vh", md: "50vh" }}
				w={{ md: "calc(100vw - 50px)" }}
				borderRadius={{ md: "15px" }}
				left="0"
				right="0"
				bgRepeat="no-repeat"
				overflow="hidden"
				zIndex="-1"
				top="0"
				bgImage={BgSignUp}
				bgSize="cover"
				mx={{ md: "auto" }}
				mt={{ md: "14px" }}
			></Box>
			<Flex
				direction="column"
				textAlign="center"
				justifyContent="center"
				align="center"
				mt="6.5rem"
				mb="30px"
			>
				<Heading color="white" fontSize="32px" mb="10px">
					Welcome to GodCi†y
				</Heading>
				<Text
					mb="36px"
					ms="4px"
          width='400px'
					color='white'
					fontWeight="normal"
					fontSize="18px"
				>
					Join our community by creating a new account or log in to manage your
					existing one.
				</Text>
			</Flex>
			<Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
				<Flex
					direction="column"
					w="445px"
					background="transparent"
					borderRadius="15px"
					p="40px"
					mx={{ base: "100px" }}
					bg={bgColor}
					boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
				>
					<Text
						fontSize="xl"
						color="primary.DEFAULT"
						fontWeight="bold"
						textAlign="center"
						mb="22px"
					>
						Register With
					</Text>
					<HStack
						spacing="15px"
						justify="center"
						mb="22px"
						color="primary.DEFAULT"
					>
						<Flex
							justify="center"
							align="center"
							w="75px"
							h="75px"
							borderRadius="15px"
							border="1px solid lightgray"
							cursor="pointer"
							transition="all .25s ease"
							_hover={{
								filter: "brightness(120%)",
								bg: "primary.DEFAULT",
								color: "white",
							}}
						>
							<Link href="#">
								<Icon
									as={FaFacebook}
									w="30px"
									h="30px"
									_hover={{ filter: "brightness(120%)" }}
								/>
							</Link>
						</Flex>
						<Flex
							justify="center"
							align="center"
							w="75px"
							h="75px"
							borderRadius="15px"
							border="1px solid lightgray"
							cursor="pointer"
							transition="all .25s ease"
							_hover={{
								filter: "brightness(120%)",
								bg: "primary.DEFAULT",
								color: "white",
							}}
						>
							<Link href="#">
								<Icon
									as={FaApple}
									w="30px"
									h="30px"
									_hover={{ filter: "brightness(120%)" }}
								/>
							</Link>
						</Flex>
						<Flex
							justify="center"
							align="center"
							w="75px"
							h="75px"
							borderRadius="15px"
							border="1px solid lightgray"
							cursor="pointer"
							transition="all .25s ease"
							_hover={{
								filter: "brightness(120%)",
								bg: "primary.DEFAULT",
								color: "white",
							}}
						>
							<Link href="#">
								<Icon
									as={FaGoogle}
									w="30px"
									h="30px"
									_hover={{ filter: "brightness(120%)" }}
								/>
							</Link>
						</Flex>
					</HStack>
					<Text
						fontSize="lg"
						color="gray.400"
						fontWeight="bold"
						textAlign="center"
						mb="22px"
					>
						or
					</Text>
					<form onSubmit={handleSubmit}>
						<FormControl>
							<FormLabel ms="4px" fontSize="sm" fontWeight="normal">
								Name
							</FormLabel>
							<Input
								fontSize="sm"
								ms="4px"
								borderRadius="15px"
								type="text"
								placeholder="Your full name"
								mb="24px"
								size="lg"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<FormLabel ms="4px" fontSize="sm" fontWeight="normal">
								Email
							</FormLabel>
							<Input
								fontSize="sm"
								ms="4px"
								borderRadius="15px"
								type="email"
								placeholder="Your email address"
								mb="24px"
								size="lg"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<FormLabel ms="4px" fontSize="sm" fontWeight="normal">
								Password
							</FormLabel>
							<Input
								fontSize="sm"
								ms="4px"
								borderRadius="15px"
								type="password"
								placeholder="Your password"
								mb="24px"
								size="lg"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<FormLabel ms="4px" fontSize="sm" fontWeight="normal">
								Phone
							</FormLabel>
							<Input
								fontSize="sm"
								ms="4px"
								borderRadius="15px"
								type="text"
								placeholder="Your phone number"
								mb="24px"
								size="lg"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
							<FormLabel ms="4px" fontSize="sm" fontWeight="normal">
								Address
							</FormLabel>
							<Input
								fontSize="sm"
								ms="4px"
								borderRadius="15px"
								type="text"
								placeholder="Your address"
								mb="24px"
								size="lg"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
							<FormLabel ms="4px" fontSize="sm" fontWeight="normal">
								Demographics
							</FormLabel>
							<Input
								fontSize="sm"
								ms="4px"
								borderRadius="15px"
								type="text"
								placeholder="Your demographics"
								mb="24px"
								size="lg"
								value={demographics}
								onChange={(e) => setDemographics(e.target.value)}
							/>
							<FormLabel ms="4px" fontSize="sm" fontWeight="normal">
								Affiliation
							</FormLabel>
							<Input
								fontSize="sm"
								ms="4px"
								borderRadius="15px"
								type="text"
								placeholder="Your affiliation"
								mb="24px"
								size="lg"
								value={affiliation}
								onChange={(e) => setAffiliation(e.target.value)}
							/>
							<FormControl display="flex" alignItems="center" mb="24px">
								<Switch
									id="remember-login"
									colorScheme="yellow"
									me="10px"
									isChecked={rememberMe}
									onChange={() => setRememberMe(!rememberMe)}
								/>
								<FormLabel
									htmlFor="remember-login"
									mb="0"
									ms="1"
									fontWeight="normal"
								>
									Remember me
								</FormLabel>
							</FormControl>
							<Button
								type="submit"
								bg="primary.DEFAULT"
								fontSize="10px"
								color="white"
								fontWeight="bold"
								w="100%"
								h="45"
								mb="24px"
								_hover={{
									bg: "primary.dark",
								}}
								_active={{
									bg: "yellow",
								}}
							>
								SIGN UP
							</Button>
						</FormControl>
					</form>
					<Flex
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						maxW="100%"
						mt="0px"
					>
						<Text color={textColor} fontWeight="medium">
							Already have an account?
							<NavLink to="/auth/signin">
								<Link
									ml="5px"
									fontWeight="bold"
									color="#c0a700"
									_hover={{ color: "#e0c100" }}
								>
									Sign In
								</Link>
							</NavLink>
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default SignUp;
