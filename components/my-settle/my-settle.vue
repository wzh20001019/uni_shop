<template>
  <view class="my-settle-container">
    <!-- 全选区域 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheckout" /><text>全选</text>
    </label>

    <!-- 合计区域 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>

    <!-- 结算按钮 -->
    <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  export default {
    name: "my-settle",
    data() {
      return {

      }
    },
    
    computed: {
      ...mapState('m_user', ['token']),
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      ...mapGetters('m_user', ['addstr']),
      
      isFullCheckout() {
        return this.total === this.checkedCount
      }
    },
    
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      
      //全选按钮的  全选/反选
      changeAllState() {
        this.updateAllGoodsState(!this.isFullCheckout)
      },
      
      //点击结算按钮
      settlement() {
        if (!this.checkedCount) return uni.showMsg('请选择商品')
        if (!this.addstr) return uni.showMsg('请填写地址信息')
        if (!this.token) {
          uni.showMsg('请先登录', 1000)
          return setTimeout(() => {
            uni.switchTab({
              url: '/pages/my/my'
            })
          }, 1500)
        }
        
        uni.requestPayment({
          timeStamp: '1621944328573',
          nonceStr: 'wbcdwzh123',
          package: '123',
          signType: 'MD5',
          paySign: 'wzh',
          success (res) {
            // console.log('success')
            // console.log(res)
          },
          fail (res) {
            if (res && res.errMsg === 'requestPayment:fail no permission') {
              uni.showToast({
                title: '支付功能为开发',
                duration: 1000,
                mask: true,       //遮罩层
                icon: 'error'
              })
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .my-settle-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* 底部固定定位 */
    position: fixed;
    bottom: 0;
    left: 0;
    /* 设置宽高和背景色 */
    width: 100%;
    height: 50px;
    background-color: #dddddd;
    padding-left: 5px;
    font-size: 14px;

    .radio {
      display: flex;
      align-items: center;
    }

    .amount {
      color: #c00000;
    }

    .btn-settle {
      height: 50px;
      min-width: 100px;
      background-color: #c00000;
      color: white;
      line-height: 50px;
      text-align: center;
      padding: 0 10px;
    }
  }
</style>
