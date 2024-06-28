import { Button, ButtonProps, styled } from "@mui/material";
import { MouseEvent, useMemo } from "react";

type Color = "primary" | "secondary";

interface TextButtonProps {
	color?: Color;
	label: string;
	onClick: (e: MouseEvent<HTMLElement>) => void;
}

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
	color: "#ffffff",
	backgroundColor: "none",
	"&:hover": {
		color: "#d3d3d3",
	},
}));

const TextButton = (props: TextButtonProps) => {
	const color: Color = useMemo(() => {
		if (props.color) {
			return props.color;
		}
		return "primary";
	}, [props.color]);

	return color === "secondary" ? (
		<ColorButton variant="text" size="large" onClick={props.onClick}>
			{props.label}
		</ColorButton>
	) : (
		<Button variant="text" size="large" onClick={props.onClick}>
			{props.label}
		</Button>
	);
};

export default TextButton;
