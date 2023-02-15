import React from "react";

import styled from "styled-components";
import LikeImg from "../../assets/full-like21.png";
import EmptyLikeImg from "../../assets/empty-like25.png";

const Like = styled.img`
    // css
    
`;

const LikeButton = ({ liked, onClick }) => {
    return (
        <Like src={liked?LikeImg:EmptyLikeImg} onClick={onClick} />
    );
};

export default LikeButton;