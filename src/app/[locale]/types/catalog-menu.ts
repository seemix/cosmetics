export interface IMenuItem {
	title: string;
	slug?: string;
	id: string;
	uri: string;
	sub?: IMenuItem[];
}
