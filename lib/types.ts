export type IContactInformationData = {
	email: string;
	phone: string;
};

export type ISocialLinksData = {
	facebook: string;
	instagram: string;
	tiktok: string;
};

export type IMenuCardProps = {
	imgSrc?: string;
	itemTitle: string;
	itemDescription: string;
	itemPrice?: string;
};

export type IPlaceholderFoodMenuData = {
	title: string;
	items: { name: string; description: string; price: string }[];
};

export type IPreparedFoodMenuData = {
	category: string;
	items: { name: string; description: string; price: string; imgUrl: string }[];
}[];

export type INewMenuItem = {
	name: string;
	description: string;
	price: string;
	imgUrl: string;
};
