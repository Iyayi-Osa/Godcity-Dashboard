// Events.jsx
import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

const Events = ({ title, data }) => {
	// Get the latest event
	const latestEvent = data[data.length - 1];

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
				{latestEvent && (
					<Box mb="6" borderBottom="1px" borderColor="gray.200" pb="4">
						{/* <Image src={latestEvent.bannerUrl} borderRadius="15px" mb="4" /> */}
						<Text fontSize="xl" fontWeight="bold">
							{latestEvent.title}
						</Text>
						<Text mb="2">
							<strong>Date:</strong> {new Date(latestEvent.date).toLocaleDateString()}
						</Text>
						<Text mb="2">
							<strong>Type:</strong> {latestEvent.type}
						</Text>
						<Text mb="4">{latestEvent.description}</Text>
					</Box>
				)}
			</CardBody>
		</Card>
	);
};

export default Events;
