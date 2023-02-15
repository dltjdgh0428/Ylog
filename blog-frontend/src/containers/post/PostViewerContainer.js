import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { readPost, unloadPost} from "../../modules/post";
import PostViewer from "../../components/post/PostViewer";
import PostActionButtons from "../../components/post/PostActionButton";
import { setOriginalPost } from "../../modules/write";
import { useNavigate, useParams } from "react-router-dom";
import { removePost } from "../../lib/api/posts";
import { likePost ,unlikePost } from "../../modules/post";
//844 page

const PostViewerContainer = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { post,  error, loading, user  } = useSelector(({ post,loading, user })=>({
        post: post.post,
        error: post.error,
        loading: loading['post/READ_POST'],
        user: user.user,
    }));
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);

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

    useEffect(() =>{
        dispatch(readPost(postId));
        return() =>{
            dispatch(unloadPost());
        };
    },[dispatch, postId]);

    const onEdit = () => {
        dispatch(setOriginalPost(post));
        navigate('/write');
    }
    //892
    const onRemove = async () => {
        try {
            await removePost(postId);
            navigate('/');
        } catch(e){
            console.log(e);
        }
    };

    const ownPost = (user && user._id) === (post && post.user._id);

    return (
        <PostViewer 
            post={post} 
            loading={loading} 
            error={error} 
            actionButtons={ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove}/>}
            onLike={onLike}
            likesCount={likesCount}
            liked={liked}
        />
    );
};

export default PostViewerContainer;