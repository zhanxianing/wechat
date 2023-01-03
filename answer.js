
Page({
	data: {
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
        var exam1 = wx.getStorageSync('exam');
        var singlecount = exam1.single;
        let singlearray = [];
        for(var i=1;i<=singlecount;i++){
            singlearray.splice(i,0,i);
        }
        wx.setStorageSync("singlearray", singlearray);	
        var multiplecount = exam1.multiple;
        let multiplearray = [];
        for(var i=1;i<=multiplecount;i++){
            multiplearray.splice(i,0,i);
        }
        wx.setStorageSync("multiplearray", multiplearray);        
        var blankcount = exam1.blankfilling;
        let blankarray = [];
        for(var i=1;i<=blankcount;i++){
            blankarray.splice(i,0,i);
        }
        wx.setStorageSync("blankarray", blankarray);  
        var judgecount = exam1.judge;
        let judgearray = [];
        for(var i=1;i<=judgecount;i++){
            judgearray.splice(i,0,i);
        }
        wx.setStorageSync("judgearray", judgearray);  
        var shortcount = exam1.shortquestion;
        let shortarray = [];
        for(var i=1;i<=shortcount;i++){
            shortarray.splice(i,0,i);
        }
        wx.setStorageSync("shortarray", shortarray);  
		this.setData({
            'singlearray': wx.getStorageSync('singlearray'),     
            'multiplearray': wx.getStorageSync('multiplearray'), 
            'blankarray': wx.getStorageSync('blankarray'), 
            'judgearray': wx.getStorageSync('judgearray'), 
            'shortarray': wx.getStorageSync('shortarray'),   
            'answerlist':wx.getStorageSync('answerlist')   
          })	    
		this.init();
	},
	async init() {}
});
