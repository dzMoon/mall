<template>
	<div>
		<div class="navbar-div">
			<van-nav-bar title='购物车' />
		</div>
		<!--显示购物车中的商品-->
		<div class="cart-list">
			<div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
				<div class="pang-img"><img :src="item.image" width="100%" /></div>
				<div class="pang-text">
					<div class="pang-goods-name">{{item.Name}}</div>

					<div class="pang-control">
						<van-stepper v-model="item.count" />
					</div>
				</div>
				<div class="pang-goods-price">
					<div>
						￥{{item.price |moneyFilter}}
					</div>
					<div>
						x{{item.count}}
					</div>
					<div class="allPrice">
						￥{{item.price*item.count | moneyFilter}}
					</div>

				</div>

			</div>
		</div>
		<!--清空购物车-->

		<!--显示总金额-->
		<div class="totalMoney">
			商品总价：￥ {{totalMoney | moneyFilter}}
		</div>
		<div class="card-title">
			<van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
		</div>
	</div>
</template>

<script>
	import { toMoney } from '@/filter/moneyFilter.js'
	import axios from 'axios'
	import service from '@/service.config.js'
	import {Toast } from "vant"
	export default {
		data() {
			return {
				cartInfo: [], //购物车内的商品
				isEmpty: false //购物车是否为空，不为空则显示true，为空显示false

			}
		},
		created() {
			this.getCardInfo()
		},
		computed: {
			totalMoney() {
				let totalMoney = 0;
				this.cartInfo.forEach((item, index) => {
					totalMoney += item.price * item.count
				})
				return totalMoney
			}
		},
		methods: {
			getCardInfo() {
				axios({
					url: service.getCartInfo,
					method: 'post'

				}).then(result => {

					if(result.data.code == 200) {

						this.cartInfo = result.data.message
					} else {
						Toast.fail("查询失败")
					}
				}).catch(err => {
					Toast.fail(err)
				})
			},
			//清空购物车的商品
			clearCart() {

				axios({
					url: service.clearCart,
					method: 'post'

				}).then(result => {
					if(result.data.code == 200) {
						Toast.success("清空成功")
						this.cartInfo = []
					} else {
						Toast.fail("清空失败")
					}
				}).catch(err => {
					Toast.fail(err)
				})

			}
		},
		filters: {
			moneyFilter(money) {
				return toMoney(money)
			}
		},
	}
</script>

<style>
	.card-title {
		height: 2rem;
		line-height: 2rem;
		background-color: #fff;
		border-bottom: 1px solid #E4E7ED;
		padding: 5px;
		text-align: right;
	}
	
	.cart-list {
		background-color: #fff;
	}
	
	.pang-row {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		padding: 0.5rem;
		font-size: 0.85rem;
		border-bottom: 1px solid #E4E7ED;
	}
	
	.pang-img {
		flex: 6;
	}
	
	.pang-text {
		flex: 14;
		padding-left: 10px;
	}
	
	.pang-control {
		padding-top: 10px;
	}
	
	.pang-goods-price {
		flex: 4;
		text-align: right;
	}
	
	.totalMoney {
		text-align: right;
		background-color: #fff;
		border-bottom: 1px solid #E4E7ED;
		padding: 5px;
	}
</style>