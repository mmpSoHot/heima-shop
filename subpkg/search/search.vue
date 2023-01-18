<template>
	<view>
		<view class="search-area">
			<uni-search-bar @confirm="search" @input="input" :radius="100" :cancelButton="none" :bgColor="'#ffffff'">
			</uni-search-bar>
		</view>

		<view class="sugg-list" v-if="searchResult.length !== 0">
			<view class="sugg-item" v-for="(v,i) in searchResult" @click="goToDetail(v)">
				<view class="goods-name">{{v.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>


		<!-- 历史记录 -->
		<view class="history-list">
			<view class="history-title">
				<view>搜索历史</view>
				<uni-icons type="trash" size="30"></uni-icons>
			</view>
			<view class="history-body">

				<uni-tag :text="v" v-for="(v,i) in historys" :key="i" @click="gotoGoodsList(v)"></uni-tag>
			</view>

		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				kw: "",
				searchResult: [],
				historyList: ['a', 'app', 'apple']
			}
		},
		computed: {
			historys() {
				return [...this.historyList].reverse()
			}
		},
		onLoad() {

			const historyList = uni.getStorageSync("kw")
			this.historyList = JSON.parse(historyList || '[]')
		},
		methods: {
			gotoGoodsList(v) {
				uni.navigateTo({
					url: "/subpkg/goods_list/goods_list?query=" + v
				})
			},
			saveSearchHistory(v) {
				//利用集合实现去重复
				const mySet = new Set(this.historyList)
				mySet.delete(v)
				mySet.add(v)
				this.historyList = Array.from(mySet)
				//持久化存储

				uni.setStorageSync("kw", JSON.stringify(this.historyList));
			},
			input(e) {
				//防抖处理，防止每次按键都发起请求
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e;
					this.getSearchList();
				}, 500)
			},
			async getSearchList() {
				if (this.kw.length === 0) {
					this.searchResult = []
					return
				}
				const {
					data: res
				} = await uni.$http.get("/api/public/v1/goods/qsearch?query=" + this.kw);
				if (res.meta.status != 200) {
					return uni.$showMsg("数据请求失败")
				}
				this.searchResult = res.message;
				this.saveSearchHistory(this.kw)
			},
			goToDetail(item) {
				uni.navigateTo({
					url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.history-list {
		padding: 0 5px;

		.history-title {
			height: 40px;
			display: flex;
			font-size: 13px;
			justify-content: space-between;
			align-items: center;
		}

		.history-body {
			display: flex;
			flex-wrap: wrap;

			.uni-tag {
				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}

	.search-area {
		background-color: #c00000;
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-list {
		padding: 0 5px;




		.sugg-item {
			display: flex;
			justify-content: space-between;
			padding: 13px 0px;
			border-bottom: solid 1px #efefef;

			.goods-name {
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-size: 14px;
				margin-right: 3px;

			}

		}
	}
</style>
