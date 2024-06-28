import { AppBar, Grid, Toolbar } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import TextButton from "../button/text-button";
import TextHeader from "../text/text-content";
import MemberDialog from "../app/dialog/member-pop-up";
import { MemberProvider } from "../../context/member/member-provider";
import { ApplicationContext } from "../../context/application/app-context";

const Header = () => {

	const { isLoggedIn, setLoggedIn } = useContext(ApplicationContext);
	const [openDialog, setOpenDialog] = useState<boolean>(false);

	const login = useCallback(() => {
		localStorage.setItem("login", "admin");
		setLoggedIn(true);
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem("login");
		setLoggedIn(false);
	}, []);

	const onClose = () => {
		setOpenDialog(false);
	}

	return (
		<AppBar position="relative">
			<Toolbar>
				<Grid container spacing={2} justifyContent={"space-between"}>
					<Grid item>
						<TextHeader headerSize="h4">READING CLUB</TextHeader>
					</Grid>
					<Grid item>
						{isLoggedIn && <TextButton
							color="secondary"
							label="Add Member"
							onClick={() => setOpenDialog(true)}
						/>}

						{isLoggedIn? <TextButton
							color="secondary"
							label="Logout"
							onClick={() => logout()}
						/>: <TextButton
						color="secondary"
						label="Login"
						onClick={() => login()}
					/>}
					</Grid>
				</Grid>
			</Toolbar>
			<MemberProvider>
				<MemberDialog open={openDialog} onClose={onClose} />
			</MemberProvider>
		</AppBar>
	);
};

export default Header;
