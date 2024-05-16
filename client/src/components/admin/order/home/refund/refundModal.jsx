import { CloseRounded } from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThemeBtn from "../../../../buttons/themeBtn";
import _ from 'lodash'
function RefundModel({modalOpen, setModalOpen, id}){
    const navigate = useNavigate()
  return (
    <Modal
    open={modalOpen}
    onClose={() => {
        setModalOpen(() => false);
    }}
>
    <Box
        sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: '37.5rem',
        }}
    >
        <div
            className="absolute right-[-4rem] cursor-pointer rounded-full bg-white/20 p-2 transition-all hover:shadow-normal"
            onClick={() => {
                setModalOpen(() => false);
            }}
        >
            <CloseRounded
                className="!fill-white"
                sx={{ fontSize: '2rem' }}
            />
        </div>
        <section className="flex w-full flex-col rounded-3xl bg-white p-8">
            <h1 className="font-EBGaramond text-3xl font-normal">
                New! Cancel orders in one easy step
            </h1>

            <p className="mt-2 text-base">
                Now you can cancel an order and issue a refund to
                your buyer all in one seamless step. We’ll move the
                transaction into your “Completed” tab, making your
                workflow easier.
            </p>
            <div className="mt-8 self-end">
                <ThemeBtn
                    text={'Go to new Cancel page'}
                    handleClick={() => {
                        navigate(
                            `/admin/orders/${id}/cancel_order`
                        );
                    }}
                />
            </div>
        </section>
    </Box>
</Modal>
  )
};

export default RefundModel
