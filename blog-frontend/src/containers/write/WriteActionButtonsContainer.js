import React, {useEffect} from "react";
import WriteActionButtons from "../../components/write/WriteActionButtons";
import { useSelector,useDispatch } from "react-redux";
import { writePost,updatePost } from "../../modules/write";
import {useNavigate} from 'react-router-dom';

//41번줄 골뱅이 지워봤음
//724page에 유저네임에 대한 골뱅이 표시가 나온다
const WriteActionButtonsContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {title, body, tags, post, postError, originalPostId } = useSelector(({ write }) => ({
        title: write.title,
        body: write.body,
        tags: write.tags,
        post: write.post,
        postError: write.postError,
        originalPostId:write.originalPostId,
    }));

    const onPublish =() =>{
        if(originalPostId){
            dispatch(updatePost({title,body,tags, id: originalPostId}));
            return;
        }

        dispatch(
            writePost({
                title,
                body,
                tags,
            }),
        );
    };

    const onCancel = () => {
        navigate(-1);
    };

    useEffect(() => {
        if(post){
            const { _id, user } = post;
            navigate(`/${user.username}/${_id}`);
        }
        if(postError){
            console.log(postError);
        }
    },[navigate,post,postError]);
    
    return (
        <WriteActionButtons 
            onPublish={onPublish} 
            onCancel={onCancel} 
            isEdit={!!originalPostId}
        />
    );
};

export default WriteActionButtonsContainer;