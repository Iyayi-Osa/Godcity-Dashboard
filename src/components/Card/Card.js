import { Box, useColorModeValue, useStyleConfig } from "@chakra-ui/react";
function Card(props) {
	const { variant, children, ...rest } = props;
	const styles = useStyleConfig("Card", { variant });
	// Pass the computed styles into the `__css` prop
	const bgColor = useColorModeValue("gray.50", "gray.700");

	return (
		<Box __css={styles} {...rest} bgColor={bgColor} w="full" h="full">
			{children}
		</Box>
	);
}

export default Card;
