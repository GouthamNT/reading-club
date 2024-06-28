import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BooksAPI } from "../../API/books-api";
import { Book, Member, MemberBook, PickList } from "../../common/modal";
import MultiSelect from "../input/select";
import TextInput from "../input/text-input";
import TextButton from "../button/text-button";
import { MembersApi } from "../../API/members-api";
import { MemberContext } from "../../context/member/member-context";

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

	const [disableEmail, setDisableEmail] = useState<boolean>(false);

	const [masterBooks, setMasterBooks] = useState<Array<Book>>([]);

	const [books, setBooks] = useState<Array<PickList>>([]);

	const selectedPickListBooks = useMemo(() => {
		return selectedBooks.map((book) => book.id as number);
	}, [selectedBooks])

	const booksAPI = useMemo(() => BooksAPI.getInstance(), []);
	const membersAPI = useMemo(() => MembersApi.getInstance(), []);
	useEffect(() => {
		booksAPI.getMasterBooks().then((books) => {
			const bookPickList = books.map((book) => {
				return {
					key: book.id as number,
					label: book.name
				}
			})
			setMasterBooks([...books]);
			setBooks([...bookPickList]);
		});

	}, [booksAPI])

	useEffect(() => {
		if (props.member) {
			updateName(props.member.name);
			updateEmail(props.member.email);
			setDisableEmail(true);
		}
		if (props.memberBooks) {
			const selectedBooks = props.memberBooks.map((memberBook) => {
				const {id, masterBookId, ...restOfMemberBook } = memberBook;

				const book = {
					...restOfMemberBook,
					id: masterBookId
				}

				return book;
			})
			updateSelectedBooks(selectedBooks);
		}
	}, [props.member, props.memberBooks])

	const onEmailChange = useCallback((value: string): void => {
		updateEmail(value);
	}, []);

	const onNameChange = useCallback((value: string): void => {
		updateName(value);
	}, []);


	const onBooksSelect = useCallback((value: string[]): void => {
		const selectedBooksIds = new Set(value.map((bookId) => Number(bookId)));
		updateSelectedBooks(
			masterBooks.filter((masterBook) => selectedBooksIds.has(masterBook.id as number))
		);
	}, [masterBooks]);


	return (
		<>
			<div>
				<TextInput value={name} label="Name" onChange={onNameChange} />
			</div>
			<div>
				<TextInput disabled={disableEmail} value={email} label="Email" onChange={onEmailChange} />
			</div>
			<div>
				<MultiSelect pickList={books} value={selectedPickListBooks} label="Books" onChange={onBooksSelect}/>
			</div>
		</>
	);
};

export default MemberForm;
