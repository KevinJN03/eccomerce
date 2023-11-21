import LayoutProvider from './context/layoutContext';
import './CSS/App.css';
import './index.css';
import Router from './Router';
function App() {
    return (
        <div id="App">
            <LayoutProvider>
                <Router /> 
            </LayoutProvider>
           
        </div>
    );
}

export default App;
