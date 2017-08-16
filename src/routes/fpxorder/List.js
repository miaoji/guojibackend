import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Table, Modal, Icon, message } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定要发送这一条订单吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '4PX订单号',
      dataIndex: 'did',
      key: 'did',
    }, {
      title: '中转地址',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '目的地',
      dataIndex: 'storename',
      key: 'storename',
    }, {
      title: '预付总金额',
      dataIndex: 'sendCount',
      key: 'sendCount',
      render: (text) => <span>¥{text}</span>,
//    render: (text) => <span>{text === 0
//          ? '主张号'
//          : '子帐号'}</span>,
    }, {
      title: '剩余金额',
      dataIndex: 'pickupCount',
      key: 'pickupCount',
      render: (text) => <span>¥{text}</span>,
//    render: (text) => <span>{text === 0
//          ? '主张号'
//          : '子帐号'}</span>,
    }, {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: '订单状态',
      dataIndex: 'blacklist',
      key: 'blacklist',
      render: (text) => {
        const realtext = {
          '0': '否',
          '1': '是',
        }
        return <span>{realtext[text]}</span>
      }
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '确认' }]} />
      },
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
     expandedRowRender={record =>
       <div className={classnames({ [styles.p]: true })}>
         <p>寄件人:  {record.wxName}</p>
         <p>收件人:  {record.wxName}</p>
         <p>证件类型:  {record.wxName}</p>
         <p>证件号:  {record.wxName}</p>
         <p>重量:  {record.wxName}</p>
         <p>体积:  {record.wxName}</p>
         <p>体积:  {record.wxName}</p>
         <p>体积:  {record.wxName}</p>
         <p>体积:  {record.wxName}</p>
         <p>体积:  {record.wxName}</p>
         <p>体积:  {record.wxName}</p>
         <p>体积:  {record.wxName}</p>
       </div>
     }
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
