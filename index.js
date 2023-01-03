
Page({
	data: {
    },
    checkexam:function(e){
        wx.request({
            url: 'http://localhost:8080/OnlineExam/getAllExamWechat',
              method:'POST',
              dataType:'jsonp',
              method:'POST',
              header: { 
                'Content-Type': 'application/json'
              },

              success: (res)=>{						
                console.log(res);
                console.log(res.data);
                var list = JSON.parse(res.data);
                console.log(list);
                wx.setStorageSync("examlist", list);
                wx.navigateTo({
                    url: 'checktest'
                  })
            },					  
        })
    },
    checktest:function(e){
        var account = wx.getStorageSync("s_account");
        console.log(account);
		wx.request({
            url: 'http://localhost:8080/OnlineExam/getAccountWechatExaminfo',
            method:'POST',
            header:{'content-type':'application/x-www-form-urlencoded'},
		    data:{
                'account': account,          
              },
              success: (res)=>{	
                console.log(res.data);
                wx.setStorageSync("gradelist1", res.data); 
                wx.navigateTo({
                    url: 'checkgrade'
                  })                           
            } 
            })
    },
    checkerror:function(e){
        var account = wx.getStorageSync("s_account");
        console.log(account);
        wx.request({
              url: 'http://localhost:8080/OnlineExam/getStudentWError',  
              method:'POST',
              header:{'content-type':'application/x-www-form-urlencoded'},
              data:{
                  'account': account,          
                },
              success: (res)=>{						       
                wx.setStorageSync("errorquestions", res.data);   
                wx.navigateTo({
                    url: 'errorbook'
                })
              },					  
        })
    },
	test:function(e){
        wx.setStorageSync("e_id", e.currentTarget.dataset.e_id);
        wx.setStorageSync("e_method",e.currentTarget.dataset.e_method);
        wx.navigateTo({
            url: 'camera'
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
			'examlist': wx.getStorageSync('examlist'),
		  })	  
		this.init();
	},
	async init() {},
});
