import { FilledInput, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { PickList } from "../../common/modal";

interface SelectProps {
	value: string[] | number[];
	label?: string;
	onChange?: (value: string[]) => void;
	pickList: PickList[];
	error?: boolean;
}

const MultiSelect = (props: SelectProps) => {
	return (
		<FormControl fullWidth margin="normal" error={props.error}>
			<InputLabel>{props.label}</InputLabel>
			<Select
				multiple
				value={props.value as unknown as string}
				onChange={(e: SelectChangeEvent) => {
					if (props.onChange) {
						return props.onChange(e.target.value as unknown as string[]);
					}
					return;
				}}
				input={<FilledInput />}
				renderValue={(selected: string) =>{
					const selectedValues = new Set([...selected as unknown as string[] | number[]]);
					return props.pickList
						.filter((item) => selectedValues.has(item.key))
						.map((item) => item.label)
						.join(", ");
				}}
			>
				{props.pickList.map((item) => (
					<MenuItem key={item.key} value={item.key}>
						<ListItemText primary={item.label} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default MultiSelect;