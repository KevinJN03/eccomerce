import { useEffect } from 'react';
import { useLayoutContext } from '../context/layoutContext';
function disableLayout() {
    const { layout, setLayout } = useLayoutContext();

    useEffect(() => {
        setLayout(() => false);

        return () => {
            ('setting layout back to true');
            setLayout(true);
        };
    }, []);
}

export default disableLayout;
