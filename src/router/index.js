import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall' //商城首页
import Register from '@/components/pages/Register' // 注册页面
import Login from '@/components/pages/Login' // 登陆页面
import Goods from '@/components/pages/Goods' // 商品详情页面
import CategoryList from '@/components/pages/CategoryList' // 商品列表页
Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'ShoppingMall',
			component: ShoppingMall
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/goods',
			name: 'Goods',
			component: Goods
		},
		{
			path: '/categoryList',
			name: 'CategoryList',
			component: CategoryList
		}
	]
})