import Input from "./input"
import Promo_Voucher_header from "./promo-voucher-header"

function Promo_Student({}){
  return (
    <section id="promo-body">
                    <Promo_Voucher_header header_text="ADD A PROMO / STUDENT CODE"/>
                    <div id="promo-input-container">
                    <Input header={"PROMO/STUDENT CODE:"} button_text="APPLY CODE"/>

                        <a className="mb-12" href="/refer-a-friend">
                            Have you been{' '}
                            <strong className="underline underline-offset-1">
                                referred by a friend?
                            </strong>
                        </a>
                        <div className="need-to-know-container">
                            <h2 className="text-xl font-bold tracking-widest">
                                NEED TO KNOW
                            </h2>
                            <ul>
                                <li className="mb-3">
                                    You can only use one discount/promo code per
                                    order. This applies to our free-delivery
                                    codes, too.
                                </li>
                                <li className="mb-5">
                                    Discount/promo codes cannot be used when
                                    buying gift vouchers.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
  )
};

export default Promo_Student
