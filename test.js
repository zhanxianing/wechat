Page({
	data: {
        list:[], 
        answerlist:[],
        pingData: [{
            "time":'',
          }],
        temp:0,
	},
	onLoad(option) {
		if (option) {
			this.setData({
				globalOption: option
            });
            this.setData({
                pingData: [{
                    "time":wx.getStorageSync('time'),
                  }],
              })
            this.setData({
                listData: this.data.pingData
              });
            this.setCountDown();
		}
    },
    setCountDown: function () {
        let time = 1000;
        let { listData } = this.data;
        let list = listData.map((v, i) => {
            console.log(v.time);
          if (v.time <= 0) {
            v.time = 0;
            this.submitit();
          }
          if(v.time>0){
          let formatTime = this.getFormat(v.time);
          v.time -= time;
          v.countDown = `${formatTime.mm}分${formatTime.ss}秒`;
          }
          return v;
        })
        if(this.data.temp==0){
            this.setData({
            listData: list
            });
            setTimeout(this.setCountDown, time);
        }
      },
    
       // 格式化时间
      getFormat: function (msec) {
        let ss = parseInt(msec / 1000);
        let mm = 0;
        if (ss > 60) {
          mm = parseInt(ss / 60);
          ss = parseInt(ss % 60);
        }
        ss = ss > 9 ? ss : `0${ss}`;
        mm = mm > 9 ? mm : `0${mm}`;
        return {
          ss,
          mm,
        };
      },
      submitit:function(e){
        this.setData({
            temp: 1
          });         
          console.log(wx.getStorageSync("ei_id"));
          console.log(wx.getStorageSync("exam").method);
          console.log(this.data.answerlist);
          wx.removeStorageSync('time');
        wx.request({
            url: 'http://localhost:8080/OnlineExam/addWechatAnswer',
            method:'POST',
            header:{'content-type':'application/x-www-form-urlencoded'},
            data:{
            'ei_id': wx.getStorageSync("ei_id"),
            'method':wx.getStorageSync("exam").method,
            'list1':JSON.stringify(this.data.answerlist),
            'account':wx.getStorageSync('s_account'),
            'examlist1':JSON.stringify(wx.getStorageSync('examlist1')),
			'examlist2': JSON.stringify(wx.getStorageSync('examlist2')),
			'examlist3': JSON.stringify(wx.getStorageSync('examlist3')),
            'examlist4': JSON.stringify(wx.getStorageSync('examlist4')),
            'examlist5': JSON.stringify(wx.getStorageSync('examlist5')),             

            },	
            success: (res)=>{
                wx.showToast({
                    title: '提交成功',
                    duration:2000,
                })                	
                wx.redirectTo({
                    url: 'index'
                  })           
            }
        
        })
      },
      answer(){
        wx.setStorageSync("answerlist",this.data.answerlist);
        wx.navigateTo({
            url: 'answer'
          })  
      },
	onShareAppMessage() {},
	onShareTimeline() {},
	onShow() {
		this.setData({
			'examlist1':wx.getStorageSync('examlist1'),
            'examlist2':wx.getStorageSync('examlist2'),
            'examlist3':wx.getStorageSync('examlist3'),
            'examlist4':wx.getStorageSync('examlist4'),
            'examlist5':wx.getStorageSync('examlist5'),   
            'account': wx.getStorageSync('s_account'),  
            'exam': wx.getStorageSync('exam'),      
		  })	
        this.init();
    },
	async init() {},
    radioChange(e){
        var qq = new Object();
        var answerlist = new Array();
        qq.account=e.currentTarget.dataset.account;
        qq.question=0; 
        qq.questionid=e.currentTarget.dataset.questionid;
        qq.studentanswer = e.detail.value;
        qq.exam = e.currentTarget.dataset.exam;
        let pp = "answerlist[" + e.currentTarget.dataset.index + "]";
        this.setData({
            [pp]: qq
          })
    },
    Checkboxchange(e){
        var qq = new Object();
        var answerlist = new Array();
        var examtest = wx.getStorageSync("exam").single;
        qq.account=e.currentTarget.dataset.account;
        qq.question=1; 
        qq.questionid=e.currentTarget.dataset.questionid;
        qq.studentanswer = e.detail.value;
        qq.exam = e.currentTarget.dataset.exam;
        let a = e.currentTarget.dataset.index+examtest;
        let pp = "answerlist[" + a + "]";
        this.setData({
            [pp]: qq
          })
    },
    radioChange1(e){
        var qq = new Object();
        var answerlist = new Array();
        var examtest = wx.getStorageSync("exam").single+wx.getStorageSync("exam").multiple+wx.getStorageSync("exam").blankfilling;
        qq.account=e.currentTarget.dataset.account;
        qq.question=3; 
        qq.questionid=e.currentTarget.dataset.questionid;
        qq.studentanswer = e.detail.value;
        qq.exam = e.currentTarget.dataset.exam;
        let a = e.currentTarget.dataset.index+examtest;
        let pp = "answerlist[" + a + "]";
        this.setData({
            [pp] : qq
          })
    },
    changeValue01(e){
        var qq = new Object();
        var examtest = wx.getStorageSync("exam").single+wx.getStorageSync("exam").multiple;
        let a = e.currentTarget.dataset.index + examtest;
        let pp = "answerlist[" + a + "]";
        qq.account=e.currentTarget.dataset.account;
        qq.question=2;
        qq.questionid=e.currentTarget.dataset.questionid;
        qq.studentanswer1=e.detail.value;
        qq.exam = e.currentTarget.dataset.exam;
        console.log(qq);
        this.setData({
            [pp]: qq
          })
    }, 
    changeValue02(e){
        var answerlist = this.data.answerlist;
        var qq = new Object();
        qq.account=e.currentTarget.dataset.account;
        qq.question=2;
        qq.questionid=e.currentTarget.dataset.questionid;
        qq.exam = e.currentTarget.dataset.exam;
        var examtest = wx.getStorageSync("exam").single+wx.getStorageSync("exam").multiple;
        let a = e.currentTarget.dataset.index + examtest;
        let pp = "answerlist[" + a + "]";
        qq.studentanswer1=answerlist[a].studentanswer1;
        qq.studentanswer2=e.detail.value;
        this.setData({
            [pp]: qq
          })
    },  
    changeValue03(e){
        var answerlist = this.data.answerlist;
        var qq = new Object();
        qq.account=e.currentTarget.dataset.account;
        qq.question=2;
        qq.questionid=e.currentTarget.dataset.questionid;
        qq.exam = e.currentTarget.dataset.exam;
        var examtest = wx.getStorageSync("exam").single+wx.getStorageSync("exam").multiple;
        let a = e.currentTarget.dataset.index + examtest;
        let pp = "answerlist[" + a + "]";
        qq.studentanswer1=answerlist[a].studentanswer1;
        qq.studentanswer2=answerlist[a].studentanswer2;
        qq.studentanswer3=e.detail.value;
        this.setData({
            [pp]: qq
          })
    },  
    changeValue04(e){
        var answerlist = this.data.answerlist;
        var qq = new Object();
        qq.account=e.currentTarget.dataset.account;
        qq.question=2;
        qq.questionid=e.currentTarget.dataset.questionid;
        qq.exam = e.currentTarget.dataset.exam;
        var examtest = wx.getStorageSync("exam").single+wx.getStorageSync("exam").multiple;
        let a = e.currentTarget.dataset.index + examtest;
        let pp = "answerlist[" + a + "]";
        qq.studentanswer1=answerlist[a].studentanswer1;
        qq.studentanswer2=answerlist[a].studentanswer2;
        qq.studentanswer3=answerlist[a].studentanswer3;
        qq.studentanswer4=e.detail.value;
        this.setData({
            [pp]: qq
          })
    },  
    changeValue05(e){
        var answerlist = this.data.answerlist;
        var qq = new Object();
        qq.account=e.currentTarget.dataset.account;
        qq.question=2;
        qq.questionid=e.currentTarget.dataset.questionid;
        qq.exam = e.currentTarget.dataset.exam;
        var examtest = wx.getStorageSync("exam").single+wx.getStorageSync("exam").multiple;
        let a = e.currentTarget.dataset.index + examtest;
        let pp = "answerlist[" + a + "]";
        qq.studentanswer1=answerlist[a].studentanswer1;
        qq.studentanswer2=answerlist[a].studentanswer2;
        qq.studentanswer3=answerlist[a].studentanswer3;
        qq.studentanswer4=answerlist[a].studentanswer4;
        qq.studentanswer5=e.detail.value;
        this.setData({
            [pp]: qq
          })
    },              
    changeValue1(e){
        var qq = new Object();
        var answerlist = new Array();
        var examtest = wx.getStorageSync("exam").single+wx.getStorageSync("exam").multiple+wx.getStorageSync("exam").blankfilling+wx.getStorageSync("exam").judge;
        qq.account=e.currentTarget.dataset.account;
        qq.question=4; 
        qq.questionid=e.currentTarget.dataset.questionid;
        qq.studentanswer = e.detail.value;
        qq.exam = e.currentTarget.dataset.exam;
        let a = e.currentTarget.dataset.index+examtest;
        let pp = "answerlist[" + a + "]";
        this.setData({
            [pp]: qq
          })
    },
});
