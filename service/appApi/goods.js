const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const mongoose = require("mongoose")
let router = new Router()
const fs = require('fs')

router.get('/insertAllGoodsInfo', async(ctx) => {
	fs.readFile('./data_json/goods.json', 'utf-8', (err, data) => {
		ctx.body = "开始导入数据"
		data = JSON.parse(data)
		let saveCount = 0
		const Goods = mongoose.model('Goods')
		data.RECORDS.map((value, index) => {
			let newGoods = new Goods(value)
			newGoods.save().then(() => {
				saveCount++
				console.log(`正在导入${saveCount}条`)
				if(saveCount == data.length) {
					console.log(`${saveCount}条数据导入成功`)
				}

			}).catch((error) => {
				console.log('失败：' + error)
			})
		})
	})
	ctx.body = "开始导入数据"
})

router.post("/getDetailGoodsInfo", async(ctx) => {
	try {
		let goodsId = ctx.request.body.goodsId
		console.log(`getDetailGoodsInfo接口入参拼装： ===== {goodsId: ${goodsId} } =======`)

		const Goods = mongoose.model("Goods")

		if(!goodsId) {
			console.log(`getDetailGoodsInfoerror接口调用出错,错误原因:goodsId不能为空`)
			return
		}
		let result = await Goods.findOne({
			ID: goodsId
		}).exec()

		ctx.body = {
			code: 200,
			message: result
		}
		console.log(`getDetailGoodsInfo接口出参拼装： ===== {message:${ result}, code: 200} =======`)

	} catch(err) {
		console.log(`getDetailGoodsInfoerror接口调用出错,错误原因:${error}`)
		ctx.body = {
			code: 500,
			message: error
		}
	}
})

router.get("/getCategoryList", async(ctx) => {
	try {
		const Category = mongoose.model("Category");
		let result = await Category.find().exec()
		console.log(result)
		ctx.body = {
			code: '200',
			message: result
		}
		console.log(`getCategoryList接口出参:================={code:200, message:${JSON.stringify(result)}}=============`)
	} catch(err) {
		ctx.body = {
			code: '500',
			message: err
		}
		console.log(`查询导航列表失败,失败原因:=================${err}=============`)
	}
})
//通过一级栏目获取二级栏目
router.post("/getCategorySubList", async(ctx) => {
	try {
		const CategorySub = mongoose.model("CategorySub")
		let categoryId = ctx.request.body.categoryId
		console.log(`接口getCategorySubList的入参:=====================${categoryId}========================`)
		let result = await CategorySub.find({
			MALL_CATEGORY_ID: categoryId
		}).exec()
		console.log(result)
		ctx.body = {
			code: '200',
			message: result
		}
		console.log(`getCategorySubList接口出参:================={code:200, message:${JSON.stringify(result)}}=============`)
	} catch(err) {
		ctx.body = {
			code: '500',
			message: err
		}
		console.log(`查询导航列表失败,失败原因:=================${err}=============`)
	}
})
//获取二级栏目子内容
router.post("/getGoodsListByCategorySubID", async(ctx) => {
	try {
		const Goods = mongoose.model("Goods")
		let categorySubId = ctx.request.body.categorySubId //小标题ID
		let page = ctx.request.body.page // 当前页数
		let num = ctx.request.body.num || 10 // 每页数量，默认10条
		let start = (page - 1) * num
		console.log(`接口getGoodsListByCategorySubID的入参:====================={categorySubId: ${categorySubId}, page:${page}, num: ${num}}========================`)
		let result = await Goods.find({
			SUB_ID: categorySubId
		}).skip(start).limit(num).exec()
		console.log(result)
		ctx.body = {
			code: '200',
			message: result
		}
		console.log(`getGoodsListByCategorySubID接口出参:================={code:200, message:${JSON.stringify(result)}}=============`)
	} catch(err) {
		ctx.body = {
			code: '500',
			message: err
		}
		console.log(`查询导航列表失败,失败原因:=================${err}=============`)
	}
})

//获取购物车内容
router.post("/getCartInfo", async(ctx) => {
	try {
		const cart = mongoose.model("cart")
		let result = await cart.find().exec()
		ctx.body = {
			code: '200',
			message: result
		}
		console.log(`getCartInfo接口出参:================={code:200, message:${JSON.stringify(result)}}=============`)
	} catch(err) {
		ctx.body = {
			code: '500',
			message: err
		}
		console.log(`查询购物车失败,失败原因:=================${err}=============`)
	}
})
//给购物车添加内容
router.post("/addCart", async(ctx) => {
	try {
		const Cart = mongoose.model("cart")
		const newCart = new Cart(ctx.request.body)
		console.log(`addCart接口入参:================={code:200, message:${JSON.stringify(ctx.request.body)}}=============`)
		await newCart.save().then(() => {
			ctx.body = {
				code: '200',
				message: "添加成功"
			}
			console.log(`addCart接口出参:================={code:200, message:添加成功}}=============`)
		})

	} catch(err) {
		ctx.body = {
			code: '500',
			message: err
		}
		console.log(`购物车添加失败,失败原因:=================${err}=============`)
	}
})

//清空购物车
router.post("/clearCart", async(ctx) => {
	try {
		const Cart = mongoose.model("cart")
		let result = await Cart.remove()
		

			ctx.body = {
				code: '200',
				message: "清空成功"
			}
			console.log(`clearCart接口出参:================={code:200, message:清空成功}}=============`)


	} catch(err) {
		ctx.body = {
			code: '500',
			message: err
		}
		console.log(`购物车清空失败,失败原因:=================${err}=============`)
	}
})

module.exports = router