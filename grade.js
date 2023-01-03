import * as echarts from '../components/ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#FF9F7F"],
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      // shape: 'circle',
      indicator: wx.getStorageSync("middle")
    },
    series: [{
      name: '知识分布',
      type: 'radar',
      data: [{
        value: wx.getStorageSync('num'),
        name: '掌握程度'
      }
      ]
    }]
  };

  chart.setOption(option);
  return chart;
}
Page({
    data: {
        ec: {
            onInit: initChart
          }
      },   
     // 下拉切换
     bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        wx.request({
			url: 'http://localhost:8080/OnlineExam/checkAnswerWechat',
			  method:'POST',
			  header:{'content-type':'application/x-www-form-urlencoded'},
			  data:{
                'c_id': e.detail.value,
                'account':wx.getStorageSync('s_account')
			  },	
			  success: (res)=>{	 
                console.log(res);
                console.log(res.data);
                wx.removeStorageSync('middle');
                wx.setStorageSync("middle", res.data);   
                wx.request({
                    url: 'http://localhost:8080/OnlineExam/checkAnswerWechat1',
                    method:'POST',
                    header:{'content-type':'application/x-www-form-urlencoded'},
                    data:{
                      'c_id': e.detail.value,
                      'account':wx.getStorageSync('s_account')
                    }, 
                    success: (res)=>{	 
                        console.log(res);
                        console.log(res.data);
                        wx.removeStorageSync('num');
                        wx.setStorageSync("num", res.data);    
                        wx.redirectTo({
                            url: 'grade'
                          })                                       
                    }           
                })
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
		this.setData({
			'allclass': wx.getStorageSync('allclass'),
		  })	         
		this.init();
	},
	async init() {},
});
