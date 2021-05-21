<template>
  <view v-if="goods_info.goods_id">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true"
      indicator-color="#efefef" indicator-active-color="#55e7fc">
      <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>

    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">￥{{goods_info.goods_price}}</view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{goods_info.goods_name}}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>

    <!-- 商品详情信息 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>

    <!-- 商品导航组件 -->
    <view class="goods_nav">
      <!-- fill 控制右侧按钮的样式 -->
      <!-- options 左侧按钮的配置项 -->
      <!-- buttonGroup 右侧按钮的配置项 -->
      <!-- click 左侧按钮的点击事件处理函数 -->
      <!-- buttonClick 右侧按钮的点击事件处理函数 -->
      <uni-goods-nav :fill="true"
                     :options="options"
                     :buttonGroup="buttonGroup"
                     @click="onClick"
                     @buttonClick="buttonClick"
      />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goods_info: {},
        // 左侧按钮组的配置对象
        options: [{
          icon: 'shop',
          text: '店铺'
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        // 右侧按钮组的配置对象
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      }
    },

    methods: {
      async getGoodsInfo(id) {
        try {
          const {
            data
          } = await uni.$http.get('/api/public/v1/goods/detail', {
            goods_id: id
          })
          if (data.meta.status !== 200) return uni.showMsg()

          // 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题
          data.message.goods_introduce = data.message.goods_introduce.replace(/<img /g,
            '<img style="display:block;" ')

          this.goods_info = data.message
          console.log(this.goods_info)
        } catch (err) {
          uni.showMsg(err.message)
        }
      },

      preview(i) {
        uni.previewImage({
          current: i,
          urls: this.goods_info.pics.map(item => {
            return item.pics_big
          })
        })
      },
      
      onClick(e) {
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      
      buttonClick(e) {
        console.log(e)
      }
    },

    onLoad(options) {
      let goods_id = options.goods_id
      this.getGoodsInfo(goods_id)
    }
  }
</script>

<style lang="scss" scoped>
  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  // 商品信息区域的样式
  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .price {
      color: #c00000;
      font-size: 18px;
      margin: 10px 0;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
        padding-right: 10px;
      }

      // 收藏区域
      .favi {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }

    // 运费
    .yf {
      margin: 10px 0;
      font-size: 12px;
      color: gray;
    }
  }
  
  .goods-detail-container {
    // 给页面外层的容器，添加 50px 的内padding，
    // 防止页面内容被底部的商品导航组件遮盖
    padding-bottom: 50px;
  }
  
  .goods_nav {
    // 为商品导航组件添加固定定位
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
