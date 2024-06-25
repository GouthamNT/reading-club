import { Typography } from "@mui/material"
import { ReactNode, useMemo } from "react";

type Heading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TextHeaderProps {
	headerSize: Heading
	children: ReactNode
}

const TextHeader = (props: TextHeaderProps) => {

	const headerSize = useMemo(() => {
		if (props.headerSize) {
			return props.headerSize;
		}
		return "h6";
	}, [props.headerSize]);

	return <Typography variant={headerSize} component="div">
		{props.children}
	</Typography>
}

export default TextHeader;
