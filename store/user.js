export default {
  //开启命名空间
  namespaced: true,
  
  //state数据
  state: () => ({
    //地址信息
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    
    //获取token信息
    token: uni.getStorageSync('token') || '',
    
    //用户信息
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
  }),
  
  //方法
  mutations: {
    //更新用户地址   address为传递过来的地址
    updateAddress(state, address) {
      state.address = address
      
      this.commit('m_user/saveAddress')
    },
    
    saveAddress(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    
    // 更新用户的基本信息
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo
      // 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
      this.commit('m_user/saveUserInfoToStorage')
    },
    
    // 将 userinfo 持久化存储到本地
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    
    updateToken(state, token) {
      state.token = token
      
      this.commit('m_user/saveTokenToStorage')
    },
    
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    }
  },
  
  //数据包装器
  getters: {
    addstr(state) {
      if (!state.address.provinceName) return ''
        
      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}