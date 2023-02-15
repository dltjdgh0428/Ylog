import React, { useEffect,useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeField, initializeForm ,login} from '../../modules/auth';
import AuthFrom from '../../components/auth/AuthForm';
import {check} from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const LoginForm = () =>{
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {form,auth,authError,user} = useSelector(({auth,user}) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));

    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const {value, name} = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    };

    //폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const {username, password} = form;
        if(error!==null){
            console.log(error)
        }
        if([username, password].includes('')){
            setError('아이디 혹은 비밀번호를 입력하세요.');
            return;
        }
        dispatch(login({username, password}));
    };

    useEffect(()=>{
        dispatch(initializeForm('login'));
    },[dispatch]);

    useEffect(()=>{
        
        if(authError){
            console.log(authError);
            setError('아이디 혹은 비밀번호를 확인하세요.');
            return;
        }
        if(auth){
            setError(null);
            console.log('로그인 성공');
            dispatch(check());
        }
    },[auth, authError, dispatch]);
    
    //user값이 잘 살정되었는지 확인
    useEffect(()=>{
        if(user){
            console.log(user);
            navigate('/');
            try {
                localStorage.setItem('user',JSON.stringify(user));
            } catch(e){
                console.log('localStorage is not working');
            }
        }
    },[navigate,user]);
    
    return(
        <>
            <AuthFrom 
                type="login"
                form={form}
                onChange={onChange}
                onSubmit={onSubmit}
                error={error}
            />
        </>
    );
};

export default LoginForm;