
Page({
	data: {
	},
	onLoad(option) {
		if (option) {
			this.setData({
                globalOption: option,
                's_password': wx.getStorageSync('s_password'),
			});
		}
    },
    submitButton:function(e){
          var that = this;
          var psw1= e.detail.value.psw1;
          var psw2= e.detail.value.psw2;
          console.log(psw1);
          if(psw1 === wx.getStorageSync('s_password')){
          wx.request({
            url: 'http://localhost:8080/OnlineExam/student/modifypswWechat',
              method:'POST',
              header:{'content-type':'application/x-www-form-urlencoded'},             
              data:{
                'account': wx.getStorageSync('s_account'),
                'password': psw2,
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
            }else{
                wx.showToast({
                    title: '原密码输入错误',
                    duration:2000,
                })                
            }
        },
	onShareAppMessage() {},
	onShareTimeline() {},
	onShow() {
		this.init();
	},
	async init() {}
});
