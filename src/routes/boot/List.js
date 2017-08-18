import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Table, Modal, Icon, message } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'

const confirm = Modal.confirm

const List = ({  isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      window.open(`/boot/${record.serialnumber}`)
      return
    }
  }

  const columns = [
    {
      title: '订单号',
      dataIndex: 'serialnumber',
      key: 'serialnumber',
    }, {
      title: '收件人',
      dataIndex: 'buyerName',
      key: 'buyerName',
    }, {
      title: '收件地址',
      dataIndex: 'detaliedinformation',
      key: 'detaliedinformation',
      width: '200'
    }, {
      title: '收件人手机',
      dataIndex: 'iphone',
      key: 'iphone'
    }, {
      title: '产品类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '重量',
      dataIndex: 'bearload',
      key: 'bearload',
    }, {
      title: '体积重',
      dataIndex: 'v',
      key: 'v',
      render: (text) => {
        return <span>{text}cm³</span>
      }
    }, {
      title: '改动金额',
      dataIndex: 'bootSum',
      key: 'bootSum',
      render: (text) => {
        return <span>￥{text ? text/100 : 0}</span>
      }
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '历史记录' },]} />
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    rows: tableProps.pagination.rows,
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
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
