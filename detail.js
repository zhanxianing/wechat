
Page({
	data: {
        id: "",
		radio1: '1',
		radio1Label: '',
		input1: '',
		input: '',
        textarea: '',
        errorquestions2: wx.getStorageSync('errorquestions'),
    },
    nextQuestion: function () {
        var that = this;
        console.log(this.data.errorquestions2.length);
        if (that.data.id < this.data.errorquestions2.length-1) {
          this.setData({
            id: that.data.id + 1
          });
        }
      },
      lastQuestion: function () {
        var that = this;
        if (that.data.id > 0) {
          this.setData({
            id: that.data.id - 1
          });
          }
    },
    goBack(){
        let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
        let prevPage = pages[pages.length - 2];
        //该部分执行后，会在上一个页面内执行setData操作，将我们选择好的数据保存下来。当我们返回去的时候，页面已经处理完毕，将选择的数据绑定到对应的参数上。    
         wx.navigateBack({
              delta: 1  // 返回上一级页面。
         })
        },
	onLoad(option) {
        this.setData({
            id: parseInt(option.id)
          })
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
            'errorquestions': wx.getStorageSync('errorquestions'),
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
