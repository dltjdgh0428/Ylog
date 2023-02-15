import React from "react";
import styled from "styled-components";
import Button from "../common/Button";

const WriteActionButtonsBlock = styled.div`
    margin-top: 1rem;
    margin-bottom: 3rem;
    button + button { // 버튼옆에 버튼이 나오면 0.5rem 떨어지게 한다는 뜻이구나!!!
        margin-left: 0.5rem;
    }

`;

const StyledButton = styled(Button)`
    height: 2.125rem;
    & + & {
        margin-left: 0.5rem;
    }
`;
//page886
const WriteActionButtons = ({ onCancel, onPublish, isEdit }) =>{
    return (
        <WriteActionButtonsBlock>
            <StyledButton style={{backgroundColor:"#FDB7BA"}} onClick={onPublish}>
                포스트 {isEdit ? '수정': '등록'}
            </StyledButton>
            <StyledButton onClick={onCancel}>취소</StyledButton>
        </WriteActionButtonsBlock>
    );
};

export default WriteActionButtons;