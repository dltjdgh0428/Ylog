import React from "react";
import styled from "styled-components";

const ResponsiveBlock = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 1024px;
   margin: 0 auto;

    @media (max-width: 1024px){
        width: 100%;
    }

`;

const Responsive = ({children, ...rest}) => {

    //styld, className, onClick, onMouseMove등의 props를 사용할수
    //있도록 ... rest를 사용하여 responsiveBlock에 전달

    return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
