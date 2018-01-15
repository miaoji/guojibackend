import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { time } from '../../../utils'
import styles from './index.less'

const { formatTime } = time

const WxUserDetail = ({ qrWxUserDetail }) => {
  const { data } = qrWxUserDetail

  return (<div className="content-inner">
    <div className={styles.content}>
    <div className={styles.title}>微信用户详情</div>
    {data.map((item) => (<div className={styles.titleItem}>
      <span>微信名: {item.NICK_NAME}</span>
      <span>手机号: {item.MOBILE}</span>
      <span>性别: {item.SEX}</span>
      <span>寄件总次数: {item.PACKAGE_COUNT}</span>
      <span>消费总金额: {item.TOTAL_AMOUNT}</span>
      <span>黑名单: {item.BLACKLIST}</span>
      <span>关注状态: {item.SUBSCRIBE}</span>
      <span>关注时间: {item.SUBSCRIBE_TIME}</span>
      <span>推广人: {item.qrName}</span>
      </div>))}
    </div>
  </div>)
}

WxUserDetail.propTypes = {
  qrWxUserDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ qrWxUserDetail, loading }) => ({ qrWxUserDetail, loading: loading.models.qrWxUserDetail }))(WxUserDetail)
