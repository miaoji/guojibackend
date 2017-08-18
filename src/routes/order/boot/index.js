import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { time } from '../../../utils'
import styles from './index.less'

const { formatTime } = time

const detailCN = {
  boot: '补价金额',
  reason: '补价原因',
  status: '状态',
  createTime: '创建时间',
  serialNumber: '订单号'
}

const statusGroup = {
  '0': '默认未补价',
  '1': '补价中',
  '2': '补价完成',
  '3': '模板消息推送失败'
}

const Detail = ({ orderbootDetail }) => {
  const { data, serialnumber } = orderbootDetail
  if (data.length === 0) {
    return (<div className="content-inner">
      <div className={styles.content}>
        暂无补价记录
      </div>
    </div>)
  }
  const detailData = data
  const detail = []
  detail.push(<h2 className={styles.item}>订单{serialnumber}改价记录</h2>)
  for (let i = 0; i < detailData.length; i++) {
    let item = detailData[i]
    detail.push(<h3 className={styles.item}>第{i +1}条记录</h3>)
    for (let key in item) {
      if ({}.hasOwnProperty.call(item, key)) {
        let content
        switch (key) {
          case 'createUser':
          case 'id':
            content = ''
            break
          case 'status':
            content = (<div>{String(statusGroup[item[key]])}</div>)
            break
          case 'boot':
            content = (<div>{item[key]/100}元</div>)
            break
          case 'createTime':
            content = (<div>{formatTime(item[key])}</div>)
            break
          default:
            if (String(item[key]).match(/png/g)) {
              content = (<div><img src={String(item[key])} alt={detailCN[key]} /></div>)
            } else {
              content = (<div>{String(item[key])}</div>)
            }
            break
        }
        detail.push(<div key={i+ key} className={styles.item}>
          <div>{detailCN[key]}</div>
          {content}
        </div>)
      }
    }
  }

  return (<div className="content-inner">
    <div className={styles.content}>
      {detail}
    </div>
  </div>)
}

Detail.propTypes = {
  orderbootDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ orderbootDetail, loading }) => ({ orderbootDetail, loading: loading.models.orderbootDetail }))(Detail)
