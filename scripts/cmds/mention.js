module.exports = {
	config: {
		name: "mention",
		version: "1.2",
		author: "xalman",
		role: 0,
		shortDescription: {
			en: "Reply when specific user is mentioned"
		},
		category: "owner"
	},

	onStart: async function () {},

	onChat: async function ({ api, event }) {
		const bossUIDs = [
			"61590481514968",
			"61592084390757"
		];

		if (!event.mentions || typeof event.mentions !== "object")
			return;

		const mentionedIDs = Object.keys(event.mentions);

		if (mentionedIDs.some(uid => bossUIDs.includes(uid))) {
			return api.sendMessage(
				"Boss ekhon busy ache free hoye reply dibe 🫠🌷",
				"কিরে মাঙ্গের নাতি শিশির বস কে বারবার মেনশন দিস কে কইতাসি কাজে আছে একটু ব্যস্ত কথা কানে যায় না -🙄🐸🌷",
				"kaner nise akta thapor dibo👋 boss ke bar bar mention des ke re-😡",
				event.threadID,
				event.messageID
			);
		}
	}
};
