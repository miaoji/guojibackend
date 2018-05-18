import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'

const detailCN = {
  info: '用户列表中信息',
  address: '地址',
  superior: '所属上级',
  officehours: '营业时间',
  consultPhone: '咨询电话',
  applicantIDCardNum: '申请人身份证号',
  businessLicenseImg: '营业执照照片',
  doorImg: '门头照片',
  serviceBarImg: '服务台照片',
  shelfImg: '货架照片',
}

const Detail = ({ storeUserDetail }) => {
  const { data } = storeUserDetail
  const detail = []
  const detailData = data.detail
  for (let key in detailData) {
    if ({}.hasOwnProperty.call(detailData, key)) {
      let content
      if (String(detailData[key]).match(/png/g)) {
        content = (<div>
                    <img src={String(detailData[key])} alt={detailCN[key]} />
                  </div>)
      } else {
        content = (<div>{String(detailData[key])}</div>)
      }
      detail.push(<div key={key} className={styles.item}>
        <div>{detailCN[key]}</div>
        {content}
      </div>)
    }
  }

  return (<div className="content-inner">
    <div className={styles.content}>
      {detail}
    </div>
  </div>)
}

Detail.propTypes = {
  storeUserDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ storeUserDetail, loading }) => ({ storeUserDetail, loading: loading.models.storeUserDetail }))(Detail)
