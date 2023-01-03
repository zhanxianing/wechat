Page({
	data: {},
	onLoad(option) {
		if (option) {
			this.setData({
				globalOption: option
			});
		}
	},
	onShareAppMessage() {},
	onShareTimeline() {},
	onShow() {
		this.setData({
            'examinfolist': wx.getStorageSync('examinfolist'),   
            's_username':wx.getStorageSync('s_username'),
            'ranklist':wx.getStorageSync('ranklist')     
		  })	
		this.init();
	},
	async init() {}
});
