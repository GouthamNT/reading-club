import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import Admin from "./pages/admin/admin";
import Main from "./pages/main/main";
import { useContext } from "react";
import { ApplicationContext } from "./context/application/app-context";

function App() {
	const { isLoggedIn } = useContext(ApplicationContext);

	return (
		<div className="App">
			<Header />
			<Router>
				<Routes>
					{isLoggedIn ? (
						<>
							<Route path="/admin" element={<Admin />} />
							<Route path="*" element={<Navigate to="/admin" />} />
						</>
					) : (
						<>
							<Route path="/" element={<Main />} />
							<Route path="*" element={<Navigate to="/" />} />
						</>
					)}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
