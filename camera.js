Page({
    data: {
        base64: "",
      },
    onLoad() {
      this.ctx = wx.createCameraContext()
    },
    takePhoto() {
      this.ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          this.setData({
            src: res.tempImagePath
          })
          wx.getFileSystemManager().readFile({
            filePath:this.data.src, //选择图片返回的相对路径
            encoding: 'base64', //编码格式返回
            success: res=>{  //成功回调
             this.setData({
               base64: res.data
             })
             wx.request({
                url: 'http://localhost:8080/OnlineExam/student/faceloginWechat',
                method:'POST',
                header:{'content-type':'application/x-www-form-urlencoded'},
                data:{
                    's_id':wx.getStorageSync('s_id'),
                    'base':this.data.base64,
                },	   
                success: (res)=>{   
                    console.log(res.data);
                    if(res.data != null){
                        wx.showToast({
                            title: '识别成功',
                            duration:2000,
                        })                         
                        wx.redirectTo({
                            url: 'testbefore'
                        })                                         
                    }else{
                        wx.showToast({
                            title: '识别失败',
                            duration:2000,
                        })                           
                    }   
                }      
              })
            }
          })
        }
      })
    },
    error(e) {
      console.log(e.detail)
    }
  })