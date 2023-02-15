require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';
// eslint-disable-next-line no-undef
const {PORT, MONGO_URI} = process.env;

mongoose
.connect(MONGO_URI)
    .then(()=>{
        console.log('Connected to mongoDB');
    })
    .catch(e =>{
        console.error(e);
});
const router= new Router();
const app = new Koa();

router.use('/api',api.routes())

app.use(bodyParser());
app.use(jwtMiddleware);

app.use(router.routes()).use(router.allowedMethods());
//포트가 지정되어있지않다면 4천을 사용한다.
const port = PORT||4000;
app.listen(4000, ()=>{
    console.log('Listening to port %d',port);
});

