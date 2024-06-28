import {
  ImageListItem,
  ImageListItemBar
} from "@mui/material";
import { ImageGridData } from "../../common/component-modal";


interface ImageGridProps {
	imageMeta: ImageGridData;
	titlePosition?: position;
}

type position = "below" | "top" | "bottom";

const MemberImageGrid = (props: ImageGridProps) => {
	return (
		<>
			<ImageListItem key={props.imageMeta.srcUrl}>
				<img
					srcSet={props.imageMeta.srcUrl}
					src={props.imageMeta.srcUrl}
					alt={props.imageMeta.title}
					loading="lazy"
				/>
				<ImageListItemBar
					title={props.imageMeta.title}
					subtitle={props.imageMeta.subTitle}
					position={props.titlePosition ?? "below"}
				/>
			</ImageListItem>
		</>
	);
};

export default MemberImageGrid;
