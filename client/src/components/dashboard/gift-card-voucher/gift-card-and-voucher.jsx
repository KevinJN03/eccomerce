import giftCard_icon from '../../../assets/icons/gift-card.png';
import Empty_Body from '../empty-body';
import Header from '../header';

function GiftCard_Voucher({}) {
    return (
        <section className="gift-card-voucher">
            <Header icon={giftCard_icon} text={'GIFT CARDS & VOUCHERS'} />
            <Empty_Body
                text={{
                    big: 'YOU HAVE NO VOUCHERS YET',
                    small: 'You currently have no vouchers linked to your account. Get started by redeeming or buying one now.',
                    btn: 'ADD GIFT CARD/VOUCHER',
                    btn2: {
                        text: 'BUY GIFT VOUCHER',
                        link: '/gift-voucher'
                    }

                }}
                link={'add'}
                icon={{
                    image: giftCard_icon,
                    alt: 'gift outline icon with transparent background',
                }}
            />
        </section>
    );
}

export default GiftCard_Voucher;
