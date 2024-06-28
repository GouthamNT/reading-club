import {
	Container,
	ImageList,
	ImageListItem,
	ImageListItemBar
} from "@mui/material";
import { useContext, useEffect, useMemo } from "react";
import { ImageGridData } from "../../common/component-modal";
import { Member } from "../../common/modal";
import { ApplicationContext } from "../../context/application/app-context";
import "./main.css"

interface MemberDetailsMeta extends ImageGridData, Member {}

const Main = () => {

	const { members: memberList, getMembers, deleteMember, getMemberBooks } = useContext(ApplicationContext);
	const memberImageMeta = useMemo(() => {
		const membersGridData = memberList.map((member) => {
			const imageGridData: MemberDetailsMeta = {
				...member,
				srcUrl: member.img,
				title: member.name,
				subTitle: `ID:${member.email}`,
			};

			return imageGridData;
		});
		return membersGridData;
	}, [memberList]);

	useEffect(() => {
		getMembers()
	}, []);

	return (
		<>
			<Container maxWidth="sm">
				<ImageList cols={3} gap={20}>
					{memberImageMeta.map((member) => (
						<>
							<ImageListItem key={member.srcUrl} className="image-container">
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
							</ImageListItem>
						</>
					))}
				</ImageList>
			</Container>
		</>
	);
};

export default Main;
