<template>
	<view class="search-container">
	  <view class="search-box">
	    <!-- 使用 uni-ui 提供的搜索组件 -->
	    <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
	  </view>
    
	  <!-- 搜索建议列表 -->
	  <view class="sugg-list" v-if="searchResults.length !== 0">
	    <view class="sugg-item"
            v-for="(item, i) in searchResults"
            :key="i"
            @click="goDetail(item.goods_id)"
      >
	      <view class="goods-name">{{item.goods_name}}</view>
	      <uni-icons type="arrowright" size="16"></uni-icons>
	    </view>
	  </view>
    
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="removeHistoryList"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="clickTag(item)"></uni-tag>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,             //定义一个定时器
        kw: '',                  //搜索关键字
        historyList: [],
        searchResults: []        //关键词对应的数据
			}
		},
    
    methods: {
      input(val) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = val
          this.getSearchResults()
        }, 500)
      },
      
      goDetail(id) {
        uni.navigateTo({
          url: '/subPkg/goods_detail/goods_detail?goods_id=' + id
        })
      },
      
      async getSearchResults() {
        try {
          if (this.kw === '') {
            this.searchResults = []
            return
          }
          const { data } = await uni.$http.get('/api/public/v1/goods/qsearch', {query: this.kw})
          if (data.meta.status !== 200) return uni.showMsg()
          
          this.searchResults = data.message
          this.saveHistroyList()
        } catch(err) {
          uni.showMsg(err.message)
        }
      },
      
      saveHistroyList() {
        const set = new Set(this.historyList)        //将 Array 数组转化为 Set 对象
        set.delete(this.kw)                          //调用 Set 对象的delete 方法，移除对应的元素
        set.add(this.kw)                             //调用 Set 对象的 add 方法，向 Set 中添加元素
        this.historyList = Array.from(set)           //将 Set 对象转化为 Array 数组
        
        // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
         uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      
      removeHistoryList() {
        this.historyList = []
        uni.setStorageSync('kw', '[]')
      },
      
      clickTag(item) {
        uni.navigateTo({
          url: '/subPkg/goods_list/goods_list?query=' + item
        })
      }
    },
    
    computed: {
      historys() {
        return [...this.historyList].reverse()
      }
    },
    
    onLoad() {
        this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    }
	}
</script>

<style lang="scss">
.uni-searchbar {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  position: relative;
  padding: 16rpx;
  /* 将默认的 #FFFFFF 改为 #C00000 */
  background-color: #40b3ff;
}

.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}

.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}

.sugg-list {

  .sugg-item {
    font-size: 12px;
    padding: 13px 7px;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
</style>
