/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-23 13:52:01
 * @LastEditTime: 2019-09-25 14:48:58
 * @LastEditors: Please set LastEditors
 */
export const store = {
  get(key) {
    return window.sessionStorage.getItem(key);
  },
  set(key, val) {
    if (!key) return;
    window.sessionStorage.setItem(key,
      typeof val !== 'string' ? JSON.stringify(val) : val)
  },
  remove(key) {
    window.sessionStorage.removeItem(key)
  },
  clear() {
    window.sessionStorage.clear()
  },
}

export const cookie = {
  //获取cookie、
  get(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (unescape(arr[2]));
    else
      return null;
  },

  //设置cookie,增加到vue实例方便全局调用
  set(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(typeof value !== 'string' ? JSON.stringify(value) : value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  },

  //删除cookie
  remove(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.get(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
  clear(){
    
  }
}

//手机号验证
export const mobileReg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/;

export const idCardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

export const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

export const getYYDDMM = (value)=>{
  let d = new Date(value * 1000);
  return d.getFullYear() + "年" + parseInt(d.getMonth() + 1) + "月" + d.getDate()+"日";
}
export const getYYDDMML = (value) => {
  let d = new Date(value * 1000);
  return d.getFullYear() + "/" + parseInt(d.getMonth() + 1) + "月" + d.getDate();
}

export const timeParse = (dateTimeStamp) =>{   //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();   //获取当前时间毫秒
  console.log(now)
  var diffValue = now - (dateTimeStamp * 1000);//时间差

  if(diffValue < 0){
      return;
  }
  var result = '';
  var minC = diffValue/minute;  //计算时间差的分，时，天，周，月
  var hourC = diffValue/hour;
  var dayC = diffValue/day;
  var weekC = diffValue/week;
  var monthC = diffValue/month;
  
//   if(monthC >= 1 && monthC <= 3){
//     result = " " + parseInt(monthC) + "月前"
// }else if(weekC >= 1 && weekC <= 3){
//     result = " " + parseInt(weekC) + "周前"
// }else if(dayC >= 1 && dayC <= 6){
//     result = " " + parseInt(dayC) + "天前"
// }else

  if(hourC >= 1 && hourC <= 23){
      result = " " + parseInt(hourC) + "小时前"
  }else if(minC >= 1 && minC <= 59){
      result =" " + parseInt(minC) + "分钟前"
  }else if(diffValue >= 0 && diffValue <= minute){
      result = "刚刚"
  }else {
      var datetime = new Date();
      datetime.setTime(dateTimeStamp * 1000);
      var Nyear = datetime.getFullYear();
      var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
      var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
      var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
      var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
      var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
      result = Nyear + "-" + Nmonth + "-" + Ndate + " " + Nhour +":" +Nminute;
  }
  return result;
}

