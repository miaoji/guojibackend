import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { time } from '../../../utils'
import styles from './index.less'

const { formatTime } = time
const wx_qr_prefix = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='

const Detail = ({ qrDetail }) => {
  const { name, ticket, parameter } = qrDetail
  const imgSrc = wx_qr_prefix + ticket

  return (<div className="content-inner">
    <div className={styles.content}>
      <div className={styles.item}>
        <div>推广人姓名: {name}</div>
        <div>参数: {parameter}</div>
        <div><img src={imgSrc} alt="二维码" /></div>
      </div>
    </div>
  </div>)
}

Detail.propTypes = {
  qrDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ qrDetail, loading }) => ({ qrDetail, loading: loading.models.qrDetail }))(Detail)
