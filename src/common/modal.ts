export interface PickList {
	key: string | number;
	label: string | number;
}

export interface Member {
	id?: number;
	name: string;
	email: string;
	img: string;
	membershipStartDate: string;
}

export interface Book {
	id?: number;
	name: string;
}

export interface MemberBook extends Book {
	masterBookId: number;
	memberId: number;
}