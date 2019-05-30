const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

const {
	connect,
	initSchemas
} = require('./database/init.js')

let user = require('./appApi/user')
let goods = require('./appApi/goods')
let category = require('./appApi/category')
let categorySub = require('./appApi/category_sub')
app.use(bodyParser())
app.use(cors())

let router = new Router();

router.use('/user', user.routes())
router.use('/goods', goods.routes())
router.use('/category', category.routes())
router.use('/categorySub', categorySub.routes())
app.use(router.routes())
app.use(router.allowedMethods())

//立即执行函数
;
(async() => {

	initSchemas()
	await connect()

	//	const User = mongoose.model('User')
	//	let oneUser = new User({
	//		userName: 'xuejh',
	//		password: '123456'
	//	})
	//
	//	oneUser.save().then(() => {
	//		console.log('插入成功')
	//
	//	})
	//	let users = await User.findOne({
	//		userName: oneUser.userName
	//	}).exec()
	//
	//	console.log('------------------')
	//	console.log(users)
	//	console.log('------------------')

})()

//app.use(async(ctx) => {
//	ctx.body = '<h1>hello Koa2</h1>'
//})

app.listen(3000, () => {
	console.log('[Server] starting at port 3000')
})