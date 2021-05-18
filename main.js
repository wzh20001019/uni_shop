import Vue from 'vue'
import App from './App'

import { $http } from '@escook/request-miniprogram'

uni.$http = $http

// 配置请求根路径
$http.baseUrl = 'https://www.uinav.com'

// 请求拦截
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}

// 响应拦截
$http.afterRequest = function () {
  uni.hideLoading()
}

uni.showMsg = function(title = '获取数据失败', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()