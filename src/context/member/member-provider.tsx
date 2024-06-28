import { ReactNode, useReducer } from "react";
import { Book } from "../../common/modal";
import MemberReducer, { initialState } from "../../reducer/member/member-reducer";
import { MemberContext } from "./member-context";

interface MemberProviderProps {
	children: ReactNode;
}

export const MemberProvider = ({ children }: MemberProviderProps) => {

	const [state, dispatch] = useReducer(MemberReducer, initialState);

	const { name, email, selectedBooks } = state

	const updateName = (name: string) => {
		dispatch({ actionType: "updateName", payload: name});
	};

	const updateEmail = (name: string) => {
		dispatch({ actionType: "updateEmail", payload: name});
	};

	const updateSelectedBooks = (memberBooks: Array<Book>) => {

		dispatch({ actionType: "updateSelectedBooks", payload: memberBooks});
	};

	const context = {
		name,
		email,
		selectedBooks,
		updateName,
		updateEmail,
		updateSelectedBooks,
	};

	return (
		<MemberContext.Provider value={context}>{children}</MemberContext.Provider>
	);
};
