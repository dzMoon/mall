<template>
	<div>
		<div class="navbar-div">
			<van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
		</div>
		<div class="topimage-div">
			<img :src="goodsInfo.IMAGE1" width="100%" />
		</div>
		<div class="goods-name">{{goodsInfo.NAME}}</div>
		<div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE}}</div>
		<div>
			<!--
			swipeable 滑动效果
			sticky 吸顶效果
		-->
			<van-tabs swipeable sticky>
				<van-tab title="商品详情">
					<div class="detail" v-html="goodsInfo.DETAIL">

					</div>
				</van-tab>
				<van-tab title="评价">
					正在制作中
				</van-tab>
			</van-tabs>

		</div>
		<div class="goods-bottom">

			<div>
				<van-button size="large" type="primary" @click="addGoodsToCard()">加入购物车</van-button>
			</div>
			<div>
				<van-button size="large" type="danger">直接购买</van-button>
			</div>

		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import url from '@/service.config.js'
	import toMoney from '@/filter/moneyFilter.js'
	import { Toast } from 'vant'
	export default {
		data() {
			return {
				goodsId: '',
				goodsInfo: {} //商品详细数据
			}
		},
		created() {
			this.goodsId = this.$route.params.goodsId
			this.getInfo()
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			getInfo() {

				axios({
						url: url.getDetailGoodsInfo,
						method: 'post',
						data: {
							goodsId: this.goodsId
						}
					})
					.then(response => {
						if(response.data.code == 200 && response.data.message) {
							this.goodsInfo = response.data.message
						} else {
							Toast('服务器错误，数据取得失败')
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
			addGoodsToCard() {
				axios({
					url: url.getCartInfo,
					method: 'post'

				}).then(result => {
					let isHave = result.data.message.find(item => item.goodsId == this.goodsId)
					if(!isHave) {
						this.addGoodsToCardItem()
					} else {
						Toast.fail("商品已存在")
					}
				}).catch(err => {
					Toast.fail(err)
				})

			},
			addGoodsToCardItem() {
				axios({
					url: url.addCart,
					method: 'post',
					data: {
						goodsId: this.goodsInfo.ID,
						Name: this.goodsInfo.NAME,
						price: this.goodsInfo.PRESENT_PRICE,
						image: this.goodsInfo.IMAGE1,
						count: 1
					}
				}).then(result => {
					Toast.success("添加成功")
				}).catch(err => {
					Toast.fail(err)
				})
			}
		},
	}
</script>

<style scoped>
	.detail {
		font-size: 0px;
	}
	
	.goods-name {
		background-color: #fff;
	}
	
	.goods-price {
		background-color: #fff;
	}
	
	.goods-bottom {
		position: fixed;
		bottom: 0px;
		left: 0px;
		background-color: #FFF;
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-flow: nowrap;
	}
	
	.goods-bottom>div {
		flex: 1;
		padding: 5px;
	}
</style>