const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const mongoose = require("mongoose")
let router = new Router()
const fs = require('fs')

router.get("/insertCategory", async(ctx) => {

	fs.readFile('./data_json/category.json', 'utf-8', async(err, data) => {
		let count = 0;
		data = JSON.parse(data)
		let Category = mongoose.model('Category')
		console.log(data.RECORDS)
		data.RECORDS.map((value, index) => {
			console.log(value)
			let newCategory = new Category(value)
			newCategory.save().then(() => {
				count++;
				if(count = data.RECORDS.length) {
					console.log(`${count}条数据全部导入完成`)
				}
				console.log(`正在导入${count}条数据`)
				
			}).catch((error) => {
				console.log("导出失败")
			})
		})
	})
	ctx.body = '正在导入数据'
})

module.exports = router