import React,{ useEffect } from "react";
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import PostList from "../../components/posts/PostList";
import { listPosts } from "../../modules/posts";
import { useParams, useLocation } from "react-router-dom";

const TagString = styled.div`
    
    margin-top: 1rem;
    font-size: 1.5rem;
    text-align: center;
    line-height: 1.5;
    
`;


const PostListContainer = () => {
    const params = useParams();
    const location =useLocation();
    const dispatch = useDispatch();
    
    const { posts, error, loading, user} = useSelector(
        ({ posts, loading, user }) => ({
            posts: posts.posts,
            error: posts.error,
            loading: loading['posts/LIST_POSTS'],
            user: user.user,
        }),
    );

    //원래 useEffect안에있는건데 view를 위해서 빼놨음
    const { tag } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    useEffect(()=>{
        const { username } = params;
        //pathname: 현재 경로 값.
        //search: 현재 경로의 query parameter 값.
        const { tag, page } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        
        dispatch(listPosts({tag, username, page}));
    },[dispatch, location, params]);
    return(
        <>
            {location.search!==""&&(
                <TagString>#{tag}</TagString>
            )}
            
            <PostList
                loading={loading}
                error={error}
                posts={posts}
                showWriteButton={user}
            />
        </>
    );

};
export default PostListContainer;