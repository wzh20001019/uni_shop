<template>
	<view>
	    <view class="goods-list">
	      <view v-for="(goods, i) in goodsList"
              :key="i"
              @click="goGoodsItem(goods)"
        >
	        <my-goods :goods="goods"></my-goods>
	      </view>
	    </view>
	  </view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
          query: '',              //查询关键词
          cid: '',                //分类ID
          pagenum: 1,             //页数索引
          pagesize: 15            //每页长度
        },
        isLoding: false,        //是否正在获取数据
        goodsList: [],
        total: 0,                 //总数量
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			}
		},
    
    methods: {
      async getGoodsList(back) {
        try {
          this.isLoding = true
          const { data } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
          
          back && back()      //查看是否存在停止下拉刷新的函数
          
          if (data.meta.status !== 200) return uni.showMsg()
          this.goodsList = [...this.goodsList, ...data.message.goods]
          this.total = data.message.total
          
          this.isLoding = false
        } catch (err) {
          uni.showMsg(err.message)
        }
      },
      
      goGoodsItem(item) {
        uni.navigateTo({
          url: '/subPkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      }
    },
    
    onPullDownRefresh() {
      //重置数据
      this.queryObj.pagenum = 1
      this.isLoding = false
      this.goodsList = []
      this.total = 0
      
      //重新调用获取数据的方法
      this.getGoodsList(() => {
        uni.stopPullDownRefresh()        //停止下拉刷新
      })
    },
    
    onLoad(options) {
      this.queryObj.query = options.query || ''    //传递过来没有此数据 让它为空
      this.queryObj.cid = options.cid || ''
      
      this.getGoodsList()         //页面加载获取列表数据
    },
    
    //上拉监听事件
    onReachBottom() {
      if (this.isLoding) return
      
      //判断是否加载了所有数据
      if (this.goodsList.length === this.total) return uni.showMsg('没有更多数据了')

      this.queryObj.pagenum += 1       //页数 +1
      this.getGoodsList()              //再次获取数据
    }
	}
</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    margin-right: 5px;

    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }

    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>
