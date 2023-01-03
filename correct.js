Page({
	data: {
        list:[], 
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
			'correctresult': wx.getStorageSync('correctlist'),        
		  })	
        this.init();
    },

	async init() {},
	changeRadio(evt) {
		let value = evt.detail.value;
		let radioDatas = this.data.radioDatas;

		let radioLabel = this.data.radioLabel;
		for (var i = 0, len = radioDatas.length; i < len; ++i) {
			radioDatas[i].checked = radioDatas[i].value == value;
			if (radioDatas[i].checked) {
				radioLabel = radioDatas[i].label;
			}
		}
		this.setData({ radioLabel, radioDatas });
	},
	changeCheckbox(evt) {
		let values = evt.detail.value;
		let checkboxDatas = this.data.checkboxDatas;
		let checkboxLabels = [];
		let checkbox = [];
		for (var i = 0, len = checkboxDatas.length; i < len; ++i) {
			const item = checkboxDatas[i];

			if (values.indexOf(item.value) >= 0) {
				item['checked'] = true;
			} else {
				item['checked'] = false;
			}
			if (item['checked']) {
				checkboxLabels.push(item['label']);
				checkbox.push(item['value']);
			}
		}
		let checkboxLabel = checkboxLabels.join(',');
		this.setData({ checkboxLabel, checkboxDatas });
	}
});
