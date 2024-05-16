import { useNavigate } from 'react-router-dom';
import ThemeBtn from '../../../../buttons/themeBtn';
import confettiIcon from '../../../../../assets/icons/confetti.png';

function RefundSuccess({ text }) {
    const navigate = useNavigate();
    return (
        <section className="flex w-full flex-col items-center justify-center gap-4">
            <div className="rounded-full bg-light-grey p-10 ">
                <img src={confettiIcon} alt="confetti" className="h-20 w-20" />
            </div>
            <div className="flex max-w-lg flex-col items-center justify-center gap-5">
                <h3 className="text-2xl font-semibold">
                    All set! Your order is {text || 'cancelled'}
                </h3>
                <p className="text-center text-sm">
                    We sent your buyer a email to confirm. If you issued a
                    refund, it should appear in their account within 2 to 5
                    business days.
                </p>
                <ThemeBtn
                    text={'Return to Orders'}
                    handleClick={() => {
                        navigate('/admin/orders');
                    }}
                ></ThemeBtn>
            </div>
        </section>
    );
}

export default RefundSuccess;
