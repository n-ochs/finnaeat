export type IMenuCategory = {
	title: string;
	items: { name: string; description: string; price: string }[];
};

export type IRawMenuData = {
	category?: string;
	description?: string;
	img_url?: string;
	name?: string;
	order?: number;
	price?: string;
}[];

export type IPreparedMenuData = {
	category: string;
	items: { name?: string; description?: string; price?: string; order?: number; img_url?: string }[];
}[];
