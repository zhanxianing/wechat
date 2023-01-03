
Page({
	data: {
		radio1: '1',
		radio1Label: '',
		input1: '',
		input: '',
        textarea: '',
    },
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
            'errorquestions1': wx.getStorageSync('errorquestions'),
		  })	 
		this.init();
	},
	async init() {},
	changeRadio1(evt) {
		let value = evt.detail.value;
		let radio1Datas = this.data.radio1Datas;

		let radio1Label = this.data.radio1Label;
		for (var i = 0, len = radio1Datas.length; i < len; ++i) {
			radio1Datas[i].checked = radio1Datas[i].value == value;
			if (radio1Datas[i].checked) {
				radio1Label = radio1Datas[i].label;
			}
		}
		this.setData({ radio1Label, radio1Datas });
	}
});
