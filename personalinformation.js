Page({
	data: {
			
	},

	onLoad(option) {
		if (option) {
			this.setData({
                globalOption: option,
                's_account': wx.getStorageSync('s_account'),
                's_username':wx.getStorageSync('s_username'),
                's_class1':wx.getStorageSync('s_class1'),
                's_background': wx.getStorageSync('s_background'),
                's_sex':wx.getStorageSync('s_sex'),
                's_telephone':wx.getStorageSync('s_telephone'),	
                's_location':wx.getStorageSync('s_location'),               
			});
		}		
	},
	onShareAppMessage() {},
	onShareTimeline() {},
	onShow() {
		this.init();
	},
	async init() {}
});
