import { useEffect, useMemo, useState } from "react";
import { BooksAPI } from "../../API/books-api";
import { Book, MemberBook, PickList } from "../../common/modal";
import MultiSelect from "../input/select";
import TextInput from "../input/text-input";
import TextButton from "../button/text-button";
import { MembersApi } from "../../API/members-api";

const MemberForm = () => {
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
		})
	}, [])

	const onEmailChange = (value: string): void => {
		setEmail(value);
	};

	const onBooksSelect = (value: string[]): void => {
		const selectedBooksIds = new Set(value.map((bookId) => Number(bookId)));
		setSelectedBooks(
			masterBooks.filter((masterBook) => selectedBooksIds.has(masterBook.id as number))
		);
	};

	const save = async () => {
		const createdMember = await membersAPI.createMember({ email, membershipStartDate: Date.now().toLocaleString() });
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

	}

	return (
		<>
			<div>
				<TextInput value={email} label="Email" onChange={onEmailChange} />
			</div>
			<div>
				<MultiSelect pickList={books} value={selectedPickListBooks} onChange={onBooksSelect}/>
			</div>
			<div>
				<TextButton label="save" onClick={save} />
			</div>
		</>
	);
};

export default MemberForm;
