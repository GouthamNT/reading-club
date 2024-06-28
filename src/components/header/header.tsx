import { AppBar, Grid, Toolbar } from "@mui/material";
import { useCallback, useState } from "react";
import TextButton from "../button/text-button";
import TextHeader from "../text/text-content";
import MemberDialog from "../app/dialog/member-pop-up";
import { MemberProvider } from "../../context/member/member-provider";

const Header = () => {

	// const isLoggedIn
	const [openDialog, setOpenDialog] = useState<boolean>(false);

	const login = useCallback(() => {
		sessionStorage.setItem("login", "admin");
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
						<TextButton
							color="secondary"
							label="Add Member"
							onClick={() => setOpenDialog(true)}
						/>
						<TextButton
							color="secondary"
							label="Login"
							onClick={() => login()}
						/>
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
