import glamo_icon from '../../../../assets/icons/glamo_logo_512px.png';
import paperPlane_icon from '../../../../assets/icons/paper-plane.png';
import { Text, View, Image } from '@react-pdf/renderer';
function Footer({}) {
    return (
        <View
      
            style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignContent: 'center',
                borderTop: '1pt solid black',
                paddingVertical: '12pt',
                position: 'absolute',
                marginTop: '20pt',

                bottom: 0,
                left: 0,
                right: 0,
                height: '60pt'
            }}
        >
            <View id="left" style={{ height: '100%'}}>
                <Image
                 
                    src={glamo_icon}
                    style={{
                        // maxWidth: '60pt',
                        // maxHeight: '50pt',
                        width: '60pt',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </View>
            <View
                id="middle"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    gap: '16pt',
                    paddingLeft: '60pt'
                }}
            >
                <Image
                    src={paperPlane_icon}
                    style={{ width: '35pt', height: '35pt' }}
                />
                <View style={{ maxWidth: '200pt', fontSize: '8pt' }}>
                    <Text style={{ fontWeight: 'semibold' }}>
                        Do the green thing
                    </Text>
                    <Text>
                        Reuse this paper to make origami, confetti or your next
                        to-do list.
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default Footer;
