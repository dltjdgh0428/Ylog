import { createAction,handleActions } from "redux-actions";
import createRequestSaga,{
    createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';


const INITIALIZE = 'write/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD'; //특정 키값 바꾸기
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';

const [
    WRITE_POST,
    WRITE_POST_SUCCESS,
    WRITE_POST_FAILURE,
] = createRequestActionTypes('write/WRITE_POST');

const [
    UPDATE_POST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAILURE,
] = createRequestActionTypes('write/UPDATE_POST');
 
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD,({ key,value})=>({
    key,
    value,
}));
export const setOriginalPost = createAction(SET_ORIGINAL_POST, post => post);
export const writePost = createAction(WRITE_POST, ({title,body,tags})=>({
    title,
    body,
    tags,
}));
export const updatePost = createAction(
    UPDATE_POST,
    ({id,title,body,tags}) =>({
        id,
        title,
        body,
        tags,
    })
);

//사가생성
const writePostSaga = createRequestSaga(WRITE_POST,postsAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST,postsAPI.updatePost);

export function* writeSaga(){
    yield takeLatest(WRITE_POST,writePostSaga);
    yield takeLatest(UPDATE_POST,updatePostSaga);
}

const initialState = {
    title:'',
    body:'',
    tags:[],
    post:null,
    postError:null,
    originalPostId: null,
};


const write = handleActions(
    {
        [INITIALIZE]: state => initialState,//initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_FIELD]: (state, {payload: {key, value} })=>({
            ...state,
            [key]: value,
        }),
        [WRITE_POST]: state => ({
            ...state,
            post:null,
            postError:null,
        }),
        [WRITE_POST_SUCCESS]: (state, {payload: post}) => ({
            ...state,
            post,
        }),
        [WRITE_POST_FAILURE]: (state, {payload: postError}) => ({
            ...state,
            postError,
        }),
        [SET_ORIGINAL_POST]: (state, { payload: post } ) =>({
            ...state,
            title: post.title,
            body:post.body,
            tags:post.tags,
            originalPostId: post._id,
        }),
        [UPDATE_POST_SUCCESS]: (state, {payload:post}) =>({
            ...state,
            post,
        }),
        [UPDATE_POST_FAILURE]: (state, {payload:postError}) =>({
            ...state,
            postError,
        }),
    },
    initialState,
);

export default write;