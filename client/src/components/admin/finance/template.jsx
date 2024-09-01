import { useFinanceContext } from '../../../context/financeContext';
import BubbleButton from '../../buttons/bubbleButton';
import ThemeBtn from '../../buttons/themeBtn';

function Template({ setModalOpen, children, headerText, footer }) {
    const { modalState, setModalState } = useFinanceContext();

    return (
        <section className="flex flex-col gap-5 rounded-3xl bg-white p-8">
            <header>
                <h2 className="font-EBGaramond text-4xl">{headerText}</h2>
            </header>

            <body className="flex flex-col gap-3">{children}</body>

            <footer className="flex w-full flex-nowrap justify-between">
                <BubbleButton
                    text={'Cancel'}
                    handleClick={() => setModalState(() => ({ on: false }))}
                />
                <ThemeBtn
                    handleClick={() => {
                        if (footer?.handleClick) {
                            footer.handleClick();
                        } else {
                            setModalState(() => ({
                                on: true,
                                view: 'update_bank_details',
                            }));
                        }
                    }}
                >
                    {footer?.loading ? (
                        <div>
                            <div className="spinner-circle ![--spinner-size:25px] ![--spinner-color:255,255,255] "></div>
                        </div>
                    ) : (
                        <span className=" relative !z-[1] w-full cursor-pointer text-base font-medium text-white">
                            {footer?.text || 'Next'}{' '}
                        </span>
                    )}
                </ThemeBtn>
            </footer>
        </section>
    );
}

export default Template;
