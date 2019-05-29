<!--
	作者：dzMoon
	时间：2019-05-21
	描述：首页
-->
<template>
	<div>
		<!--搜索框-->
		<div class="search-bar">
			<van-row gutter="5">
				<van-col span="3"><img :src="locationIcon" width="80%" class="location-icon" /></van-col>
				<van-col span="16">
					<input type="text" class="search-input" />
				</van-col>
				<van-col span="5">
					<van-button size="mini">查找</van-button>
				</van-col>
			</van-row>
		</div>
		<!--轮播图-->
		<div class="swiper-area">
			<van-swipe :autoplay="3000">
				<van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
					<img v-lazy="banner.image" width="100%" />
				</van-swipe-item>
			</van-swipe>
		</div>
		<div class="type-bar">
			<div v-for="(cate,index) in category" :key="index">
				<img v-lazy="cate.image" width="90%" />
				<span>{{cate.mallCategoryName}}</span>
			</div>
		</div>
		<!--AD banner area-->
		<div class="ad-banner">
			<img v-lazy="adBanner" width="100%">
		</div>
		<!--Recommend goods area-->
		<div class="recommend-area">
			<div class="recommend-title">
				商品推荐
			</div>
			<div class="recommend-body">
				<swiper :options="swiperOption">
					<swiper-slide v-for="(item,index) in recommendGoods " :key="index">
						<div class="recommend-item">
							<img :src="item.image" width="80%">
							<div>{{item.goodsName}}</div>
							<div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
						</div>
					</swiper-slide>
				</swiper>
			</div>
		</div>
		<!--floor  area-->
		<floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
		<floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
		<floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>
		<!-- hot area-->
		<!--Hot Area-->
		<div class="hot-area">
			<div class="hot-title">热卖商品</div>
			<div class="hot-goods">
				<van-list>
					<van-row gutter="20">
						<van-col span="12" v-for="( item, index) in hotGoods" :key="index">
							<goods-info :goodsItem="item"></goods-info>
						</van-col>
					</van-row>
				</van-list>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import 'swiper/dist/css/swiper.css'
	import swiperDefault from '../swiper/swiperDefault'
	import floorComponent from '../component/floorComponent'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { toMoney } from '@/filter/moneyFilter.js'
	import goodsInfo from '../component/goodsInfoComponent'
	import service from '@/service.config'
	export default {
		data() {
			return {
				locationIcon: require("@/assets/images/location.png"),
				bannerPicArray: [],
				category: '',
				adBanner: '',
				recommendGoods: '',
				floor1: [],
				floor2: {},
				floor3: {},
				floorName: [],
				swiperOption: {
					slidesPerView: 3
				},
				hotGoods: []

			}
		},
		components: {
			swiperDefault,
			floorComponent,
			swiper,
			floorComponent,
			swiperSlide,
			goodsInfo
		},
		filters: {
			moneyFilter(money) {
				return toMoney(money)
			}
		},
		created() {
			axios.get(service.getShoppingMallInfo, {})
				.then(res => {
					console.log(res.data.data)
					if(res.status == 200) {
						this.category = res.data.data.category;
						this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS //获得广告图片
						this.bannerPicArray = res.data.data.slides //轮播图片
						this.recommendGoods = res.data.data.recommend //推荐商品
						this.floor1 = res.data.data.floor1 //推荐商品
						this.floor2 = res.data.data.floor2 //推荐商品
						this.floor3 = res.data.data.floor3 //推荐商品
						this.floorName = res.data.data.floorName //推荐商品
						this.hotGoods = res.data.data.hotGoods //热卖商品
					}
				}).catch(error => {
					console.log(error)
				})
		}
	}
</script>

<style scoped>
	.search-bar {
		height: 2.2rem;
		background-color: #e5017d;
		line-height: 2.2rem;
		width: 100%;
		overflow: hidden;
	}
	
	.search-input {
		width: 100%;
		height: 1.3rem;
		border-top: 0px;
		border-left: 0px;
		border-right: 0px;
		border-bottom: 1px solid 1px !important;
		background-color: #e5017d;
		color: #fff;
	}
	
	.location-icon {
		padding-top: .2rem;
		padding-left: .3rem;
	}
	
	.swiper-area {
		width: 100%;
		height: auto;
	}
	
	.type-bar {
		background-color: #fff;
		margin: 0 .3rem .3rem .3rem;
		border-radius: .3rem;
		font-size: 14px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}
	
	.type-bar div {
		padding: .3rem;
		font-size: 12px;
		text-align: center;
	}
	
	.recommend-area {
		background-color: #fff;
		margin-top: .3rem;
	}
	
	.recommend-title {
		border-bottom: 1px solid #eee;
		font-size: 14px;
		padding: .2rem;
		color: #e5017d;
	}
	
	.recommend-body {
		border-bottom: 1px solid #eee;
	}
	
	.recommend-item {
		width: 99%;
		border-right: 1px solid #eee;
		font-size: 12px;
		text-align: center;
	}
	
	.floor-anomaly {
		display: flex;
		flex-direction: row;
		background-color: #fff;
		border-bottom: 1px solid #ddd;
	}
	
	.floor-anomaly div {
		width: 10rem;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.floor-one {
		border-right: 1px solid #ddd;
	}
	
	.floor-two {
		border-bottom: 1px solid #ddd;
	}
	
	.floor-rule {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background-color: #fff;
	}
	
	.floor-rule div {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 10rem;
		border-bottom: 1px solid #ddd;
	}
	
	.floor-rule div:nth-child(odd) {
		border-right: 1px solid #ddd;
	}
	
	.hot-area {
		text-align: center;
		font-size: 14px;
		height: 1.8rem;
		line-height: 1.8rem;
	}
	
	.van-list {
		overflow: hidden;
	}
</style>