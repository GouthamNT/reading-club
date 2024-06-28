import { createContext } from "react";
import { Book, Member, MemberBook } from "../../common/modal";

interface MemberContextState {
	name: string,
	email: string,
	selectedBooks: Array<Book>,
	updateName: (name: string) => void;
	updateEmail: (email: string) => void;
	updateSelectedBooks: (selectedBooks: Array<Book>) => void;
}

export const MemberContext = createContext({} as MemberContextState);
