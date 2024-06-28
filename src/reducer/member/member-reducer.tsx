import { Book } from "../../common/modal";

interface MemberState {
	name: string;
	email: string;
	selectedBooks: Array<Book>;
	disableSave: boolean;
}

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
	  }
	| {
			actionType: "updateDisableSave";
			payload: boolean;
	  };

export const initialState: MemberState = {
	name: "",
	email: "",
	selectedBooks: [],
	disableSave: false,
};

const MemberReducer = (
	state: MemberState = initialState,
	action: Action
): MemberState => {
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
		case "updateDisableSave":
			return {
				...state,
				disableSave: action.payload,
			};
	}
	return state;
};

export default MemberReducer;
