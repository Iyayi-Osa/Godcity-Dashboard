// Sermons.jsx
import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

const Sermons = ({ title, data }) => {
	// Get the last sermon
	const lastSermon = data[data.length - 1];

	return (
		<Card
			p="24px"
			borderWidth="1px"
			borderRadius="32px"
			bg="slate"
			w="full"
			h="full"
		>
			<CardHeader>
				<Text fontSize="2xl" mb="4" fontWeight="bold">
					{title}
				</Text>
			</CardHeader>
			<CardBody>
				{lastSermon && (
					<Box mb="6" borderBottom="1px" borderColor="gray.200" pb="4">
						<Image src={lastSermon.image} borderRadius="15px" mb="4" />
						<Text fontSize="xl" fontWeight="bold">
							{lastSermon.title}
						</Text>
						<Text mb="2">
							<strong>Speaker:</strong> {lastSermon.speaker}
						</Text>
						<Text mb="2">
							<strong>Date:</strong> {lastSermon.date}
						</Text>
						<Text mb="4">{lastSermon.description}</Text>
						{/* Add audio or video player here if needed */}
					</Box>
				)}
			</CardBody>
		</Card>
	);
};

export default Sermons;
