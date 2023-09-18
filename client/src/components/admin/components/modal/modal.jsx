import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './modal.scss';
function BasicModal({ modalContent, ModalContent, button_text, modal_title }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Button
                onClick={handleOpen}
                className={modalContent == 'delete' ? 'deleteButton' : ''}
            >
                {button_text}
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="relative"
            >
                <Box className="modal-box">
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {modal_title}
                    </Typography>
                    <div className="button-container mt-4 flex w-full justify-center gap-3">
                        {modalContent == 'delete' ? (
                            <>
                                {' '}
                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={handleClose}
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            ModalContent(handleClose, handleOpen, open)
                        )}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default BasicModal;
