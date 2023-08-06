import React, {useState, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Card, CardContent, Typography} from '@mui/material';
import {Box} from '@mui/material';
import {mockData, PostType} from '../data/mockData';


const fetchPosts = async (start: number, limit: number): Promise<PostType[]> => {
    // 실제 API 요청 대신 mockData로부터 데이터 가져오기
    return mockData.slice(start, start + limit);
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
                <Card key={post.postId} variant="outlined" style={{margin: '10px 0'}}>
                    <CardContent>
                        <Typography variant="h6" component="div">
                            User ID: {post.userId}
                        </Typography>
                        <Box
                            component="img"
                            src={post.imageUrl}
                            alt="Post content"
                            sx={{
                                width: '100%',
                                height: 'auto',
                                marginBottom: '10px'
                            }}
                        />
                        <Typography variant="h5" component="div">
                            {post.content}
                        </Typography>
                        <Typography variant="subtitle1">
                            {post.likedBy.join(', ')} 총 {post.likesCount} 명이 좋아합니다.
                        </Typography>
                        <Typography variant="body1">
                            Comments:
                            {post.comments.map(comment => (
                                <div key={comment.commentId}>
                                    <Typography variant="body2">
                                        {comment.userId}: {comment.content}
                                    </Typography>
                                </div>
                            ))}
                        </Typography>
                        <Typography variant="caption">
                            Posted on: {new Date(post.timestamp).toLocaleString()}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </InfiniteScroll>
    );

};

export default InfiniteScrollComponent;
