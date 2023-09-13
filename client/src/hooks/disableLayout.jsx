import { useEffect } from 'react';
import { useLayoutContext } from '../context/layoutContext';
function disableLayout() {
    const { layout, setLayout } = useLayoutContext();

    return useEffect(() => {
        setLayout(false);

        return () => {
            console.log('setting layout back to true');
            setLayout(true);
        };
    }, []);
}

export default disableLayout;
