import { useLocation } from 'react-router-dom';

function useCurrentLocation() {
    const location = useLocation();
    console.log('location: ', location);
    debugger;
    const pathname = location?.pathname;
    let currentLocation = '';
    const locationArray = pathname.split('/');
    if (locationArray[locationArray.length - 1]) {
        currentLocation = locationArray[locationArray.length - 1];
    } else {
        currentLocation = locationArray[locationArray.length - 2];
    }
    console.log({ currentLocation });
    return { currentLocation };
}

export default useCurrentLocation;
