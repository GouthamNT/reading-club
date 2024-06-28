import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import TextButton from "../../button/text-button";
import { useEffect, useState } from "react";
import MemberForm from "../member-form";
import { Member, MemberBook } from "../../../common/modal";

interface MemberDialogProps {
	open: boolean;
	member?: Member;
	memberBooks?: Array<MemberBook>;
	onClose: () => void;
}

const MemberDialog = (props: MemberDialogProps) => {
	const [open, setOpen] = useState<boolean>(props.open);

	useEffect(() => {
		setOpen(props.open);
	}, [props.open]);
	const handleClose = () => {
		setOpen(false);
		if (props.onClose) {
			props.onClose();
		}
	};

	return (
		<Dialog maxWidth={"md"} open={open} onClose={handleClose}>
			<DialogTitle>Manage Members</DialogTitle>
			<DialogContent>
				<MemberForm member={props.member} memberBooks={props.memberBooks} />
			</DialogContent>
			<DialogActions>
				<TextButton label="close" onClick={handleClose} />
			</DialogActions>
		</Dialog>
	);
};

export default MemberDialog;
