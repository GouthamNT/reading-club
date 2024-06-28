import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
	Container,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Stack,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { BooksAPI } from "../API/books-api";
import { MembersApi } from "../API/members-api";
import { ImageGridData } from "../common/component-modal";
import { Member, MemberBook } from "../common/modal";
import MemberDialog from "../components/app/dialog/member-pop-up";
import AppIconButton from "../components/button/icon-button";
import MemberImageGrid from "../components/image/image-grid";

interface MemberDetailsMeta extends ImageGridData, Member {}

const Admin = () => {
	const membersAPI = MembersApi.getInstance();
	const booksAPI = BooksAPI.getInstance();

	const [memberList, setMemberList] = useState<Array<Member>>([]);

	const [selectedMember, setSelectedMember] = useState<Member>();
	const [selectedMemberBooks, setSelectedMemberBooks] = useState<
		Array<MemberBook>
	>([]);
	const [openDialog, setOpenDialog] = useState<boolean>(false);

	const memberImageMeta = useMemo(() => {
		const membersGridData = memberList.map((member) => {
			const imageGridData: MemberDetailsMeta = {
				...member,
				srcUrl: member.img,
				title: member.name,
				subTitle: `@${member.email}`,
			};

			return imageGridData;
		});
		return membersGridData;
	}, [memberList]);

	useEffect(() => {
		membersAPI.getMembers().then((members) => {
			setMemberList(members);
		});
	}, []);

	const deleteMember = (id: number) => {
		membersAPI.deleteMember(id);
		membersAPI.getMembers().then((members) => {
			setMemberList(members);
		});
	};

	const editMember = async (id: number) => {
		const member = memberList.find((member) => {
			return member.id === id;
		});
		booksAPI.getMemberBooks(id).then((memberBooks) => {
			setSelectedMemberBooks([...memberBooks]);
			setSelectedMember({ ...(member as Member) });
			setOpenDialog(true);
		});
	};

	return (
		<>
			<Container maxWidth="sm">
				<ImageList cols={3} gap={20}>
					{memberImageMeta.map((member) => (
						<>
							<ImageListItem key={member.srcUrl}>
								<img
									srcSet={member.srcUrl}
									src={member.srcUrl}
									alt={member.title}
									loading="lazy"
								/>
								<ImageListItemBar
									title={member.title}
									subtitle={member.subTitle}
									position={"below"}
								/>
								<Stack direction="row" spacing={1}>
									<AppIconButton
										icon={<EditIcon />}
										onClick={() => editMember(member.id as number)}
									/>
									<AppIconButton
										icon={<DeleteForeverIcon />}
										onClick={() => deleteMember(member.id as number)}
									/>
								</Stack>
							</ImageListItem>
						</>
					))}
				</ImageList>
				<MemberDialog
					open={openDialog}
					onClose={() => setOpenDialog(false)}
					member={selectedMember}
					memberBooks={selectedMemberBooks}
				/>
			</Container>
		</>
	);
};

export default Admin;
