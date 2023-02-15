import React,{ useRef, useEffect } from "react";
import Quill from "quill";
import 'quill/dist/quill.bubble.css';
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";

const EditorBlock = styled(Responsive)`
    //페이지 위아래 여백 지정
    padding-top: 3rem;
    padding-bottom: 3rem;
`;
const TitleInput = styled.input`
    font-size: 3rem;
    outline: none;
    padding-bottom: 0.5rem;
    border:none;
    border-bottom: 1px solid ${palette.gray[4]};
    margin-bottom: 2rem;
    width:100%;
`;
const QuillWrapper = styled.div`
    .ql-editor{
        padding: 0;
        min-height: 320px;
        font-size:1.125rem;
        line-height: 1.5;
    }
    .ql-editor.ql-blank::before{
        left:0px;
    }
`;
//--------------------------------------------------------------------
const Editor = ({title, body, onChangeField}) => {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    useEffect(()=>{
        quillInstance.current = new Quill(quillElement.current,{
            theme:'bubble',
            placeholder:'...',
            modules:{
                //더 많은 옵션 page 811
            },
        });

        const quill = quillInstance.current;
        quill.on('text-change', (delta,oldDelta, source) => {
            if(source === 'user'){
                onChangeField({key: 'body', value: quill.root.innerHTML});
            }
        });
    },[onChangeField]);

    const mounted = useRef(false);
    useEffect(()=>{
        if(mounted.current) return;
        mounted.current = true;
        quillInstance.current.root.innerHTML = body;
    }, [body]);


    const onChangeTitle = e => {
        onChangeField({ key: 'title', value: e.target.value});
    };
    
    return(
        <EditorBlock>
            <TitleInput 
                placeholder="제목..."
                onChange={onChangeTitle}
                value={title}
            />
            <QuillWrapper>
                <div ref={quillElement}/>
            </QuillWrapper>
        </EditorBlock>
    );
};

export default Editor;
