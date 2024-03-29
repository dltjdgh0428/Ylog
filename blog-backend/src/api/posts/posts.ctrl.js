import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

const {ObjectId} = mongoose.Types;

//악성코드를 막기위해 허용해주는 코드의 범위
const sanitizeOption={
    allowedTags:[
        'h1',
        'h2',
        'b',
        'i',
        'u',
        's',
        'p',
        'ul',
        'ol',
        'li',
        'blockquote',
        'a',
        'img',
    ],
    allowedAttributes:{
        a: ['href','name','target'],
        img: ['src'],
        li: ['class'],
    },
    allowedSchemes: ['data', 'http'],
};

export const getPostById = async (ctx, next) =>{
    const { id } = ctx.params;
    if(!ObjectId.isValid(id)){
        ctx.status = 400;
        return;
    }
    try{
        const post = await Post.findById(id);
        if(!post) {
            ctx.status = 404;
            return;
        }
        ctx.state.post = post;
        return next();
    }catch(e){
        ctx.throw(500,e);
    }
};
//id로 찾은 포스트가 로그인중인 사용자가 작성한 포스트 인지 확인해줍니다.
//몽고디비에서 조회한 데이터의 id값을 문자열과 비교할때는 반드시 toString()을 해 주어야한다.
export const checkOwnPost = (ctx, next)=>{
    const {user, post}= ctx.state;
    if(post.user._id.toString()!== user._id){
        ctx.status = 403;
        return;
    }
    return next();
};


export const write = async ctx => {
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
    });
    const result = schema.validate(ctx.request.body);
    if(result.error){
        ctx.status=400;
        ctx.body = result.error;
        return;
    }

    const {title,body,tags,likes,likesCount} = ctx.request.body;
    const post = new Post({
        title,
        body:sanitizeHtml(body,sanitizeOption) ,
        tags,
        likesCount,
        likes,
        user: ctx.state.user,
    });
    try{
        await post.save();
        ctx.body = post;
    }catch(e){
        ctx.throw(500,e);
    }
};
//html을 없애고 내용이 너무 길면 200자로 제한하는함수
const removeHtmlAndShorten = body =>{
    const filtered = sanitizeHtml(body,{
        allowedTags: [],
    });
    return filtered.length < 200 ? filtered : `${filtered.slice(0,200)}...`;
};


//712페이지
export const list = async ctx => {
    const page = parseInt(ctx.query.page|| '1',10);


    //----------------------------------
    const { user } = ctx.request;

    function checkLiked(post) {
        // posts 에 스키마에 속하지 않은 값을 추가해주려면 toObject() 를 해주어야합니다.
        // 혹은, 쿼리를 하게 될 떄 .lean().exec() 의 형식으로 해야합니다.
        post = post.toObject(); 
        // 비로그인 상태라면 false
        // 배열에 아이템이 있다면, 자신의 아이디가 들어있다는 뜻이니 true
        const checked = Object.assign(post, { liked: user !== null && post.likes.length > 0 }); 
        delete checked.likes; // likes key 제거
        return checked;
    };

    //-----------------------------
    if(page<1){
        ctx.status = 400;
        return;
    }
    const {tag, username} = ctx.query;
    //여기네 그 이름이나 태그에 따라서 리스트 보여주는 부분
    const query = {
        ...(username ? {'user.username': username} : {}),
        ...(tag ? {tags: tag}: {}),
    };

    try{
        //여기가 포스트 페이지 관리하는건데 내리면서 다 볼수 있게해주려면 여길 건드려서 해야함
        //예를 들어 인스타처럼 계속 쭉쭉 보이게 하는거 말하는거임
        const posts = await Post.find(query)
            .sort({_id: -1})
            // .limit(100)
            // .skip((page-1)*100)
            .lean()
            .exec();
        const postCount = await Post.countDocuments(query).exec();
        ctx.set('Last-Page',Math.ceil(postCount/10));    
        ctx.body = posts.map(post => ({
            ...post,
            //여기 체크부분
            checkLiked,
            body:removeHtmlAndShorten(post.body),
            }));
    }catch(e){
        ctx.throw(500,e);
    }
};

export const read = async ctx => {
    ctx.body = ctx.state.post;
};

export const remove = async ctx => {
    const {id} = ctx.params;
    try{
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204;
    }catch(e){
        ctx.throw(500,e);
    }
};

export const update = async ctx => {
    const {id} = ctx.params;

    const schema = Joi.object().keys({
        title: Joi.string(),
        body: Joi.string(),
        tags: Joi.array().items(Joi.string()),
    });

    const result = schema.validate(ctx.request.body);
    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }
    
    const nextData = {...ctx.request.body};
    if(nextData.body){
        nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
    }

    try{
        const post = await Post.findByIdAndUpdate(id, nextData, {
            new:true, //이 값을 설정하면 업데이트된 데이터를 반환합니다.
            //false일 때는 업데이트 되기전의 데이터를 반환압니다.
        }).exec();
        if(!post){
            ctx.status=404;
            return;
        }
        ctx.body = post;
    } catch(e){
        ctx.throw(500,e);
    }
};
