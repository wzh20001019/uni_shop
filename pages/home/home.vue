<template>
	<view>
    <view class="search-box">
      <my-search @click="goSearch"></my-search>
    </view>
		<swiper :indicator-dots="true"
            :autoplay="true"
            indicator-color="#efefef"
            indicator-active-color="#55e7fc"
            :interval="3000"
            :duration="1000"
            circular=true
    >
		  <swiper-item v-for="(item, index) in swiperList" :key="index">
		    <navigator class="swiper-item" :url="'/subPkg/goods_detail/goods_detail?goods_id=' + item.goods_id" >
          <image :src="item.image_src"></image>
        </navigator>
		  </swiper-item>
		</swiper>
    <view class="nav-list">
      <view class="nav-item"
            v-for="(item, i) in navList"
            :key="i"
            @click="navClickHandler(item)"
      >
        <image :src="item.image_src" class="nav-img"></image>
        <!-- <text>{{item.name}}</text> -->
      </view>
    </view>
    
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src"
                   :style="{width: item.product_list[0].image_width + 'rpx'}"
                   mode="widthFix"
            >
            </image>
          </navigator>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <navigator class="right-img-item"
                  v-for="(item2, i2) in item.product_list"
                  :key="i2"
                  v-if="i2 !== 0"
                  :url="item2.url"
            >
              <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
        navList: [],
        floorList: []
			};
		},

    methods: {
      goSearch() {
        uni.navigateTo({
          url: '/subPkg/search/search'
        })
      },
      async getSwiperList() {
        try {
          const { data } = await uni.$http.get('/api/public/v1/home/swiperdata')
          if(data.meta.status !== 200) return uni.showMsg()
          
          this.swiperList = data.message
        } catch (err) {
          uni.showMsg(err.Message)
        }
      },
      
      async getNavList() {
        try {
          const { data } = await uni.$http.get('/api/public/v1/home/catitems')
          if (data.meta.status !== 200) return uni.showMsg()
          
          this.navList = data.message
        } catch (err) {
          uni.showMsg(err.message)
        }
      },
      
      async getFloorList() {
        try{
          const { data } = await uni.$http.get('/api/public/v1/home/floordata')
          if (data.meta.status !== 200) return uni.showMsg()
          
          data.message.forEach(floor => {
            floor.product_list.forEach(prod => {
              prod.url = '/subPkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
            })
          })
          
          this.floorList = data.message
        } catch (err) {
          uni.showMsg(err.message)
        }
      },

      navClickHandler(item) {
        if(item.name === '分类') {
          uni.switchTab({
            url: '/pages/category/category'
          })
        }
      }
    },
    
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    }
	}
</script>

<style lang="scss">
swiper {
  margin: 0 auto;
  width: 100vw;
  height: 350rpx;
  overflow: hidden;
}

.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}

.swiper-item {
  image {
    width: 100vw;
  }
}

.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 30rpx auto;
}

.nav-img {
  width: 128rpx;
  height: 140rpx;
}

.floor-title {
  display: flex;
  margin-bottom: 16rpx;
  width: 100vw;
  height: 60rpx;
}

.floor-item {
  margin-top: 60rpx;
}

.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}
</style>
