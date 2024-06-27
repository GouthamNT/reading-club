import { useState } from "react";
import { Book } from "../../common/modal";
import MultiSelect from "../input/select";
import TextInput from "../input/text-input";

const MemberForm = () => {
	const [email, setEmail] = useState<string>("");

	const [selectedBooks, setSelectedBooks] = useState<Array<Book>>([]);

	const onEmailChange = (value: string): void => {
		setEmail(value);
	};

	const onBooksSelect = (value: string[]): void => {
		setSelectedBooks([]);
	};

	return (
		<>
			<div>
				<TextInput value={email} label="Email" onChange={onEmailChange} />
			</div>
			<div>
				<MultiSelect pickList={[]} value={[]} onChange={onBooksSelect}/>
			</div>
		</>
	);
};

export default MemberForm;
