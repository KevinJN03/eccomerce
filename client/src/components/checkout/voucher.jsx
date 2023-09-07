import Input from './input';
import Promo_Voucher_header from './promo-voucher-header';

function Voucher({}) {
    return (
        <section id="promo-body">
            <Promo_Voucher_header header_text="ADD A VOUCHER" />
            <div id="promo-input-container">
                <Input
                    header="16-DIGIT VOUCHER CODE:"
                    button_text="ADD VOUCHER"
                />
            </div>
        </section>
    );
}

export default Voucher;
