import './App.css';
import Header from './components/header/header';
import Main from './pages/admin/admin';
import Admin from './pages/main/main';

function App() {
  return (
			<div className="App">
        <Header />
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
