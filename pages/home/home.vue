<template>
	<view>

		<view class="search-box">
			<my-search @click="gotoSearch"></my-search>
		</view>
		<!--轮播图-->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in swiperList" :key="i">

				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!--分类导航区-->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-image"></image>
			</view>
		</view>

		<!--楼层-->
		<view class="floor-list">

			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<!--楼层标题-->

				<image :src="item.floor_title.image_src" class="floor-title"></image>

				<!--楼层图片-->
				<view class="floor-img-box">
					<view class="left-img-box">
						<navigator :url="item.product_list[0].url">
							<image :src="item.product_list[0].image_src"
								:style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
					<view class="right-img-box">
						<navigator class="right-img-box-item" v-for="(_item,_i) in item.product_list" :key="_i"
							:url="_item.url">
							<image :src="_item.image_src" v-if="_i>0" :style="{width:_item.image_width+'rpx'}"
								mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList();
			this.getNavList();
			this.getFloorList();
		},
		methods: {
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get("/api/public/v1/home/floordata")
				if (res.meta.status != 200) {
					return uni.$showMsg("楼层数据加载失败")
				}

				res.message.forEach(function(r) {
					r.product_list.forEach(_r => {
						_r.url = "/subpkg/goods_list/goods_list?" + _r.navigator_url.split("?")[1]
					})

				})
				this.floorList = res.message;
			},
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get("/api/public/v1/home/swiperdata")
				if (res.meta.status != 200) {
					return uni.$showMsg("数据请求失败")
				}

				this.swiperList = res.message;
			},
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get("/api/public/v1/home/catitems")
				if (res.meta.status != 200) {
					return uni.$showMsg("数据请求失败")
				}

				this.navList = res.message;
			},
			navClickHandler(item) {
				if (item.name == '分类') {
					uni.switchTab({
						url: "/pages/cate/cate"
					})
				}
				console.log(item)
			},
			gotoSearch() {
				uni.navigateTo({
					url: "/subpkg/search/search"
				})
			}
		},

	}
</script>

<style lang="scss">
	swiper {
		height: 330;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0px;

		.nav-image {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.floor-item {
		.floor-img-box {
			padding-left: 15rpx;
			display: flex;
		}

		.right-img-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}

	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
