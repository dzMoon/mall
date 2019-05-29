<template>
	<div class="goods-info">
		<div class="goods-image">
			<img v-lazy="goodsItem.image" width="90%" />
		</div>
		<div class="goods-name">{{goodsItem.name}}</div>
		<div class="goods-price">￥{{goodsItem.price | moneyFilter }}</div>
	</div>
</template>

<script>
	import { toMoney } from '@/filter/moneyFilter.js'
	export default {
		props: ['goodsItem'],
		filters: {
			moneyFilter(money) {
				return toMoney(money)
			}
		},
	}
</script>

<style scoped>
	.goods-name {
		padding: 0 8px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>