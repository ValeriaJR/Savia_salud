import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    maxHeight: "80vh",
    bgcolor: 'background.paper',
    boxShadow: 24,
    px: 4,
    py: 0,
    overflowY: "auto",
};

export default function ModalH({ data, open, setOpen, children }) {
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box id="modal-modal-description" className='sticky top-0 bg-white flex  justify-between p-1'>
                        <Typography id="modal-modal-title" vari ant="h6" component="h3" >
                            Hospitales que no enviaron el censo: {data.length}
                        </Typography>
                        {data.length != 0 && children}
                    </Box>
                    <Box id="modal-modal-description" sx={{ my: 2 }}>
                        {data.map((hospital, index) => (
                            <Typography key={index} variant="body1">
                                {hospital}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
