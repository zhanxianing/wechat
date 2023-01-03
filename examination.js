
Page({
	data: {
		radio1Datas: [
			{ value: '1 ', label: '空或只有一个结点  ', checked: false },
			{ value: '2', label: '高度等于其结点数', checked: false },
			{ value: '3', label: '任一结点无左孩子 ', checked: false },
			{ value: '1', label: '任一结点无右孩子', checked: true }
		],
		radio1: '1',
		radio1Label: '',
		input1: '',
		input: '',
		textarea: ''
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
