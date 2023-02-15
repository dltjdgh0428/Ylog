import { createAction,handleActions } from "redux-actions";
import createRequestSaga,{
    createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';


const [
    READ_POST,
    READ_POST_SUCCESS,
    READ_POST_FAILURE,
] = createRequestActionTypes('post/READ_POST');
const UNLOAD_POST = 'post/UNLOAD_POST';
//액션생성
const LIKE_POST = 'posts/LIKE_POST';
const UNLIKE_POST = 'posts/UNLIKE_POST';

export const readPost = createAction(READ_POST, id => id);
export const unloadPost = createAction(UNLOAD_POST);
export const likePost = createAction(LIKE_POST, (payload) => payload);
export const unlikePost = createAction( UNLIKE_POST,  (payload) => payload);

const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);
const likePostSaga = createRequestSaga(LIKE_POST, postsAPI.likePost);
const unlikePostSaga = createRequestSaga(UNLIKE_POST, postsAPI.unlikePost);
export function* postSaga(){
    yield takeLatest(READ_POST,readPostSaga);
    yield takeLatest(LIKE_POST,likePostSaga);
    yield takeLatest(UNLIKE_POST,unlikePostSaga);
}

const initialState = {
    post:null,
    error:null,
    likesCount: 0,
    liked:false,
};

const post = handleActions(
    {
        [READ_POST_SUCCESS]: (state, {payload: post}) => ({
            ...state,
            post,
        }),
        [READ_POST_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [UNLOAD_POST]: ()=> initialState
        ,
        [LIKE_POST]: (state,action)=>({
            ...state,
            likesCount: action.payload.likesCount+1,
            liked:action.payload.liked,
        }),
        [UNLIKE_POST]: (state,action)=>({
            ...state,
            likesCount: action.payload.likesCount-1,
            liked: action.payload.liked,
        }),
    },
    initialState,
);

export default post;