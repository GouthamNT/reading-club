import { useCallback, useEffect, useMemo, useState } from "react";
import { BooksAPI } from "../../API/books-api";
import { Book, Member, MemberBook, PickList } from "../../common/modal";
import MultiSelect from "../input/select";
import TextInput from "../input/text-input";
import TextButton from "../button/text-button";
import { MembersApi } from "../../API/members-api";

interface MemberFormProps {
	member?: Member;
	memberBooks?: Array<MemberBook>;
}

const MemberForm = (props: MemberFormProps) => {

	const [name, setName] = useState<string>("");

	const [disableEmail, setDisableEmail] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");

	const [selectedBooks, setSelectedBooks] = useState<Array<Book>>([]);

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
			setName(props.member.name);
			setEmail(props.member.email);
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
			setSelectedBooks(selectedBooks);
		}
	}, [props.member, props.memberBooks])

	const onEmailChange = useCallback((value: string): void => {
		setEmail(value);
	}, []);

	const onNameChange = useCallback((value: string): void => {
		setName(value);
	}, []);


	const onBooksSelect = useCallback((value: string[]): void => {
		const selectedBooksIds = new Set(value.map((bookId) => Number(bookId)));
		setSelectedBooks(
			masterBooks.filter((masterBook) => selectedBooksIds.has(masterBook.id as number))
		);
	}, [masterBooks]);

	const create = useCallback(async () => {
		const imgId = Math.floor(Math.random() * 1000) + 1;
		const createdMember = await membersAPI.createMember({
			email,
			name,
			img: `https://picsum.photos/id/${imgId}/200`,
			membershipStartDate: Date.now().toLocaleString(),
		});
		const memberBooks = selectedBooks.map((book) => {
			const { id, ...restOfBook } = book;
			const memberBook: MemberBook = {
				...restOfBook,
				masterBookId: id as number ,
				memberId: createdMember.id as number
			}
			return memberBook;
		});
		for (let i = 0; i < memberBooks.length; i++) {
			await booksAPI.createMemberBook(createdMember.id as number, memberBooks[i])
		}
	}, [email, name, selectedBooks, booksAPI, membersAPI])

	const updateBooks = useCallback(async () => {
		const memberBooks = props.memberBooks || [];
		const selectedBooksIds = new Set(selectedBooks.map((book) => book.id));
		const memberBooksToDelete = memberBooks.filter((memberBook) => {
			return !selectedBooksIds.has(memberBook.masterBookId);
		}).map((memberBook) => memberBook.id as number);
		const memberMasterBookIds = new Set(memberBooks.map((memberBook) => memberBook.masterBookId));
		const memberBooksToAdd = selectedBooks.filter((book) => {
			return !memberMasterBookIds.has(book.id as number)
		}).map((book) => {
			const { id, ...restOfBook } = book;
			const memberBook: MemberBook = {
				...restOfBook,
				masterBookId: id as number ,
				memberId: props.member?.id as number
			}
			return memberBook;
		});
		for (let i = 0; i < memberBooksToAdd.length; i++) {
			await booksAPI.createMemberBook(props.member?.id as number, memberBooksToAdd[i]);
		}

		for (let i = 0; i < memberBooksToDelete.length; i++) {
			await booksAPI.deleteMemberBook(memberBooksToDelete[i]);
		}
	}, [props.member, props.memberBooks, selectedBooks, booksAPI]);

	const save = useCallback(async () => {

		if (props.member?.id) {
			updateBooks();
		} else {
			create();
		}
	}, [props.member, create, updateBooks])


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
			<div>
				<TextButton label="save" onClick={save} />
			</div>
		</>
	);
};

export default MemberForm;
