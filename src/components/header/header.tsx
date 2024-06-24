import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import { useCallback } from "react";
import TextButton from "../button/text-button";

const Header = ({}) => {

	const login = useCallback(() => {
		sessionStorage.setItem("login", "admin");
	}, []);

	return (
		<AppBar>
			<Toolbar>
				<Grid container spacing={2} justifyContent={"space-between"}>
					<Grid item>
						<Typography variant="h5" component="div">
							READING CLUB
						</Typography>
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
