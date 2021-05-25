<template>
  <view class="my-container">
    <!-- 未登录状态 -->
    <my-login v-if="!token"></my-login>
    
    <!-- 登录状态 -->
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'

  import { mapState } from 'vuex'
  export default {
    mixins: [badgeMix],
    computed: {
      ...mapState('m_user', ['token'])
    },
 
    data() {
      return {

      }
    },
    methods: {
      
    },

    onLoad() {}
  }
</script>

<style lang="scss">
page,
.my-container {
  height: 100%;
}
</style>
