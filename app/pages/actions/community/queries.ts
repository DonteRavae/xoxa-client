export const GET_DISCUSSION_POST = `
    query GetDiscussionPostById($request: ID!) {
        getDiscussionPostById(postId: $request) {
            id
            title
            subtitle
            content
            author {
                username
                imgUrl
            }
            comments {
                id
                content
            }
            community {
                name
            }
            createdAt
            lastModified
        }
    }
`;

export const GET_USER_DASHBOARD = `
    query GetUserDashboard {
        getUserDashboard {
            recentDiscussions {
                title
                comments {
                    id
                }
                community {
                    name
                }
                slug
            }
            discussionFeed {
                title
                author {
                    username
                }
            }
            recentNews {
                title
            }
        }
    }
`;
