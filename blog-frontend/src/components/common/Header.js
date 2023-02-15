import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;
/**
 * Responsice 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 * >본문과 다른 변경사항
 * 
 */
const Wrapper = styled(Responsive)`
  height: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;
const ButtonStyle= styled(Button)`
  margin-right: 1rem;
  margin-left: 1rem;
`;

/**
 * 헤더가 fixed로 되어있기 때문에 페이지의 콘테츠가 4rem 아래에 나타내도록 해 주는 컴포넌트
 */
const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
`;

const Header = ({ user , onLogout}) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            Y-log
          </Link>
          {user ? (
            <div className="right">
                <Link to={`/${user.username}`} ><UserInfo>{user.username}</UserInfo></Link>
                <Link to="/write" ><ButtonStyle cyan >글쓰기</ButtonStyle></Link>
                <Link className="right">
                    <Button onClick={onLogout}>로그아웃</Button>
                </Link>
            </div>
          ) : (
            <div className="right">
              <Link to="/login" className="right">
                <Button>로그인</Button>
              </Link>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
