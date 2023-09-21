export interface IContact {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
};

export interface IPagination {
	page: number;
	companyId?: number;
	countryId?: number;
	query?: string;
}

export interface ISearch {
	isEven: boolean | any;
	search: string;
}

export interface ISelectedContact {
	isSelected: boolean;
	data: IContact | null;
}

export interface IModalState {
	isOpen?: boolean;
	type?: string;
}