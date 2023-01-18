<template>
	<view>
		
		<!-- 选择地址 -->
		<view class="address-choose-box">
			<button type="primary" class="mini-btn" class="chose-btn">请选择收货地址+</button>
		</view>



		<!-- 渲染收货信息的盒子 -->
		<view class="address-info-box">
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：<text>escook</text></view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：<text>138XXXX5555</text></view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx </view>
			</view>
		</view>


		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	export default {
		name: "my-address",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	// 选择收货地址的盒子
	.address-choose-box {
		height: 90px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.address-border {
		display: block;
		width: 100%;
		height: 5px;
	}

	.chose-btn {
		width: 150px;
		height: 30px;
		font-size: 12px;
	}
</style>
