Page({
	data: {	
    },
    submitButton:function(){
        console.log("点击按钮!" + "获取到的用户名:" + this.data.s_account + "获取到的密码:" + this.data.s_password)
          var that = this;
          wx.request({
            url: 'http://localhost:8080/OnlineExam/student/unpdatewechatStudent',
              method:'POST',
              header:{'content-type':'application/x-www-form-urlencoded'},
              
              data:{
                's_account': that.data.s_account,
                's_sex': that.data.s_sex,
                's_telephone': that.data.s_telephone,
                's_class1':that.data.s_class1,
                's_background':that.data.s_background
              },
              
              success:function(res){	
                  console.log("回调函数:"+res.data)
                  var resData = res.data;
                  if(resData != null){
                      wx.showToast({
                          title: '修改成功',
                          duration:2000,
                      })
                    }else{
                        wx.showToast({
                            title: '修改失败',
                            duration:2000,
                        })                        
                    }
                }
            })
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
	}
});
