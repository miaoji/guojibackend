import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
// import { DropOption } from '../../components'
// import { time } from '../../utils'
import { Link } from 'dva/router'

// const confirm = Modal.confirm

const List = ({ isMotion, location, ...tableProps }) => {
  const columns = [
    {
      title: '客户编号',
      dataIndex: 'CUSTOMER_NO',
      key: 'CUSTOMER_NO',
      render: (text) => {
        return <span>{text || '暂无客户编号'}</span>
      },
    }, {
      title: '批次号',
      dataIndex: 'BATCH',
      key: 'BATCH',
      render: (text, record) => {
        return <Link to={`/cargodetail?batch=${record.BATCH}`}>{text}</Link>
      },
    }, {
      title: '用户名',
      dataIndex: 'NICK_NAME',
      key: 'NICK_NAME',
    }, {
      title: '包裹总数',
      dataIndex: 'COUNT',
      key: 'COUNT',
    }, {
      title: '已到包裹数',
      dataIndex: 'ADDIVED',
      key: 'ADDIVED',
    }, {
      title: '下单时间',
      dataIndex: 'CREATE_TIME',
      key: 'CREATE_TIME',
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
