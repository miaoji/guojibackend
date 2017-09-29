import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { time } from '../../../utils'
import styles from './index.less'

const { formatTime } = time
const wx_qr_prefix = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='

const Detail = ({ orderDetail }) => {
  const { data } = orderDetail
  const { wxUser,orderItemList,orderData } = data
  const realSex = {
    0: '未知',
    1: '男',
    2: '女'
  }
  const realOrderStatus = {
   '1': '待付款',
   '2': '付款完成',
   '3': '中通完成',
   '0': 'fpx完成',
   '4': '异常订单',
   '5': '取消订单',
  }
  const realBlackList = {
    0: '否',
    1: '是'
  }


  return (<div className="content-inner">
    <div className={styles.content}>
      {data.wxUser?<div className={styles.item}>
        <div className={styles.title}>订单详情:</div>
          <span>订单号: {data.orderNo?data.orderNo:'暂无'}</span>
          <span>国内单号: {data.cnNo?data.cnNo:'暂无'}</span>
          <span>国际单号: {data.intlNo?data.intlNo:'暂无'}</span>
          <span>寄件人: {data.senderName?data.senderName:'暂无'}</span>
          <span>寄件人手机号: {data.senderMobile?data.senderMobile:'暂无'}</span>
          <span>下单时间: {time.formatTime(data.createTime)}</span>
          <span>收件人: {data.receiverName?data.receiverName:'暂无'}</span>
          <span>收件人手机号: {data.receiverMobile?data.receiverMobile:'暂无'}</span>
          <span>订单状态: {realOrderStatus[data.status]}</span>
          <span>寄件地址: {data.senderAddress}</span>
          <span>中转地址: {data.transferAddress}</span>
          <span>收件地址: {data.receiverAddress}</span>
          <span>预付总金额: {(data.totalFee?data.totalFee:'暂无')/100}元</span>
          <span>快件重量: {data.weight}kg</span>
        <div className={styles.title}>微信详情:</div>
          <span>用户昵称: {wxUser.nickName?wxUser.nickName:'暂无'}</span>
          <span>手机号码: {wxUser.mobile?wxUser.mobile:'暂无'}</span>
          <span>性别: {wxUser.sex?realSex[wxUser.sex]:'暂无'}</span>
          <span>寄件总次数: {wxUser.packageCount?wxUser.packageCount:'暂无'}</span>
          <span>关注时间: {time.formatTime(wxUser.subscribeTime)}</span>
          <span>证件号: {wxUser.idCard?wxUser.idCard:'暂无'}</span>
          <span>消费总金额: {wxUser.totalAmount?wxUser.totalAmount:'暂无'}</span>
          <span>黑名单: {wxUser.blacklist?realBlackList[wxUser.blacklist]:'未知'}</span>
          <span>关注状态: {wxUser.subscribe?wxUser.subscribe:'暂无'}</span>
        <div className={styles.title}>包裹详情:</div>
          <span>中文名称: {orderItemList.nameCn?orderItemList.nameCn:'暂无'}</span>
          <span>英文名称: {orderItemList.nameEn?orderItemList.nameEn:'暂无'}</span>
          <span>单价: {orderItemList.unitPrice?orderItemList.unitPrice:'暂无'}</span>
          <span>数量: {orderItemList.quantity?orderItemList.quantity:'暂无'}</span>
          <span>价值: {orderItemList.worth?orderItemList.worth:'暂无'}</span>
          <span>包裹重量: {orderItemList.itemWeight?orderItemList.itemWeight:'暂无'}</span>
          <span>海关编号: {orderItemList.hscode?orderItemList.hscode:'暂无'}</span>
        <div className={styles.title}>快递详情:</div>
          {orderData?orderData.map(item => (<div><span>{item.time}</span><span>{item.context}</span></div>)):<span>暂无快递信息</span>}
      </div>:<span>暂无订单详细信息</span>}
    </div>
  </div>)
}

Detail.propTypes = {
  orderDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ orderDetail, loading }) => ({ orderDetail, loading: loading.models.orderDetail }))(Detail)
