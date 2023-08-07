import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, CardContent, Typography, IconButton, Avatar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import Box from "@mui/material/Box";

type PostType = {
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
    const response = await fetch(`https://7bf12a9e-15cb-437b-8d17-3f531c13498a.mock.pstmn.io/api/feeds?_start=${start}&_limit=${limit}`);
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

    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
        >
            {posts.map(post => (
                <Card key={post.postId} variant="outlined" style={{ margin: '10px 0' }}>
                    <CardContent>
                        <Box display="flex" alignItems="center" justifyContent="flex-start">
                            <Avatar /> {/* 임의의 프로필 아이콘 */}
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
                        <img
                            src={post.imageUrl.split('|')[0]}
                            alt="Post content"
                            style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                        />

                        {/* Action Bar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <div>
                                <IconButton>
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton>
                                    <CommentIcon />
                                </IconButton>
                            </div>
                            <Typography variant="subtitle1">
                                {post.likeCount} 명이 좋아합니다.
                            </Typography>
                        </div>

                        {/* Caption */}
                        <Typography variant="body1" style={{ marginBottom: '10px' }}>
                            {post.postContent}
                        </Typography>

                        {/* Timestamp */}
                        <Typography variant="caption">
                            Posted on: {new Date(post.postTime).toLocaleString()}
                        </Typography>

                    </CardContent>
                </Card>
            ))}
        </InfiniteScroll>
    );
};

export default InfiniteScrollComponent;
