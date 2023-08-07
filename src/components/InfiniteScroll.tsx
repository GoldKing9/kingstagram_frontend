import React, {useState, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Card, CardContent, Typography} from '@mui/material';
import {Box} from '@mui/material';


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
                            src={post.imageUrl.split('|')[0]} // 이미지 URL들 중 첫 번째 이미지만 보여줌. 여러 이미지를 보여주려면 추가 로직 필요
                            alt="Post content"
                            sx={{
                                width: '100%',
                                height: 'auto',
                                marginBottom: '10px'
                            }}
                        />
                        <Typography variant="h5" component="div">
                            {post.postContent}
                        </Typography>
                        <Typography variant="subtitle1">
                            {post.likeCount} 명이 좋아합니다.
                        </Typography>
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
