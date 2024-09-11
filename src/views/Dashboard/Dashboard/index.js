import React, { useEffect, useState } from "react";
import { Flex, Grid, SimpleGrid, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "context/AuthContext";
import { BACKEND_URL } from "backendurl";
import Sermons from "./components/Sermons";
import Events from "./components/Events"; // Import the new Events component

export default function Dashboard() {
	const [memberCount, setMemberCount] = useState(0);
	const { isAdmin } = useAuth();
	const [sermons, setSermons] = useState([]);
	const [events, setEvents] = useState([]); // State for events
	const toast = useToast();

	useEffect(() => {
		let isMounted = true;

		// Fetch members
		axios
			.get(`${BACKEND_URL}/api/members`)
			.then((response) => {
				if (isMounted && response.data.responseCode === 200) {
					setMemberCount(response.data.count);
				} else {
					console.error("Failed to fetch member data");
				}
			})
			.catch((error) => {
				console.error("Error fetching member data:", error);
			});

		// Fetch sermons
		const fetchSermons = async () => {
			try {
				const response = await axios.get(`${BACKEND_URL}/api/resources/all`);
				if (isMounted) {
					setSermons(response.data.data);
				}
			} catch (error) {
				toast({
					title: "Error fetching sermons.",
					description: error.message,
					status: "error",
					duration: 5000,
					isClosable: true,
				});
				setSermons(mockSermons);
			}
		};
		fetchSermons();

		// Fetch events
		const fetchEvents = async () => {
			try {
				const response = await axios.get(`${BACKEND_URL}/api/events`);
				if (isMounted) {
					setEvents(response.data);
				}
			} catch (error) {
				toast({
					title: "Error fetching events.",
					description: error.message,
					status: "error",
					duration: 5000,
					isClosable: true,
				});
				setEvents(dashboardTableData); // Fallback data if fetching fails
			}
		};
		fetchEvents();

		return () => {
			isMounted = false;
		};
	}, [toast]);

	return (
		<Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
			{/* Existing Grid and SimpleGrid components */}
			<Grid
				templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
				templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
				gap="24px"
				mb={{ lg: "26px" }}
			>
				{/* Conditionally render components based on user type */}
				{isAdmin && (
					<>
						<ActiveUsers
							title={"Church Growth / Users"}
							percentage={23}
							chart={<BarChart />}
						/>
						<SalesOverview
							title={"Payment: Tithe and Offerings / Donations"}
							percentage={5}
							chart={<LineChart />}
						/>
					</>
				)}
				{!isAdmin && (
					<>
						<Sermons
							title={"Latest Sermon"}
							data={sermons} // Pass sermon data here
						/>
						<Events
							title={"Latest Event"}
							data={events} // Pass event data here
						/>
					</>
				)}
			</Grid>
		</Flex>
	);
}
