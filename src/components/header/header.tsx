import { AppBar, Grid, Toolbar } from "@mui/material";
import { useCallback } from "react";
import TextButton from "../button/text-button";
import TextHeader from "../text/text-content";

const Header = ({}) => {

	const login = useCallback(() => {
		sessionStorage.setItem("login", "admin");
	}, []);

	return (
		<AppBar position="relative">
			<Toolbar>
				<Grid container spacing={2} justifyContent={"space-between"}>
					<Grid item>
						<TextHeader headerSize="h4">READING CLUB</TextHeader>
					</Grid>
					<Grid item>
						<TextButton
							color="secondary"
							label="Login"
							onClick={() => login()}
						/>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
