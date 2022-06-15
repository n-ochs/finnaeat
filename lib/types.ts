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
	itemTitle: string;
	itemDescription: string;
	itemPrice?: string;
	imgSrc?: string;
	imgPath?: string;
};

export type IPlaceholderFoodMenuData = {
	title: string;
	items: { name: string; description: string; price: string }[];
};

export type IPreparedFoodMenuData = {
	category: string;
	items: { name: string; description: string; price: string; imgUrl: string; imgPath: string; isNewInd?: boolean }[];
}[];

export type INewMenuItem = {
	name: string;
	description: string;
	price: string;
	imgUrl: string;
	imgPath: string;
	isNewInd?: boolean;
};
