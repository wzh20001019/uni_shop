<template>
  <view>
    <uni-swipe-action>
      <!-- 基础用法 -->
      <uni-swipe-action-item :right-options="options" @click="onClick">
        <view>基础使用</view>
      </uni-swipe-action-item>
    </uni-swipe-action>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'

  export default {
    mixins: [badgeMix],
    data() {
      return {
        options: [{
          text: '取消',
          style: {
            backgroundColor: '#007aff'
          }
        }, {
          text: '确认',
          style: {
            backgroundColor: '#dd524d'
          }
        }]
      }
    },
    methods: {
      onClick(e) {
        console.log('点击了' + (e.position === 'left' ? '左侧' : '右侧') + e.content.text + '按钮')
      },
      swipeChange(e, index) {
        console.log('当前状态：' + open + '，下标：' + index)
      }
    },

    onLoad() {}
  }
</script>

<style lang="scss">

</style>
