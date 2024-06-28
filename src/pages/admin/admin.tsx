import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
	Avatar,
	Container,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Stack,
	Typography
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Member, MemberBook } from "../../common/modal";
import MemberDialog from "../../components/app/dialog/member-pop-up";
import AppIconButton from "../../components/button/icon-button";
import Header from "../../components/header/header";
import { ApplicationContext } from "../../context/application/app-context";
import { MemberProvider } from "../../context/member/member-provider";
import './admin.css'

const Admin = () => {
	const { members, getMembers, deleteMember, getMemberBooks } =
		useContext(ApplicationContext);

	const [selectedMember, setSelectedMember] = useState<Member>();
	const [selectedMemberBooks, setSelectedMemberBooks] = useState<
		Array<MemberBook>
	>([]);
	const [openDialog, setOpenDialog] = useState<boolean>(false);

	useEffect(() => {
		getMembers();
	}, []);

	const onDelete = (id: number) => {
		deleteMember(id);
	};

	const editMember = async (id: number) => {
		const member = members.find((member) => {
			return member.id === id;
		});
		getMemberBooks(id).then((memberBooks) => {
			setSelectedMemberBooks([...memberBooks]);
			setSelectedMember({ ...(member as Member) });
			setOpenDialog(true);
		});
	};
	return (
		<>
			<Container maxWidth="md">
				<List className="animated-list">
					{members.map((member, index) => {
						return (
							<>
								<ListItem key={member.id}>
									<ListItemAvatar>
										<Avatar alt={`Avatar n°${index + 1}`} src={member.img} />
									</ListItemAvatar>
									<ListItemText
										primary={member.name}
										secondary={
											<>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													{member.email}
												</Typography>
											</>
										}
									/>
									<Stack direction="row" spacing={1}>
										<AppIconButton
											icon={<EditIcon />}
											onClick={() => editMember(member.id as number)}
										/>
										<AppIconButton
											icon={<DeleteForeverIcon />}
											onClick={() => onDelete(member.id as number)}
										/>
									</Stack>
								</ListItem>
								<Divider />
							</>
						);
					})}
				</List>
				<MemberProvider>
					<MemberDialog
						open={openDialog}
						onClose={() => setOpenDialog(false)}
						member={selectedMember}
						memberBooks={selectedMemberBooks}
					/>
				</MemberProvider>
			</Container>
		</>
	);
};

export default Admin;
