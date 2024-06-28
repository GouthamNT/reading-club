import { Book } from "../../common/modal";

interface MemberState {
	name: string;
	email: string;
	selectedBooks: Array<Book>;
}

type actionType = "updateName" | "updateEmail" | "updateSelectedBooks";

type Action =
	| {
			actionType: "updateName";
			payload: string;
	  }
	| {
			actionType: "updateEmail";
			payload: string;
	  }
	| {
			actionType: "updateSelectedBooks";
			payload: Array<Book>;
	  };

export const initialState: MemberState = {
	name: "",
	email: "",
	selectedBooks: []
}

const MemberReducer = (state: MemberState = initialState, action: Action): MemberState => {
	switch (action.actionType) {
		case "updateName":
			return {
				...state,
				name: action.payload,
			};
		case "updateEmail":
			return {
				...state,
				email: action.payload,
			};
		case "updateSelectedBooks":
			return {
				...state,
				selectedBooks: [...action.payload],
			};
	}
	return state;
};

export default MemberReducer;