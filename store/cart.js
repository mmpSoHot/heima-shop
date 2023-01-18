export default {
	// 为当前模块开启命名空间
	namespaced: true,

	// 模块的 state 数据
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync("cart") || '[]'),
	}),

	// 模块的 mutations 方法
	mutations: {

		//添加到购物车
		addToCart(state, goods) {
			const findGoods = state.cart.find((x) => x.goods_id === goods.goods_id);
			if (!findGoods) {
				state.cart.push(goods);
			} else {
				findGoods.goods_count++;
			}

			this.commit("m_cart/saveToStorage")
		},
		//修改商品选中状态
		updateGoodsState(state, goods) {
			const findGoods = state.cart.filter((x) => x.goods_id === goods.goods_id)
			if (findGoods) {
				findGoods.goods_state = goods.goods_state
			}
			this.commit("m_cart/saveToStorage")
		},
		//删除商品
		removeGoods(state, goods) {
			state.cart = state.cart.filter((x) => x.goods_id != goods.goods_id)
			this.commit("m_cart/saveToStorage")
		},
		// 更新购物车中商品的数量
		updateGoodsCount(state, goods) {
			console.log("----->", goods)
			// 根据 goods_id 查询购物车中对应商品的信息对象
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			if (findResult) {
				// 更新对应商品的数量
				findResult.goods_count = goods.goods_count
				// 持久化存储到本地
				this.commit('m_cart/saveToStorage')
			}
		},
		//持久化存储
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		}
	},

	// 模块的 getters 属性
	getters: {
		//统计商品总数量
		total(state) {
			let c = 0
			if (state.cart.length > 0) {
				state.cart.forEach((r) => c += r.goods_count)
			}

			return c
		}
	},
}
