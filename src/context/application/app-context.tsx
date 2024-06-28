import { Dispatch, SetStateAction, createContext } from "react";
import { Book, Member, MemberBook } from "../../common/modal";

export interface ApplicationContextState {
	isLoggedIn: boolean;
	members: Array<Member>;
	memberBooks: Map<number, Array<MemberBook>>;
	masterBooks: Array<Book>;
	setLoggedIn: Dispatch<SetStateAction<boolean>>;
	createMembers: (member: Member) => Promise<Member>;
	getMembers: () => Promise<Array<Member>>;
	getMasterBooks: () => Promise<Array<Book>>;
	updateMember: (memberId: number, member: Member) => Promise<Member>;
	deleteMember: (memberId: number) => Promise<void>;
	getMemberBooks: (memberId: number) => Promise<Array<MemberBook>>;
	updateMemberBooks: (
		memberId: number,
		memberBooksToAdd: Array<MemberBook>,
		memberBooksToDelete: Array<number>
	) => Promise<Array<MemberBook>>;
}

export const ApplicationContext = createContext<ApplicationContextState>({} as ApplicationContextState);
