import { useParams } from 'react-router-dom';
import Home from './home/Home';
function Body() {
    let content;
    const route = useParams();

    function changeContent() {
        if (route == undefined || 'home') return (content = <Home />);
    }

    changeContent();
    return <>{content}</>;
}

export default Body;
