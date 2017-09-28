import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { time } from '../../../utils'
import styles from './index.less'

const { formatTime } = time
const wx_qr_prefix = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='

const Detail = ({ orderDetail }) => {
  const { name,nickName,storename,orderData } = orderDetail.data
  // orderData.map(item => (<span key={item.id}>{item.time}</span>))
  console.log('4564654546', orderData)
  // console.log('data',data)
  // const imgSrc = wx_qr_prefix + ticket

  return (<div className="content-inner">
    <div className={styles.content}>
      <div className={styles.item}>
        <div className={styles.title}>订单详情:</div>
          <span>订单号: {name}</span>
          <span>寄件人: {name}</span>
          <span>寄件人手机号: {name}</span>
          <span>收件人: {name}</span>
          <span>收件人手机号: {name}</span>
          <span>预付总金额: {name}</span>
          <span>下单时间: {name}</span>
          <span>订单状态: {name}</span>
          <span>中转地址: {name}</span>
        <div className={styles.title}>微信详情:</div>
          <span>微信名: {nickName}</span>
          <span>手机号: {nickName}</span>
          <span>性别: {nickName}</span>
          <span>黑名单: {nickName}</span>
          <span>关注状态: {nickName}</span>
          <span>关注时间: {nickName}</span>
        <div className={styles.title}>包裹详情:</div>
          <span>包裹类型: {storename}</span>
          <span>包裹大小: {storename}</span>
          <span>包裹重量: {storename}</span>
        <div className={styles.title}>快递详情:</div>
        {orderData?orderData.map(item => (<div><span>{item.time}</span><span>{item.context}</span></div>)):<span>暂无快递信息</span>}
      </div>
    </div>
  </div>)
}

Detail.propTypes = {
  orderDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ orderDetail, loading }) => ({ orderDetail, loading: loading.models.orderDetail }))(Detail)
