const mongoose = require("mongoose")
const db = "mongodb://localhost/mall"
const glob = require('glob')
const {
	resolve
} = require('path')

mongoose.Promise = global.Promise


exports.connect = () => {
	let maxConnectTimes = 0
	return new Promise((resolve, reject) => {
		//连接数据库
		mongoose.connect(db, {
			useNewUrlParser: true,
			autoIndex: false 
		}, function(err) {
			if(err) {
				console.log('Connection Error:' + err)
			} else {
				console.log('Connection success!')
			}
		})

		//监听数据库连接
		mongoose.connection.on("disconnected", () => {
			console.log('***********数据库断开***********')
			if(maxConnectTimes < 3) {
				maxConnectTimes++
				mongoose.connect(db)
			} else {
				reject()
				throw new Error("数据库出现问题，程序无法搞定，请人为修理......")
			}

		})

		//数据库出现错误
		mongoose.connection.on("error", err => {
			console.log('***********数据库错误***********')
			if(maxConnectTimes < 3) {
				maxConnectTimes++
				mongoose.connect(db)
			} else {
				reject(err)
				throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
			}

		})

		//连接打开
		mongoose.connection.once('open', () => {
			resolve()
			console.log("MongoDB Connected successfully1!")
		})
	})

}

exports.initSchemas = () => {
	glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}