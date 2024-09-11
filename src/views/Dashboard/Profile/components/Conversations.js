import React from "react";
import {
	Avatar,
	Button,
	Flex,
	Text,
	useColorModeValue,
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";

const Conversations = ({ title, isAdmin }) => {
	// Chakra color mode
	const textColor = useColorModeValue("gray.700", "white");

	// Sample conversations data
	const conversations = [
		{
			id: 1,
			name: "Sophie B.",
			message: "Hi! I need more information...",
			avatar: avatar2,
		},
		{
			id: 2,
			name: "John D.",
			message: "Awesome work, can you change...",
			avatar: avatar3,
		},
		{
			id: 3,
			name: "Michael P.",
			message: "Have a great afternoon...",
			avatar: avatar4,
		},
		{
			id: 4,
			name: "Jessica R.",
			message: "About files I can...",
			avatar: avatar5,
		},
		{
			id: 5,
			name: "Emma W.",
			message: "Can we meet tomorrow...",
			avatar: avatar6,
		},
	];

	return (
		<Card p="16px">
			<CardHeader p="12px 5px" mb="12px">
				<Text fontSize="lg" color={textColor} fontWeight="bold">
					{title}
				</Text>
			</CardHeader>
			<CardBody px="5px">
				<Flex direction="column" w="100%">
					{conversations.map((conversation) => (
						<Flex
							justifyContent="space-between"
							mb="21px"
							key={conversation.id}
						>
							<Flex align="center">
								<Avatar
									src={conversation.avatar}
									w="50px"
									h="50px"
									borderRadius="15px"
									me="10px"
								/>
								<Flex direction="column">
									<Text fontSize="sm" color={textColor} fontWeight="bold">
										{conversation.name}
									</Text>
									<Text fontSize="xs" color="gray.500" fontWeight="400">
										{conversation.message}
									</Text>
								</Flex>
							</Flex>
							<Flex align="center">
								<Button p="0px" bg="transparent" variant="no-hover" me="8px">
									<Text
										fontSize="sm"
										fontWeight="600"
										color="gold.300"
										alignSelf="center"
									>
										REPLY
									</Text>
								</Button>
								{isAdmin && (
									<Menu>
										<MenuButton
											as={IconButton}
											aria-label="Options"
											icon={<FiMoreVertical />}
											variant="ghost"
											colorScheme="gold"
										/>
										<MenuList>
											<MenuItem>Delete</MenuItem>
											<MenuItem>Archive</MenuItem>
											<MenuItem>Mark as Read</MenuItem>
										</MenuList>
									</Menu>
								)}
							</Flex>
						</Flex>
					))}
				</Flex>
			</CardBody>
		</Card>
	);
};

export default Conversations;
