import avatar2 from "assets/img/avatars/avatar2.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import imageArchitect1 from "assets/img/ImageArchitect1.png";
import imageArchitect2 from "assets/img/ImageArchitect2.png";
import imageArchitect3 from "assets/img/ImageArchitect3.png";

export const requests = [
	{
		id: 1,
		image: imageArchitect1,
		name: "Prayer Request #1",
		category: "Urgent",
		description: "Please pray for my family member who is going through a tough time.",
		unit: "Choir",
		community: "North",
		status: "Pending",
		attended: false,
		avatars: [avatar2, avatar4, avatar6],
		userId: "userId1",
	},
	{
		id: 2,
		image: imageArchitect2,
		name: "Prayer Request #2",
		category: "Healing",
		description: "Please pray for my friend who is recovering from an illness.",
		unit: "Usher",
		community: "South",
		status: "Pending",
		attended: true,
		avatars: [avatar4, avatar2, avatar6, avatar4],
		userId: "userId2",
	},
	{
		id: 3,
		image: imageArchitect3,
		name: "Prayer Request #3",
		category: "Guidance",
		description: "Please pray for me as I make an important decision in my life.",
		unit: "Technical",
		community: "East",
		status: "Resolved",
		attended: true,
		avatars: [avatar2, avatar4, avatar6],
		userId: "userId3",
	},
];
