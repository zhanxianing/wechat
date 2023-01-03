Page({
	data: {
	},
	test:function(e){
        wx.setStorageSync("e_id", e.currentTarget.dataset.e_id);
        wx.setStorageSync("e_method",e.currentTarget.dataset.e_method);
        wx.navigateTo({
            url: 'camera'
        })
	},
    rank:function(e){
		console.log("点击按钮!" + "获取到的id:" + e.currentTarget.dataset.e_id)
		wx.request({
			url: 'http://localhost:8080/OnlineExam/getStudentWechatExaminfo',
			  method:'POST',
			  header:{'content-type':'application/x-www-form-urlencoded'},
			  data:{
                'e_id': e.currentTarget.dataset.e_id,
                'e_method':e.currentTarget.dataset.e_method
			  },	
			  success: (res)=>{	 
                console.log(res);
                console.log(res.data);
                wx.setStorageSync("examinfolist", res.data); 
                wx.request({
                    url: 'http://localhost:8080/OnlineExam/getStudentWechatRank',
                      method:'POST',
                      header:{'content-type':'application/x-www-form-urlencoded'},
                      data:{
                        'e_id': e.currentTarget.dataset.e_id,
                        'e_method':e.currentTarget.dataset.e_method
                      },  
                      success: (res)=>{	
                        wx.setStorageSync("ranklist", res.data);
                        wx.navigateTo({
                            url: 'rank'
                        })
                  },
                })
              }   
            })    
    },
	onLoad(option) {
		this.setData({
			'examlist': wx.getStorageSync('examlist'),
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
		this.init();
	},
	async init() {}
});
