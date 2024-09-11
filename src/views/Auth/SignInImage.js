import React from "react";
import { Box } from "@chakra-ui/react";
import signInImage from "assets/img/BgSignUpg.png";

function SignInImage() {
	return (
		<Box
			display={{ base: "none", md: "block" }}
			overflowX="hidden"
			h="100%"
			w="40vw"
			position="absolute"
			right="0px"
		>
			<Box
				bgImage={signInImage}
				w="100%"
				h="100%"
				bgSize="cover"
				bgPosition="50%"
				position="absolute"
				borderBottomLeftRadius="20px"
			></Box>
		</Box>
	);
}

export default SignInImage;
