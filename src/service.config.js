const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo:BASEURL+'index',
    getGoodsInfo:BASEURL+'getGoodsInfo',
    registerUser:LOCALURL+'user/register',   //用户注册接口
    loginUser:LOCALURL+'user/login',   //用户登陆接口
    getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo',  //商品详情接口
    getCategoryList:LOCALURL+'goods/getCategoryList',         //得到大类信息
    getCategorySubList:LOCALURL+'goods/getCategorySubList',   //得到小类列表
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID'   //得到小类信息

}

module.exports = URL