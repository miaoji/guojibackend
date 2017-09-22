import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { time } from '../../../utils'
import styles from './index.less'

const { formatTime } = time

const detailCN = {
  priceSpread: '补价金额',
  createTime: '创建时间',
  reason: '补价原因',
  orderNo: '订单号',
  status: '状态',
}

const statusGroup = {
  '-1': '补价状态信息未获取',
  '0': '默认未补价',
  '1': '补价中',
  '2': '补价完成',
  '3': '模板消息推送失败'
}

const Detail = ({ bootDetail }) => {
  const { data } = bootDetail
  if (data.length === 0) {
    return (<div className="content-inner">
      <div className={styles.content}>
        暂无补价记录
      </div>
    </div>)
  }
  const detailData = data
  const detail = []
  for (let i = 0; i < detailData.length; i++) {
    let item = detailData[i]
    detail.push(<h3 className={styles.item}>第{i +1}条记录</h3>)
    for (let key in item) {
      if ({}.hasOwnProperty.call(item, key)) {
        let content
        switch (key) {
          case 'createUserId':
          case 'hiddenStatus':
          case 'id':
            content = ''
            break
          case 'status':
          // 如果传过来的 status 是null 则转换成 -1 用‘不加状态信息未获取’ 提示用户
            if (!item[key]) {item[key]='-1'}
            content = (<div>{String(statusGroup[item[key]])}</div>)
            break
          case 'priceSpread':
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
  bootDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ bootDetail, loading }) => ({ bootDetail, loading: loading.models.bootDetail }))(Detail)
