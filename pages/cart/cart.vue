<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <my-address></my-address>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>

    <uni-swipe-action>
      <!-- 基础用法 -->
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item :right-options="options" @click="onClick(goods)">
          <my-goods :goods="goods"
                    :show-radio="true"
                    :show-num="true"
                    @radio-change="radioChangeHandler"
                    @num-change="numberChangeHandler"
          >
          </my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    
    <my-settle></my-settle>
  </view>
  
  <!-- 空白购物车区域 -->
    <view class="empty-cart" v-else>
      <image src="/static/cart_empty@2x.png" class="empty-img"></image>
      <text class="tip-text">空空如也~</text>
    </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'

  // 按需导入 mapGetters 这个辅助方法
  import {
    mapState,
    mapGetters,
    mapMutations
  } from 'vuex'

  export default {
    mixins: [badgeMix],
    computed: {
      // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
      ...mapState('m_cart', ['cart']),
    
      // 将 m_cart 模块中的 total 映射为当前页面的计算属性
      ...mapGetters('m_cart', ['total'])
    },

    data() {
      return {
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }]
      }
    },

    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      setBadge() {
        // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
          uni.setTabBarBadge({
            index: 2,
            text: this.total + '', // 注意：text 的值必须是字符串，不能是数字
          })
      },

      radioChangeHandler(e) {
        this.updateGoodsState(e)
      },

      // 商品的数量发生了变化
      numberChangeHandler(e) {
        this.updateGoodsCount(e)
      },

      // 点击了滑动操作按钮
      onClick(goods) {
        this.removeGoodsById(goods.goods_id)
      }
    },

    onShow() {
      // 在页面刚展示的时候，设置数字徽标
      this.setBadge()
    },
    
    onPullDownRefresh: function () {
        // 在页面刚展示的时候，设置数字徽标
        this.setBadge()
    
        wx.stopPullDownRefresh()     //停止下拉刷新
    }
  }
</script>

<style lang="scss">
.cart-container {
  padding-bottom: 50px;
}
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }
  
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
  
    .empty-img {
      width: 90px;
      height: 90px;
    }
  
    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>
