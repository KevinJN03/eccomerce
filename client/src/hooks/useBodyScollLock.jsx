import { useEffect, useState } from 'react';

const useBodyScollLock = () => {
    const bodyStyle = document.body.style;

    const [isLocked, setIsLocked] = useState(false);

    useEffect(() => {
        bodyStyle.overflowY = isLocked == "hidden" ? 'hidden' : 'auto';

        if(isLocked) {
            bodyStyle.overflowY = "hidden"
        }else {
         bodyStyle.overflowY = "auto"
        }
    
    }, [isLocked]);

    const toggle = () => {
        setIsLocked(!isLocked);
    };

    return [isLocked, toggle];
};

export default useBodyScollLock;
