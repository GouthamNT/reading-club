import './App.css';
import ApplicationProviderContext from './context/application/app-provider';
import Admin from './pages/admin';
import Main from './pages/main';

function App() {
  return (
			<div className="App">
				<div>
					<Main />
				</div>
				<div>
					<Admin />
				</div>
			</div>
	);
}

export default App;
