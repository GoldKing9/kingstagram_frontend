import React, {useState, useRef} from 'react';
import {Modal, TextField, Box, Typography, Grid, IconButton} from '@mui/material';

type UploadModalProps = {
    open: boolean;
    onClose: () => void;
};

const UploadModal: React.FC<UploadModalProps> = ({open, onClose}) => {
        const [image, setImage] = useState<File | null>(null);
        const [description, setDescription] = useState<string>("");
        const dropRef = useRef<HTMLDivElement>(null);
        const fileInputRef = useRef<HTMLInputElement>(null);

        const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
        };

        const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setImage(e.dataTransfer.files[0]);
            }
        };

        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | Event) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                setImage(target.files[0]);
            }
        };

        const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(e.target.value);
        };

        const handleUpload = () => {
            console.log("Uploaded:", {image, description});

            setImage(null);
            setDescription("");
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
                        width: '70%',
                        height: '80%',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 2,
                        borderRadius: 2,
                        outline: 'none',
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={1}>
                        <Typography id="upload-modal-title" variant="body1"
                                    sx={{fontWeight: 'bold', textAlign: 'center', flexGrow: 1}}>
                            새 게시물 만들기
                        </Typography>
                        <IconButton
                            color="primary"
                            onClick={handleUpload}
                            size={'small'}
                            sx={{
                                color: '#34a0f8',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: '#01376a'
                                }
                            }}
                        >
                            <Typography sx={{fontWeight: 'bold'}}>공유하기</Typography>
                        </IconButton>
                    </Box>
                    <Grid container spacing={3} sx={{height: '95%', flexGrow: 1}}>
                        <Grid item xs={6} sx={{height: '100%'}}>
                            {
                                image ? (
                                    <Box
                                        component="img"
                                        src={URL.createObjectURL(image)}
                                        alt="Preview"
                                        sx={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            display: 'block',
                                            margin: 'auto',
                                        }}
                                    />
                                ) : (
                                    <Box
                                        ref={dropRef}
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}
                                        sx={{
                                            border: '2px dashed #DBDBDB',
                                            height: '100%',
                                            textAlign: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        사진과 동영상을 여기에 끌어다 놓으세요
                                        <br/>
                                        또는 클릭하여 컴퓨터에서 선택하세요
                                        <input
                                            ref={fileInputRef}
                                            accept="image/*"
                                            type="file"
                                            onChange={handleImageChange}
                                            style={{display: 'none'}}
                                        />
                                    </Box>
                                )
                            }
                        </Grid>
                        <Grid item xs={6} sx={{height: '95%', display: 'flex', flexDirection: 'column'}}>
                            <Box sx={{
                                flexGrow: 1,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden'
                            }}>
                                <TextField
                                    fullWidth
                                    placeholder="문구 입력..."
                                    variant="standard"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    multiline
                                    inputProps={{maxLength: 140}}
                                    helperText={`${description.length} / 140`} // helperText를 사용해서 글자 수 표시
                                    FormHelperTextProps={{ // 오른쪽 정렬을 위한 스타일 추가
                                        style: {textAlign: 'right', margin: 0}
                                    }}
                                    InputProps={{
                                        disableUnderline: true, // 밑줄 제거
                                    }}
                                    sx={{
                                        flex: 1,
                                        '.MuiInputBase-root': {
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            overflow: 'auto' // 스크롤 추가
                                        },
                                        '.MuiInputBase-multiline': { // multiline 모드일 때의 스타일 조절
                                            flex: 1,
                                            height: 'auto',
                                        }
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        );
    }
;

export default UploadModal;