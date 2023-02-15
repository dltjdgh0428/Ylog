import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

/**
 * 회원가입또는 로그인 폼을 보여줍니다.
 */

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border: 1px solid ${palette.gray[3]};
  border-radius: 0.25rem;
  padding: 0.5rem;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 0.5rem;
  }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여 줌
 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: center;
  a {
    color: ${palette.blue[7]};
    font-weight: bold;
    &:hover {
      //color: ${palette.blue[0]};
    }
  }
`;

/**
 * 에러를 보여줍니다.
 */
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;


const textMap = {
  login: '로그인',
  register: '가입하기',
};




const AuthFrom = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <form onSubmit = {onSubmit}>
        <StyledInput
          style={{ marginTop: '1rem' }}
          authComplete="username"
          name="username"
          placeholder="아이디"
          onChange={onChange}
          value={form.username}
        />
        {type === 'register' && (
          <StyledInput
            authComplete="phonenumber"
            name="phonenumber"
            placeholder="전화번호"
            onChange={onChange}
            value={form.phonenumber}
          />
        )} 
        <StyledInput
          authComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {type === 'register' && (
          <StyledInput
            authComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button cyan fullWidth style={{marginTop:'1rem'}} >
          {text}
        </Button>
      </form>
      <Footer>
        {type === 'login' ? (
          <div>
            계정이 없으신가요?&nbsp;
            <Link to="/register">가입하기</Link>
          </div>
        ) : (
          <div>
            계정이 있으신가요?&nbsp;
            <Link to="/login">로그인</Link>
          </div>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthFrom;
