const mongoose = require("mongoose")

const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
let categorySchema = new Schema({
	ID: {
		unique: true,
		type: String
	},
	MALL_CATEGORY_NAME: {
		type: String
	},
	IMAGE: {
		type: String
	},
	TYPE: {
		type: Number
	},
	SORT: {
		type: Number
	},
	COMMENTS: {
		type: String
	}
})

mongoose.model("Category", categorySchema)