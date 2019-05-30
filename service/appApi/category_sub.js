const Router = require("koa-router")

const router = new Router()
const mongoose = require("mongoose")
const fs = require("fs")

router.get("/insertCategorySub", async(ctx) => {
	fs.readFile("./data_json/category_sub.json", "utf-8", async(err, data) => {
		if(err) {
			console.log(err)
			return
		} else {
			let count = 0
			data = JSON.parse(data)
			let CategorySub = mongoose.model("CategorySub")
			data.RECORDS.map((value, index) => {
				let newCategorySub = new CategorySub(value)
				newCategorySub.save().then(() => {
					count++;
					if(count == data.RECORDS.length) {
						console.log(`${count}条数据全部导入完成`)
					} else {
						console.log(`正在导入${count}条数据`)
					}
				}).catch((err) => {
					console.log(err)
				})
			})
		}
	})
	ctx.body = "正在导入数据"
})

module.exports = router
