import { useLocation } from 'react-router-dom';

function useCurrentLocation() {
    const location = useLocation();

    const pathname = location?.pathname;
    let currentLocation = '';
    const locationArray = pathname.split('/');
    if (locationArray[locationArray.length - 1]) {
        currentLocation = locationArray[locationArray.length - 1];
    } else {
        currentLocation = locationArray[locationArray.length - 2];
    }

    return { currentLocation };
}

export default useCurrentLocation;
