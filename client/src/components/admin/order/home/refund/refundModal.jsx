import { CloseRounded } from '@mui/icons-material';
import { Box, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ThemeBtn from '../../../../buttons/themeBtn';
import _ from 'lodash';
import BoxWithProps, {
    CloseModalButton,
} from '../../../../common/BoxwithProps';
function RefundModel({ modalOpen, setModalOpen, id }) {
    const navigate = useNavigate();
    return (
        <Modal
            open={modalOpen}
            onClose={() => {
                setModalOpen(() => false);
            }}
        >
            <BoxWithProps>
                <CloseModalButton
                    handleClick={() => {
                        setModalOpen(() => false);
                    }}
                />
                <section className="flex w-full flex-col rounded-3xl bg-white p-8">
                    <h1 className="font-EBGaramond text-3xl font-normal">
                        New! Cancel orders in one easy step
                    </h1>

                    <p className="mt-2 text-base">
                        Now you can cancel an order and issue a refund to your
                        buyer all in one seamless step. We’ll move the
                        transaction into your “Completed” tab, making your
                        workflow easier.
                    </p>
                    <div className="mt-8 self-end">
                        <ThemeBtn
                            text={'Go to new Cancel page'}
                            handleClick={() => {
                                navigate(`/admin/orders/${id}/cancel_order`);
                            }}
                        />
                    </div>
                </section>
            </BoxWithProps>
        </Modal>
    );
}

export default RefundModel;
