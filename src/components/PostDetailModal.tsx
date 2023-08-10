import React, {useState} from 'react';
import {PostType} from './InfiniteScroll';
import HeartIcon from "./HeartIcon";
import {Modal, Box, Typography, IconButton, TextField, Avatar} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type PostDetailModalProps = {
    post: PostType;
    open: boolean;
    onClose: () => void;
    toggleLike: (postId: number) => void;
    isLiked: (postId: number) => boolean;
};

const PostDetailModal: React.FC<PostDetailModalProps> = ({post, open, onClose}) => {
    const [comment, setComment] = useState("");  // 임시로 초기 값을 설정
    const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

    const toggleLike = (postId: number) => {
        setLikedPosts(prev => {
            const newLiked = new Set(prev);
            if (newLiked.has(postId)) {
                newLiked.delete(postId);
            } else {
                newLiked.add(postId);
            }
            return newLiked;
        });
    };

    if (!post) {
        return null;
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="post-detail-title"
            aria-describedby="post-detail-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                height: '100%',
                maxHeight: '600px',
                bgcolor: 'background.paper',
                boxShadow: 24,
                display: 'flex',
                flexDirection: 'row',
                border: '1px solid #EFEFEF',
            }}>
                <Box flex={1} borderRight="1px solid #EFEFEF" display="flex" justifyContent="center"
                     alignItems="center">
                    <Box component="img" src={post.imageUrl.split('|')[0]} alt="Post content"
                         sx={{width: '90%', maxHeight: '400px', objectFit: 'cover'}}/>
                </Box>
                <Box flex={1} pl={2} display="flex" flexDirection="column"> {/* 세로 flex 속성 추가 */}
                    <Box flex={1} display="flex" justifyContent="space-between" alignItems="center"
                         borderBottom="1px solid #EFEFEF" py={1}>
                        <Box display="flex" alignItems="center">
                            <Avatar/>
                            <Typography id="post-detail-title" variant="body1" component="div" sx={{fontWeight: 'bold'}}
                                        ml={2}>
                                {post.userNickname}
                            </Typography>
                        </Box>
                        <IconButton onClick={onClose}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    <Box flex={8} justifyContent="start" alignItems="center"
                         borderBottom="1px solid #EFEFEF" overflow="auto"
                         sx={{
                             '&::-webkit-scrollbar': {
                                 display: 'none'
                             },
                             scrollbarWidth: 'none' // Firefox 에서 스크롤바 숨기기
                         }}> {/* 큰 Box 로 묶은 부분 시작 */}
                        <Box display="flex" py={1}>
                            <Box display="flex" alignItems="center">
                                <Avatar/>
                                <Typography id="post-detail-title" variant="body1" component="div"
                                            sx={{fontWeight: 'bold'}} ml={2}>
                                    {post.userNickname}
                                </Typography>
                                <Typography variant="body1" sx={{marginLeft: '10px'}}>
                                    {post.postContent}
                                </Typography>
                            </Box>
                        </Box>
                        <Box py={1}>
                            {/* Example Comment - You should map over fetched comments and structure like this */}
                            <Box display="flex" alignItems="center" marginBottom="10px">
                                <Avatar/> {/* User Profile Image */}
                                <Typography variant="body1" component="div"
                                            sx={{fontWeight: 'bold', marginLeft: '10px'}}>
                                    {/* This is just a placeholder, ideally you would fetch userNickname */}
                                    UserNickname
                                </Typography>
                                <Typography variant="body1" sx={{marginLeft: '10px'}}>Sample Comment 1</Typography>
                            </Box>
                        </Box>
                    </Box> {/* 큰 Box로 묶은 부분 끝 */}
                    <Box flex={1} display="flex" justifyContent="start" alignItems="center"
                         pt={1} borderBottom="1px solid #EFEFEF">
                        <HeartIcon
                            isLiked={likedPosts.has(post.postId)}
                            onToggleLike={() => toggleLike(post.postId)}
                        />
                        <Typography variant="subtitle1">좋아요 {post.likeCount}개</Typography>
                    </Box>
                    <Box flex={1} display="flex" justifyContent="space-between" alignItems="center" py={1} px={1}>
                        <TextField
                            fullWidth
                            placeholder="댓글 달기..."
                            size="small"
                            variant="standard"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            InputProps={{
                                disableUnderline: true
                            }}
                            sx={{
                                border: 'none'
                            }}
                        />
                        <IconButton
                            color="primary"
                            disabled={!comment}
                            size="small"
                            sx={{
                                color: '#34A0F8',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: '#01376A'
                                }
                            }}
                        >
                            게시
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

export default PostDetailModal;
