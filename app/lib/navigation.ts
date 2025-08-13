export const navigationConfig = [
	{ label: "HOME", link: "/" },
	{ label: "ABOUT", link: "/about" },
	{ 
		label: "MANAGE EVENTS", 
		link: "/admin/events", 
		requiresAuth: true, 
		requiresAdmin: true,
		requiresExec: true,
	},
	// Add more items here
];