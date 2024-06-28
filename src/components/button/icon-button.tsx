import { Button, ButtonProps, IconButton, styled } from "@mui/material";
import { MouseEvent, ReactNode, useMemo } from "react";

type Color = "primary" | "secondary";

interface TextButtonProps {
	color?: Color;
	onClick: (e: MouseEvent<HTMLElement>) => void;
	icon: ReactNode
}

const ColorButton = styled(IconButton)<ButtonProps>(({ theme }) => ({
	color: "#ffffff",
	backgroundColor: "none",
	"&:hover": {
		color: "#d3d3d3",
	},
}));

const AppIconButton = (props: TextButtonProps) => {
	const color: Color = useMemo(() => {
		if (props.color) {
			return props.color;
		}
		return "primary";
	}, [props.color]);

	return color === "secondary" ? (
		<ColorButton onClick={props.onClick}>
			{props.icon}
		</ColorButton>
	) : (
		<IconButton onClick={props.onClick}>
			{props.icon}
		</IconButton>
	);
};

export default AppIconButton;
