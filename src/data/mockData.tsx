export type CommentType = {
    userId: number;
    commentId: number;
    content: string;
    timestamp: string;
};

export type PostType = {
    userId: number;
    postId: number;
    content: string;
    imageUrl: string;  // 이미지 URL 추가
    likesCount: number;
    likedBy: number[];  // 좋아요를 누른 유저들의 아이디 목록
    comments: CommentType[];
    timestamp: string;
};



export const mockData: PostType[] = [
    {
        userId: 1,
        postId: 1,
        content: "커비? 하지만 귀엽죠?",
        imageUrl: 'src/data/kirby-handspring.gif',
        likesCount: 5,
        likedBy: [2, 3, 4, 5, 6],
        comments: [
            {
                userId: 2,
                commentId: 1,
                content: "인정합니다",
                timestamp: "2023-08-01T10:30:00Z"
            },
            {
                userId: 3,
                commentId: 2,
                content: "ㄹㅇㅋㅋ",
                timestamp: "2023-08-01T11:00:00Z"
            }
        ],
        timestamp: "2023-08-01T10:00:00Z"
    },
    {
        userId: 2,
        postId: 2,
        content: "이 게시글은 댓글이 없어요",
        imageUrl: 'src/data/kirby-walk.gif',
        likesCount: 2,
        likedBy: [1, 3],
        comments: [],
        timestamp: "2023-08-02T14:00:00Z"
    },
    // ... 다른 포스트 데이터들을 추가하세요
];
