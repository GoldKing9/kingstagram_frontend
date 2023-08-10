import React, {useState, useEffect} from 'react';
import PostDetailModal from './PostDetailModal';
import HeartIcon from './HeartIcon';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Card, CardContent, Typography, IconButton, Avatar} from '@mui/material';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import Box from "@mui/material/Box";
import {createTheme, ThemeProvider} from '@mui/material/styles';

const achromaticTheme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        text: {
            primary: '#000000',
        },
    },
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: '#000000',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                    '&:focus': {
                        outline: 'none',
                    },
                },
            },
        },
    },
});

export type PostType = {
    postId: number;
    postContent: string;
    imageUrl: string;
    postTime: string;
    userId: number;
    userNickname: string;
    commentCount: number;
    likeCount: number;
};

const fetchPosts = async (start: number, limit: number): Promise<PostType[]> => {
    const response = await fetch(`//7bf12a9e-15cb-437b-8d17-3f531c13498a.mock.pstmn.io/api/feeds?_start=${start}&_limit=${limit}`);
    const data = await response.json();
    return data.posts;
};

const timeSince = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + "년 전";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + "개월 전";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + "일 전";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + "시간 전";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + "분 전";
    }
    return Math.floor(seconds) + "초 전";
};

const InfiniteScrollComponent: React.FC = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

    useEffect(() => {
        const loadInitialData = async () => {
            const initialPosts = await fetchPosts(0, 10);
            setPosts(initialPosts);
        };

        loadInitialData();
    }, []);

    const fetchMoreData = async () => {
        const newPosts = await fetchPosts(posts.length, 10);
        if (newPosts.length === 0) {
            setHasMore(false);
            return;
        }
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
    };

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

    const handlePostClick = (post: PostType) => {
        setSelectedPost(post);
    };

    const handleCloseModal = () => {
        setSelectedPost(null);
    };

    return (
        <ThemeProvider theme={achromaticTheme}>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                {posts.map(post => (
                    <Card key={post.postId}
                          variant="outlined"
                          sx={{
                              margin: '10px 0',
                              width: '80%',
                              border: 'none',
                              borderBottom: '1px solid #DBDBDB',
                          }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="flex-start" mb={2}>
                                <Avatar/> {/* 임의의 프로필 아이콘 */}
                                <Box ml={2} textAlign="left">
                                    <Typography variant="h6" component="div">
                                        {post.userNickname}
                                    </Typography>
                                    <Typography variant="caption">
                                        {timeSince(post.postTime)}
                                    </Typography>
                                </Box>
                            </Box>
                            {/* Image */}
                            <Box
                                component="img"
                                src={post.imageUrl.split('|')[0]}
                                alt="Post content"
                                sx={{
                                    width: "100%",
                                    height: "300px",
                                }}/>
                            {/* Action Bar */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                marginBottom: '10px'
                            }}>
                                <Box display="flex">
                                    <HeartIcon
                                        isLiked={likedPosts.has(post.postId)}
                                        onToggleLike={() => toggleLike(post.postId)}
                                    />
                                    <IconButton
                                        size={'large'}
                                        disableRipple
                                        onClick={() => handlePostClick(post)}
                                    >
                                        <MapsUgcRoundedIcon sx={{'&:hover': {color: '#737373'}}}/>
                                    </IconButton>
                                </Box>
                                <Typography variant="subtitle1">
                                    좋아요 {post.likeCount}개
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', marginBottom: '10px'}}>
                                <Typography variant="body1" component="div" sx={{fontWeight: 'bold'}}>
                                    {post.userNickname}
                                </Typography>
                                <Typography variant="body1" sx={{marginLeft: '10px'}}>
                                    {post.postContent}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
                <PostDetailModal
                    post={selectedPost!}
                    open={!!selectedPost}
                    onClose={handleCloseModal}
                    toggleLike={toggleLike}
                    isLiked={(postId) => likedPosts.has(postId)}
                />
            </InfiniteScroll>
        </ThemeProvider>
    );
};

export default InfiniteScrollComponent;
