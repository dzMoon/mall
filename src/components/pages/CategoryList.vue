<template>
	<div>
		<div class="navbar-div" fixed>
			<van-nav-bar title="类别列表" />
		</div>
		<van-row>
			<van-col span="6">
				<div id="leftNav">
					<ul>
						<li @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryIndex==index}" v-for="(item,index) in category" :key="index">
							{{item.MALL_CATEGORY_NAME}}
						</li>
					</ul>
				</div>
			</van-col>
			<van-col span="18">
				<div class="tabCategorySub">
					<van-tabs v-model="active" @click="onClickCategorySub">
						<van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

						</van-tab>
					</van-tabs>
				</div>
				<div id="list-div">
					<van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
						<van-list v-model="loading" :finished="finished" @load="onLoad">
							<div class="list-item" v-for="(item,index) in goodList" :key="index">
								<div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror="errorImg" /></div>
								<div class="list-item-text" @click="goGoodsInfo(item.ID)">
									<div>{{item.NAME}}</div>
									<div class="">￥{{item.ORI_PRICE}}</div>
								</div>
							</div>
						</van-list>
					</van-pull-refresh>

				</div>
			</van-col>
		</van-row>
	</div>

</template>

<script>
	import axios from 'axios'
	import url from '@/service.config.js'
	import { Toast } from 'vant'
	import errorImg from '@/assets/images/errorimg.png'
	export default {
		data() {
			return {
				category: [],
				categoryIndex: 0,
				categorySub: [],
				active: 0,
				loading: false, //上啦加载使用
				finished: false, //下拉加载是否没有数据
				list: [],
				isRefresh: false, //下拉加载
				categorySubId: '', //商品子分类ID
				page: 1, //商品列表的页数
				goodList: [], //商品信息
				errorImg: 'this.src="' + errorImg + '"' //错误图片显示路径

			}
		},
		created() {
			this.getCategory();
		},
		methods: {
			//点击大类的方法
			clickCategory(index, categoryId) {
				this.categoryIndex = index
				this.getCategorySubList(categoryId)
			},
			//点击小类方法
			onClickCategorySub(index) {

				this.categorySubId = this.categorySub[index].ID
				this.goodList = []
				this.finished = false
				this.page = 1
				this.onLoad()
			},
			getCategory() {
				axios({
						url: url.getCategoryList,
						method: 'get',
					})
					.then(response => {

						if(response.data.code == 200 && response.data.message) {
							this.category = response.data.message
							this.getCategorySubList(response.data.message[0].ID)
						} else {
							Toast('服务器错误，数据取得失败')
						}

					})
					.catch(error => {
						console.log(error)
					})
			},

			//根据大类ID读取小类类别列表
			getCategorySubList(categoryId) {
				axios({
						url: url.getCategorySubList,
						method: 'post',
						data: {
							categoryId: categoryId
						}
					})
					.then(response => {
						if(response.data.code == 200 && response.data.message) {
							this.categorySub = response.data.message
							this.categorySubId = response.data.message[0].ID
							this.goodList = []
							this.active = 0
							this.page = 1
							this.onLoad()
						} else {
							Toast('服务器错误，数据取得失败')
						}
					})
					.catch(error => {
						console.log(error)
					})
			},
			onLoad(flag) {
				setTimeout(() => {
					this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
					this.getGoodsListByCategorySubID()
				}, 1000)
			},
			onRefresh() {
				setTimeout(() => {
					this.isRefresh = false;
					this.finished = false;
					this.page = 1
					this.getGoodsListByCategorySubID(true)
				}, 1000)
			},
			getGoodsListByCategorySubID(flag) {
				let page = this.page
				let categorySubId = this.categorySubId
				this.loading = false;
				this.isRefresh = false;
				axios({
					url: url.getGoodsListByCategorySubID,
					method: 'post',
					data: {
						page: page,
						categorySubId: categorySubId
					}
				}).then((response) => {
					if(flag) this.goodList = []
					if(response.data.code == 200 && response.data.message.length) {
						this.page++
							this.goodList = this.goodList.concat(response.data.message)
					} else {
						console.log("暂无更多数据")
						this.finished = true;
					}
					this.loading = false;

				}).catch((err) => {
					this.finished = true;
					console.log(err)
				})
			},
			getGoodList() {
				axios({
						url: url.getGoodsListByCategorySubID,
						method: 'post',
						data: {
							categorySubId: this.categorySubId,
							page: this.page
						}
					})
					.then(response => {
						console.log(response)
						if(response.data.code == 200 && response.data.message.length) {
							this.page++
								this.goodList = this.goodList.concat(response.data.message)
						} else {
							this.finished = true;
						}
						this.loading = false;
						console.log(this.finished)
					})
					.catch(error => {
						console.log(error)
					})
			},
			goGoodsInfo(id) {
				this.$router.push({
					name: 'Goods',
					params: {
						goodsId: id
					}
				})
			}
		},
		mounted() {
			let winHeight = document.documentElement.clientHeight
			document.getElementById("leftNav").style.height = winHeight - 46 + 'px'
			document.getElementById('list-div').style.height = winHeight - 90 + 'px'
		}

	}
</script>

<style>
	#leftNav ul li {
		line-height: 2rem;
		border-bottom: 1px solid #E4E7ED;
		padding: 3px;
		font-size: 0.8rem;
		text-align: center;
	}
	
	.categoryActive {
		background-color: #E4E7ED;
		;
	}
	
	.list-item {
		text-align: center;
		line-height: 80px;
		border-bottom: 1px solid #f0f0f0;
		background-color: #fff;
	}
	
	#list-div {
		overflow: scroll;
	}
	
	.list-item {
		display: flex;
		flex-direction: row;
		font-size: 0.8rem;
		border-bottom: 1px solid #f0f0f0;
		background-color: #fff;
		padding: 5px;
	}
	
	#list-div {
		overflow: scroll;
	}
	
	.list-item-img {
		flex: 8;
	}
	
	.list-item-text {
		flex: 16;
		margin-top: 10px;
		margin-left: 10px;
	}
</style>