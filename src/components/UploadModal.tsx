import React, { useState } from 'react';
import { Button, Modal, TextField, Box, Typography } from '@mui/material';

type UploadModalProps = {
    open: boolean;
    onClose: () => void;
};

const UploadModal: React.FC<UploadModalProps> = ({ open, onClose }) => {
    const [image, setImage] = useState<File | null>(null);
    const [description, setDescription] = useState<string>("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleUpload = () => {
        // TODO: 이미지와 설명을 업로드하는 로직을 구현합니다.
        // 예를 들어, 서버에 POST 요청을 보낼 수 있습니다.
        console.log("Uploaded:", { image, description });

        // 업로드 후 모달을 닫습니다.
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="upload-modal-title"
            aria-describedby="upload-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    outline: 'none',
                }}
            >
                <Typography id="upload-modal-title" variant="h6" component="h2">
                    게시물 업로드
                </Typography>
                <Box component="form" mt={2}>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={handleImageChange}
                        style={{ display: 'block', marginBottom: '16px' }}
                    />
                    <TextField
                        fullWidth
                        label="설명"
                        variant="outlined"
                        value={description}
                        onChange={handleDescriptionChange}
                        multiline
                        rows={4}
                        style={{ marginBottom: '16px' }}
                    />
                    <Button variant="contained" color="primary" onClick={handleUpload}>
                        업로드
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UploadModal;
