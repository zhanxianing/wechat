Page({
    data: {},
    goredirectTo:function(e){
        wx.request({
            url: 'http://localhost:8080/OnlineExam/getTestWechat',
              method:'POST',
              header:{'content-type':'application/x-www-form-urlencoded'},
              data:{
                'e_id': wx.getStorageSync('e_id'),
                'e_method':wx.getStorageSync('e_method'),
                'account':wx.getStorageSync('s_account')
              },    
              success: (res)=>{
                console.log(res.data);
                var resDatatime = res.data.time*60*1000;
                var resDataeiid = res.data.anticheating;
                wx.setStorageSync("time", resDatatime);
                wx.setStorageSync("exam", res.data);
                wx.setStorageSync("ei_id", resDataeiid);
                wx.request({
                    url: 'http://localhost:8080/OnlineExam/getExamSingleWechat',
                    method:'POST',
                    header:{'content-type':'application/x-www-form-urlencoded'},
                    data:{
                        'e_id': wx.getStorageSync('e_id'),
                        'e_method':wx.getStorageSync('e_method'),
                    },  
                    success: (res)=>{   
                        console.log(res);
                        console.log(res.data);
                        wx.setStorageSync("examlist1", res.data);
                        wx.request({
                            url: 'http://localhost:8080/OnlineExam/getExamMultipleWechat',
                            method:'POST',
                            header:{'content-type':'application/x-www-form-urlencoded'},
                            data:{
                                'e_id': wx.getStorageSync('e_id'),
                                'e_method':wx.getStorageSync('e_method'),
                            },  
                            success: (res)=>{   
                                console.log(res);
                                console.log(res.data);
                                wx.setStorageSync("examlist2", res.data);
                                wx.request({
                                    url: 'http://localhost:8080/OnlineExam/getExamJudgeWechat',
                                    method:'POST',
                                    header:{'content-type':'application/x-www-form-urlencoded'},
                                    data:{
                                        'e_id': wx.getStorageSync('e_id'),
                                        'e_method':wx.getStorageSync('e_method'),
                                    },  
                                    success: (res)=>{   
                                        console.log(res);
                                        console.log(res.data);
                                        wx.setStorageSync("examlist3", res.data);
                                        wx.request({
                                            url: 'http://localhost:8080/OnlineExam/getExamBlankWechat',
                                            method:'POST',
                                            header:{'content-type':'application/x-www-form-urlencoded'},
                                            data:{
                                                'e_id': wx.getStorageSync('e_id'),
                                                'e_method':wx.getStorageSync('e_method'),
                                            },  
                                            success: (res)=>{
                                                console.log(res);
                                                console.log(res.data);
                                                wx.setStorageSync("examlist4", res.data);   
                                                wx.request({
                                                    url: 'http://localhost:8080/OnlineExam/getExamShortWechat',
                                                    method:'POST',
                                                    header:{'content-type':'application/x-www-form-urlencoded'},
                                                    data:{
                                                        'e_id': wx.getStorageSync('e_id'),
                                                        'e_method':wx.getStorageSync('e_method'),
                                                    },     
                                                    success: (res)=>{
                                                        console.log(res);
                                                        console.log(res.data);
                                                        wx.setStorageSync("examlist5", res.data);   
                                                        wx.redirectTo({
                                                            url: '/pages/test'
                                                          })
                                                    }                                                                            
                                            })                              
                                    }
                            })
                            }
                        })
                    }
                    })
                    },
                })
    },
})
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
			'exam': wx.getStorageSync('exam'),        
		  })	
		this.init();
	},
	async init() {}
});
