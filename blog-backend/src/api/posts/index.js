import Router from 'koa-router';
import checkLoggedIn from '../../lib/checkLoggedIn';
import * as postsCtrl from './posts.ctrl';
//711페이지에 다룬내용
const posts = new Router();

posts.get('/',postsCtrl.list);
posts.post('/',checkLoggedIn,postsCtrl.write);


const post = new Router();
post.get('/',postsCtrl.read);
post.delete('/',checkLoggedIn,postsCtrl.checkOwnPost ,postsCtrl.remove);
post.patch('/',checkLoggedIn,postsCtrl.checkOwnPost ,postsCtrl.update);
// post.post('/likes', likesCtrl.like);
// post.delete('/likes', likesCtrl.unlike);

posts.use('/:id',postsCtrl.getPostById , post.routes());



export default posts;