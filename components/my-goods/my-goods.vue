<template>
	<view>
		<view class="goods-item">
		  <!-- 商品左侧图片区域 -->
		  <view class="goods-item-left">
		    <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		  </view>
		  <!-- 商品右侧信息区域 -->
		  <view class="goods-item-right">
		    <!-- 商品标题 -->
		    <view class="goods-name">{{goods.goods_name}}</view>
		    <view class="goods-info-box">
		      <!-- 商品价格 -->
		      <view class="goods-price">￥{{goods.goods_price | toFixed}}</view>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		data() {
			return {
				
			}
		},
    
    props: {
      goods: {
        type: Object,
        default: {}
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

</style>
