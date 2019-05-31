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
					<van-tabs v-model="active">
						<van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

						</van-tab>
					</van-tabs>
				</div>
				<div id="list-div">
					<van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
						<van-list v-model="loading" :finished="finished" @load="onLoad">
							<div class="list-item" v-for="item in list" :key="item">
								{{item}}
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

			}
		},
		created() {
			this.getCategory();
		},
		methods: {
			//点击大类的方法
			clickCategory(index, categoryId) {
				this.categoryIndex = index
				this.getGoodsListByCategorySubID(categoryId)

			},
			getCategory() {
				axios({
						url: url.getCategoryList,
						method: 'get',
					})
					.then(response => {

						console.log(response)

						if(response.data.code == 200 && response.data.message) {
							this.category = response.data.message

							this.getGoodsListByCategorySubID(response.data.message[0].ID)
						} else {
							Toast('服务器错误，数据取得失败')
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
			//根据大类ID读取小类类别列表
			getGoodsListByCategorySubID(categoryId) {
				axios({
						url: url.getGoodsListByCategorySubID,
						method: 'post',
						data: {
							categoryId: categoryId
						}
					})
					.then(response => {
						if(response.data.code == 200 && response.data.message) {
							this.categorySub = response.data.message
							this.active = 0
						} else {
							Toast('服务器错误，数据取得失败')
						}
					})
					.catch(error => {
						console.log(error)
					})
			},
			onLoad() {
				setTimeout(() => {
					for(let i = 0; i < 10; i++) {
						this.list.push(this.list.length + 1)
					}
					this.loading = false;
					if(this.list.length >= 40) {
						this.finished = true;
					}
				}, 500)
			},
			onRefresh() {
				setTimeout(() => {
					this.isRefresh = false;
					this.list = [];
					this.onLoad()
				}, 500);
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
</style>