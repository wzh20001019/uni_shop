<template>
  <view>
    <view class="category-container">
      <!-- 左侧滚动区 -->
      <scroll-view scroll-y="true" class="left-scroll-view" :style="{height: wh + 'px'}">
        <block v-for="(item, i) in categoryList" v-bind:key="i">
          <view :class="['left-scroll-item', i === active ? 'active' : '']" @click="updateActive(i)">{{item.cat_name}}
          </view>
        </block>
        <!-- <view class="left-scroll-item active">xxx</view>
        <view class="left-scroll-item">xxx</view> -->
      </scroll-view>

      <!-- 右侧滚动区 -->
      <scroll-view scroll-y="true" class="right-scroll-view" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view class="right-scroll-item-lv2" v-for="(item, i) in cateLeave2" :key="i">
          <!-- 二级列表 -->
          <view class="lv2-title">
            {{item.cat_name}}
          </view>
          <!-- 三级列表 -->
          <view class="lv3-list">
            <view class="lv3-item" v-for="(item3, i3) in item.children" :key="i3" @click="goGoodsList(item3)">
              <image :src="item3.cat_icon"></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0,
        active: 0,
        scrollTop: 0,
        categoryList: [],
        cateLeave2: []
      };
    },

    methods: {
      async getCategoryList() {
        try {
          const {
            data
          } = await uni.$http.get('/api/public/v1/categories')
          if (data.meta.status !== 200) return uni.showMsg()

          this.categoryList = data.message
          this.cateLeave2 = data.message[0].children
        } catch (err) {
          uni.showMsg(err.message)
        }
      },

      updateActive(index) {
        this.active = index
        this.cateLeave2 = this.categoryList[index].children
        
        this.scrollTop = this.scrollTop ? 0 : 1        //重置滚动条
      },
      
      goGoodsList(item) {
        console.log(item.cat_pid)
        uni.navigateTo({
          url: '/subPkg/goods_list/goods_list?cid=' + item.cat_pid
        })
      }
    },

    onLoad() {
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度动态赋值
      this.wh = sysInfo.windowHeight

      this.getCategoryList()
    }
  }
</script>

<style lang="scss">
  .category-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-item {
        line-height: 60px;
        background-color: #efefef;
        text-align: center;
        font-size: 12px;

        // 激活项的样式
        &.active {
          background-color: #ffffff;
          color: #755bea;
          position: relative;

          // 渲染激活项左侧的红色指示边线
          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }

  .lv2-title {
    font-size: 12px;
    ont-weight: bold;
    text-align: center;
    padding: 30rpx 0;
  }
  
  .lv3-list {
    display: flex;
    flex-wrap: wrap;
  
    .lv3-item {
      width: 33.33%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
  
      image {
        width: 60px;
        height: 60px;
      }
  
      text {
        font-size: 12px;
      }
    }
  }
</style>
