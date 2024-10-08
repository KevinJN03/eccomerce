import { CloseFullscreenRounded, OpenInFullRounded } from '@mui/icons-material';
import { useFinanceContext } from '../../../context/financeContext';
import ThemeBtn from '../../buttons/themeBtn';

function ExpandCollapseButton({}) {
    const { salesOpen, setSalesOpen, feesOpen, setFeesOpen } =
        useFinanceContext();
    return (
        <ThemeBtn
            bg={'bg-light-grey'}
            handleClick={() => {
                if (!salesOpen || !feesOpen) {
                    setSalesOpen(() => true);
                    setFeesOpen(() => true);
                } else {
                    setSalesOpen(() => false);
                    setFeesOpen(() => false);
                }
            }}
        >
            <div className="flex flex-nowrap items-center gap-2 ">
                {!salesOpen || !feesOpen ? (
                    <>
                        <OpenInFullRounded />
                        <p className="whitespace-nowrap text-base font-medium">
                            Expand categories
                        </p>
                    </>
                ) : (
                    <>
                        <CloseFullscreenRounded />
                        <p className="whitespace-nowrap text-base font-medium">
                            Collapse categories
                        </p>
                    </>
                )}
            </div>
        </ThemeBtn>
    );
}

export default ExpandCollapseButton;
