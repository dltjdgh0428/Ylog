import React from "react";
import styled, {css} from "styled-components";
import palette from "../../lib/styles/palette";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment/locale/ko';
import LikeButton from "./Like";

const SubInfoBlock = styled.div`
    ${props =>
        props.hasMarginTop &&
        css`
        margin-top: 1rem;
        `    
    }
    color: ${palette.gray[6]};

    span + span:before {
        color: ${palette.gray[4]};
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\B7'
    }
`;
// 업로드 시간 가공
const SubInfo =({username,publishedDate,hasMarginTop,likesCount,liked,onLike}) =>{
    const startTime = new Date(publishedDate);
    const nowTime = Date.now();

    return(
        <SubInfoBlock hasMarginTop={hasMarginTop}>
            <span>
                <b>
                    <Link to={`/${username}`}>{username}</Link>
                    
                </b>
            </span>
            {/* <span>
                {new Date(publishedDate).toLocaleDateString()}W 
            </span> */}
            <span>
                {parseInt(startTime - nowTime) > -60000 ? (
                    <Moment format="방금 전">{startTime}</Moment>
                ):(
                    <Moment fromNow>{startTime}</Moment>
                )}
            </span>
            <span>
                {likesCount} 좋아요
            </span>
            <span><LikeButton liked={liked} onClick={onLike}/></span>
        </SubInfoBlock>
    );
};

export default SubInfo;