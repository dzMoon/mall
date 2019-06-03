const mongoose = require("mongoose")
const Schema = mongoose.Schema

let cartSchema = new Schema({
	 goodsId:{
	 	type: String
	 },
    Name:{
	 	type: String
	 },
    price:{
	 	type: Number
	 },
    image:{
	 	type: String
	 },
    count:{
	 	type: Number
	 }
})

mongoose.model("cart", cartSchema)