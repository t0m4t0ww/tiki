import './App.css';
import DefaultLayouts from './Layouts/DefaultLayouts/DefaultLayouts';
import LayoutsMobile from './Layouts/LayoutsMobile/LayoutsMobile';

function App() {
    const checkScreen = window.screen.availWidth;

    return <div className="App">{checkScreen > 1440 ? <DefaultLayouts /> : <LayoutsMobile />}</div>;
}

export default App;
