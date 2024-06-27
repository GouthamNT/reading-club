import { FilledInput, TextField } from "@mui/material";
import React from "react";

interface TextInputProps {
	disabled?: boolean;
	error?: boolean;
	label?: string;
	value?: string;
	onChange?: (value: string) => void;
}

const TextInput = (props: TextInputProps) => {
	return (
		<TextField
			{...props}
			variant="filled"
			fullWidth
			placeholder={props.label}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
				if (props.onChange) {
					return props.onChange(e.target.value);
				}
				return;
			}}
		/>
	);
};

export default TextInput;
