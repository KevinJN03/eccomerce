import Footer from './footer';
import OrderInformation from './orderInformation';
import { Text, View } from '@react-pdf/renderer';
function OrderReceipt({ order }) {
    const featureObj = {
        fromAddress: false,
        orderNumber: false,
        shop: true,
        buyer: false,
    };
    return (
        <View
            style={{
                boxSizing: 'border-box',
                height: '100%',
                minHeight: '100%',
            }}
        >
            <View
                style={{
                    boxSizing: 'border-box',
                    height: '100%',
                    minHeight: '100%',
                 
                    position: 'relative',
                }}
            >
                <Text
                    style={{
                        fontSize: '14pt',
                        fontWeight: 'semibold',
                    }}
                >
                    Order #{order?._id}
                </Text>
                <Text>
                    {order?.customer?.fullName}{' '}
                    <Text className="text-xxs" style={{ fontSize: '10pt' }}>
                        ({order?.customer?._id})
                    </Text>
                </Text>

                <OrderInformation order={order} feature={featureObj} />
                <Footer />
            </View>
        </View>
    );
}

export default OrderReceipt;
