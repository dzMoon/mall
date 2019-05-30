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

module.exports = router