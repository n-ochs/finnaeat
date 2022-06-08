export type IContactInformationData = {
	email: string;
	phone: string;
};

export type ISocialLinksData = {
	facebook: string;
	instagram: string;
	tiktok: string;
};

export type IPlaceholderFoodMenuData = {
	title: string;
	items: { name: string; description: string; price: string }[];
};

export type IPreparedFoodMenuData = {
	category: string;
	items: { name: string; description: string; price: string; order: number; img_url: string }[];
}[];
