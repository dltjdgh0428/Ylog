import React,{useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Responsive from "../common/Responsive";
// import Button from "../common/Button";
import palette from "../../lib/styles/palette";
import SubInfo from "../common/SubInfo";
import Tags from "../common/Tags";
import { useDispatch } from 'react-redux';
import { likePost ,unlikePost } from "../../modules/post";

const PostListBlock = styled(Responsive)`
    margin-top: 3rem;
`;

// const WritePostButtonWrapper = styled.div`
//     display: flex;
//     justify-content: flex-end;
//     margin-bottom: 3rem;
// `;

const PostItemBlock = styled.div`
    padding-top: 3rem;
    padding-bottom: 3rem;    

    &:first-child{
        padding-top: 0;   
    }
    & + & {
        margin-top: 1rem;
        border-top : 1px solid ${palette.gray[2]};
    }

    h2{
        font-size: 1.5rem;
        margin-bottom: 0;
        margin-top: 0;
        &:hover{
            color: ${palette.gray[6]};
        }
    }
    p{
        margin-top: 1.5rem;
    }
`;

const AllBlock = styled.div`
    color: ${palette.gray[5]};
`;

//여기 골뱅이왔다갔다함
//724page에 유저네임에 대한 골뱅이 표시가 나온다
const PostItem = ({post}) => {
    const { publishedDate, user, tags, title, body, _id } = post;
    const [likesCount, setLikesCount] = useState(post.likesCount);
    const [liked, setLiked] = useState(post.liked);

    const dispatch = useDispatch();
    const onLike = () =>{
        if(!liked){
            setLikesCount(likesCount+1);
            setLiked(!liked);
            dispatch(likePost(post._id));
        }
        else{
            setLikesCount(likesCount-1);
            setLiked(!liked);
            dispatch(unlikePost(post._id));
        }
    }
    return(
        <PostItemBlock>
            <h2>
                <Link to={`/${user.username}/${_id}`}>{title}</Link>
            </h2>
            <SubInfo 
                username={user.username} 
                publishedDate={new Date(publishedDate)} 
                likesCount={likesCount}
                liked={liked} 
                onLike={onLike}
            />
            <p>{body}</p>
            <Tags tags={tags}/>
            <AllBlock><Link to={`/${user.username}/${_id}`}>댓글 {}개 ..모두 보기</Link></AllBlock>
        </PostItemBlock>
    );
};
//여기가 그 정렬해서 보여주는 곳이네.
const PostList = ({posts, loading, error, showWriteButton}) => {
    if(error){
        console.log(error)
        return <PostListBlock>에러!!</PostListBlock>;
    }

    
    return(
        <PostListBlock>
            {/* <WritePostButtonWrapper>
                {showWriteButton &&(
                <Button cyan to="/write">
                    새 글 작성하기
                </Button>
                )}
            </WritePostButtonWrapper> */}
            {!loading && posts && (
                <div>
                    {posts.map(post =>(
                        <PostItem post={post} key={post._id} />
                    ))}
                </div>
           )}
        </PostListBlock>
    );
};

export default PostList;