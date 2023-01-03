
Page({
	data: {
		s_account: '',
		s_password: ''
	},

	s_account: function(e) {
	  this.setData({
		s_account: e.detail.value
	  })
	},
	s_password: function (e) {
	  this.setData({
		s_password: e.detail.value
	  })
	},
submitButton:function(){
      console.log("点击按钮!" + "获取到的用户名:" + this.data.s_account + "获取到的密码:" + this.data.s_password)
		var that = this;
        wx.request({
          url: 'http://localhost:8080/OnlineExam/student/findByAccount',
            method:'POST',
            header:{'content-type':'application/x-www-form-urlencoded'},
            data:{
              's_account': that.data.s_account,
              's_password': that.data.s_password
			},
			
            success:function(res){	
				console.log("回调函数:"+res.data)
                var resData = res.data;
                if(resData == true){
					wx.request({
						url: 'http://localhost:8080/OnlineExam/student/findByAccountWechat',
						  method:'POST',
						  header:{'content-type':'application/x-www-form-urlencoded'},
						  data:{
							's_account': that.data.s_account,
							's_password': that.data.s_password							  
						  },

						  success: (res)=>{						
							console.log(res.data.id+res.data.account+res.data.background+res.data.username+res.data.class1+res.data.sex+res.data.location+res.data.telephone)
							//console.log(res.data+res.data.id+res.data.account+res.data.background+res.data.username)
							var resDataid = res.data.id;
							var resDataaccount = res.data.account;						  
							var resDatabackground = res.data.background;
							var resDatausername = res.data.username;
							var resDataclass1 = res.data.class1;
							var resDatasex = res.data.sex;
							var resDatalocation = res.data.location;
							var resDatatelephone = res.data.telephone;
							var resDatapassword = res.data.password;
							wx.setStorageSync("s_id", resDataid);			
							wx.setStorageSync("s_username", resDatausername);
							wx.setStorageSync("s_background", resDatabackground);					
							wx.setStorageSync("s_account", resDataaccount);
							wx.setStorageSync("s_class1",resDataclass1);
							wx.setStorageSync("s_sex", resDatasex);	
							wx.setStorageSync("s_location", resDatalocation);	
                            wx.setStorageSync("s_telephone", resDatatelephone);
                            wx.setStorageSync("s_password", resDatapassword);
                            
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
                                    wx.showToast({
                                        title: '登录成功',
                                        duration:2000,
                                    })
									wx.navigateTo({
										url: 'index'
									  })
								},					  
							})
						},
						})
					}
				else{			
                    wx.showToast({
                        title: '登录失败',
                        duration:2000
                    })
                }
            }
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
		this.init();
	},
	async init() {}
});
