import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Book, Member, MemberBook, PickList } from "../../common/modal";
import { validateEmail } from "../../common/utils";
import { ApplicationContext } from "../../context/application/app-context";
import { MemberContext } from "../../context/member/member-context";
import MultiSelect from "../input/select";
import TextInput from "../input/text-input";

interface MemberFormProps {
	member?: Member;
	memberBooks?: Array<MemberBook>;
}

const MemberForm = (props: MemberFormProps) => {
	const {
		name,
		email,
		selectedBooks,
		updateName,
		updateEmail,
		updateSelectedBooks,
	} = useContext(MemberContext);

	const { getMasterBooks } = useContext(ApplicationContext);

	const [disableEmail, setDisableEmail] = useState<boolean>(false);

	const [isNameError, setNameError] = useState<boolean>(false);
	const [isEmailError, setEmailError] = useState<boolean>(false);
	const [isBookError, setBookError] = useState<boolean>(false);

	const [masterBooks, setMasterBooks] = useState<Array<Book>>([]);

	const [books, setBooks] = useState<Array<PickList>>([]);

	const selectedPickListBooks = useMemo(() => {
		return selectedBooks.map((book) => book.id as number);
	}, [selectedBooks]);

	useEffect(() => {
		getMasterBooks().then((books) => {
			const bookPickList = books.map((book) => {
				return {
					key: book.id as number,
					label: book.name,
				};
			});
			setMasterBooks([...books]);
			setBooks([...bookPickList]);
		});
	}, []);

	useEffect(() => {
		if (props.member) {
			updateName(props.member.name);
			updateEmail(props.member.email);
			setDisableEmail(true);
		}
		if (props.memberBooks) {
			const selectedBooks = props.memberBooks.map((memberBook) => {
				const { id, masterBookId, ...restOfMemberBook } = memberBook;

				const book = {
					...restOfMemberBook,
					id: masterBookId,
				};

				return book;
			});
			updateSelectedBooks(selectedBooks);
		}
	}, [props.member, props.memberBooks]);

	const onEmailChange = useCallback((value: string): void => {
		updateEmail(value.trim());
		if (!value.trim() || !validateEmail(value.trim())) {
			setEmailError(true);
		} else {
			setEmailError(false);
		}
	}, []);

	const onNameChange = useCallback((value: string): void => {
		updateName(value.trim());
		if (!value.trim()) {
			setNameError(true);
		} else {
			setNameError(false);
		}
	}, []);

	const onBooksSelect = useCallback(
		(value: string[]): void => {
			const selectedBooksIds = new Set(value.map((bookId) => Number(bookId)));
			const updated = masterBooks.filter((masterBook) =>
				selectedBooksIds.has(masterBook.id as number)
			);
			updateSelectedBooks(updated);
			if (!updated.length) {
				setBookError(true);
			} else {
				setBookError(false);
			}
		},
		[masterBooks]
	);

	return (
		<>
			<div>
				<TextInput
					value={name}
					label="Name"
					onChange={onNameChange}
					error={isNameError}
				/>
			</div>
			<div>
				<TextInput
					disabled={disableEmail}
					value={email}
					label="Email"
					onChange={onEmailChange}
					error={isEmailError}
				/>
			</div>
			<div>
				<MultiSelect
					pickList={books}
					value={selectedPickListBooks}
					label="Books"
					onChange={onBooksSelect}
					error={isBookError}
				/>
			</div>
		</>
	);
};

export default MemberForm;
