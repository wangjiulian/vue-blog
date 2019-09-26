/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-23 13:52:01
 * @LastEditTime: 2019-08-22 16:27:02
 * @LastEditors: Please set LastEditors
 */
import service from './request'
import {
  cookie
} from '../tool/mUtils'
import qs from 'qs';
export default async (url = '', data = {}, type = 'post') => {
  data.uid = cookie.get('uid')
  data.token = cookie.get('login_token')
  return service({
    url: url,
    method: type,
    data: qs.stringify(data)
  });
}

