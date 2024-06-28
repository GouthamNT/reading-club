import './App.css';
import ApplicationProviderContext from './context/application/app-provider';
import Admin from './pages/admin';
import Main from './pages/main';

function App() {
  return (
		<ApplicationProviderContext>
			<div className="App">
				<div>
					<Main />
				</div>
				<div>
					<Admin />
				</div>
			</div>
		</ApplicationProviderContext>
	);
}

export default App;
