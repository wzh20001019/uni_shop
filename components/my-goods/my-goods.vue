<template>
  <view>
    <view class="goods-item">
      <!-- 商品左侧图片区域 -->
      <view class="goods-item-left">
        <radio :checked="goods.goods_state"
               v-if="showRadio"
               color="#C00000"
               @click="radioChangeHandler"
        >
        </radio>
        <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
      </view>
      <!-- 商品右侧信息区域 -->
      <view class="goods-item-right">
        <!-- 商品标题 -->
        <view class="goods-name">{{goods.goods_name}}</view>
        <view class="goods-info-box">
          <!-- 商品价格 -->
          <view class="goods-price">￥{{goods.goods_price | toFixed}}</view>
          
          <!-- 商品数量 -->
          <uni-number-box :min="1"
                          v-model="goods.goods_count"
                          v-if="showNum"
                          @change="numChangeHandler"
          >
          </uni-number-box>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "my-goods",
    computed: {
      ...mapGetters('m_cart', ['total'])
    },

    data() {
      return {

      }
    },

    props: {
      goods: {
        type: Object,
        default: {}
      },
      
      // 是否展示图片左侧的 radio
      showRadio: {
        type: Boolean,
        default: false
      },
      
      showNum: {
        type: Boolean,
        default: false
      }
    },
    
    methods: {
      radioChangeHandler() {
        this.$emit('radio-change', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      
      numChangeHandler(val) {
        this.setBadge()

        this.$emit('num-change', {
          goods_id: this.goods.goods_id,
          goods_count: +val       //  +val  相当于  Number(val)    +'123' == 123
        })
      },
      
      setBadge() {
        // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
          uni.setTabBarBadge({
            index: 2,
            text: this.total + '', // 注意：text 的值必须是字符串，不能是数字
          })
        
      }
    },

    filters: {
      toFixed(num) {
        return Number(num).toFixed(2)
      }
    },
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 10px 5px;
    // 让 goods-item 项占满整个屏幕的宽度
    width: 750rpx;
    // 设置盒模型为 border-box
    box-sizing: border-box;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 5px;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }
      
      .goods-info-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
</style>
