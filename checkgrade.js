Page({
	data: {
		search: ''
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
                wx.navigateTo({
                    url: 'rank'
                  })
              }   
            })    
    },
    checkclass:function(e){
		wx.request({
			url: 'http://localhost:8080/OnlineExam/getAllWechatCourse',
			  method:'POST',
			  header:{'content-type':'application/x-www-form-urlencoded'},
			  data:{
			  },	
			  success: (res)=>{	 
                console.log(res);
                console.log(res.data);
                wx.setStorageSync("allclass", res.data);   
                wx.navigateTo({
                    url: 'grade'
                  })
              }   
            })      
    },
    checkexamtest:function(e){
		wx.request({
			url: 'http://localhost:8080/OnlineExam/getStudentWechatAnswer2',
			  method:'POST',
			  header:{'content-type':'application/x-www-form-urlencoded'},
			  data:{
                'ei_exam': e.currentTarget.dataset.ei_exam,
                'method':e.currentTarget.dataset.ei_method,
                'count':e.currentTarget.dataset.ei_count,
                "account":wx.getStorageSync('s_account')
			  },	
			  success: (res)=>{	 
                console.log(res);
                console.log(res.data);
                wx.setStorageSync("correctlist", res.data);   
                wx.navigateTo({
                    url: 'correct'
                  })
              }   
            })         
    },
	onLoad(option) {
		this.setData({
			'gradelist1': wx.getStorageSync('gradelist1'),
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
