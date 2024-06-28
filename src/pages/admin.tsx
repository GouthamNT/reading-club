import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
	Container,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Stack,
} from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { BooksAPI } from "../API/books-api";
import { MembersApi } from "../API/members-api";
import { ImageGridData } from "../common/component-modal";
import { Member, MemberBook } from "../common/modal";
import MemberDialog from "../components/app/dialog/member-pop-up";
import AppIconButton from "../components/button/icon-button";
import MemberImageGrid from "../components/image/image-grid";
import ApplicationProviderContext from "../context/application/app-provider";
import { ApplicationContext, ApplicationContextState } from "../context/application/app-context";
import { MemberProvider } from "../context/member/member-provider";

interface MemberDetailsMeta extends ImageGridData, Member {}

const Admin = () => {

	const { members: memberList, getMembers, deleteMember, getMemberBooks } = useContext(ApplicationContext)

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
		getMembers()
	}, []);

	const onDelete = (id: number) => {
		deleteMember(id);
	};

	const editMember = async (id: number) => {
		const member = memberList.find((member) => {
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
										onClick={() => onDelete(member.id as number)}
									/>
								</Stack>
							</ImageListItem>
						</>
					))}
				</ImageList>
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
