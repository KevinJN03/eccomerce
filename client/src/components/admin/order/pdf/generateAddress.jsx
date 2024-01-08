import countryLookup from 'country-code-lookup';

import { Text, View } from '@react-pdf/renderer';
function GenerateAddress({ name, address }) {
    return (
        <View>
            <Text>{name} </Text>
            <Text>{address?.line1}</Text>
            {address?.line2 && <Text>{address?.line2}</Text>}
            <Text>{`${address?.city}, ${address?.postal_code}`}</Text>
            <Text>{countryLookup.byIso(address?.country)?.country}</Text>
        </View>
    );
}

export default GenerateAddress;
