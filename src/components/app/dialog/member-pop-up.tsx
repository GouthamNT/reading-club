import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import TextButton from "../../button/text-button";
import { useCallback, useContext, useEffect, useState } from "react";
import MemberForm from "../member-form";
import { Member, MemberBook } from "../../../common/modal";
import { MemberProvider } from "../../../context/member/member-provider";
import { MemberContext } from "../../../context/member/member-context";
import { ApplicationContext } from "../../../context/application/app-context";
import { validateEmail } from "../../../common/utils";

interface MemberDialogProps {
	open: boolean;
	member?: Member;
	memberBooks?: Array<MemberBook>;
	onClose: () => void;
}

const MemberDialog = (props: MemberDialogProps) => {
	const [open, setOpen] = useState<boolean>(props.open);

	const {
		name,
		email,
		selectedBooks,
		updateName,
		updateEmail,
		updateSelectedBooks,
	} = useContext(MemberContext);

	const {
		createMembers,
		updateMemberBooks,
		updateMember,
	} = useContext(ApplicationContext);

	useEffect(() => {
		setOpen(props.open);
	}, [props.open]);
	const handleClose = () => {
		if (props.onClose) {
			props.onClose();
		}
		updateName("");
		updateEmail("");
		updateSelectedBooks([]);
		setOpen(false);

	};

	const create = useCallback(async () => {
		const imgId = Math.floor(Math.random() * 1000) + 1;
		const createdMember = await createMembers({
			email,
			name,
			img: `https://picsum.photos/id/${imgId}/200`,
			membershipStartDate: Date.now().toString(),
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
		updateMemberBooks(createdMember.id as number, memberBooks, []);
	}, [email, name, selectedBooks, updateMemberBooks])

	const updateMemberData = useCallback(async () => {
		const updatedMember: Member = {
			...props.member as Member,
			name
		}

		updateMember(props.member?.id as number, updatedMember)

	}, [name])

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
		await updateMemberBooks(props.member?.id as number, memberBooksToAdd, memberBooksToDelete)
	}, [props.member, props.memberBooks, selectedBooks, updateMemberBooks]);

	const save = useCallback(async () => {

		if (props.member?.id) {
			await updateMemberData();
			await updateBooks();
			handleClose();
		} else {
			await create();
			handleClose();
		}
	}, [props.member, create, updateBooks, setOpen]);

	const disableSave = () => {

		return (!name || !email || !selectedBooks.length || !validateEmail(email))
	}

	return (
		<Dialog maxWidth={"md"} open={open} onClose={handleClose}>
			<DialogTitle>Manage Members</DialogTitle>
			<DialogContent>
				<MemberForm member={props.member} memberBooks={props.memberBooks} />
			</DialogContent>
			<DialogActions>
				<TextButton label="close" onClick={handleClose} />
				<TextButton label="save" onClick={save} disabled={disableSave()} />
			</DialogActions>
		</Dialog>
	);
};

export default MemberDialog;
