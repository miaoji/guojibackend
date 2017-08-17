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
    switch (e.key) {
      case '1':
        onEditItem(record)
        break
      case '2':
        confirm({
          title: '确定要发送订单给中通吗?',
          onOk () {
            onDeleteItem(record.id)
          }
        })
        break
      case '3':
        onEditItem(record)
        break
      default:
        break
    }
  }

  const columns = [
    {
      title: '全部订单号',
      dataIndex: 'serialnumber',
      key: 'serialnumber',
    },{
      title: '寄件人',
      dataIndex: 'senderName',
      key: 'senderName',
    },{
      title: '收件人',
      dataIndex: 'buyerName',
      key: 'buyerName'
    },{
      title: '预付总金额',
      dataIndex: 'total_fee',
      key: 'total_fee',
      render: (text) => <span>¥{text}</span>,
   },{
      title: '下单时间',
      dataIndex: 'endtime',
      key: 'endtime',
    }, {
      title: '订单状态',
      dataIndex: 'starte',
      key: 'starte',
      render: (text) => {
        const realtext = {
          '1': '代付款',
          '2': '付款完成',
          '3': '中通完成',
          '0': 'fpx完成',
          '4': '异常订单',
          '5': '取消订单',
        }
        return <span>{realtext[text]}</span>
      }
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '3', name: '改价'}, { key: '2', name: '预报信息' }]} />
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
            <p>订单号:  {record.wxName}</p>
            <p>寄件人:  {record.wxName}</p>
            <p>收件人:  {record.wxName}</p>
            <p>预付总金额:  {record.wxName}</p>
            <p>寄件人证件类型:  {record.wxName}</p>
            <p>收件人证件类型:  {record.wxName}</p>
            <p>产品类型:  {record.wxName}</p>
            <p>寄件人证件号:  {record.wxName}</p>
            <p>收件人证件号:  {record.wxName}</p>
            <p>国内段订单号:  {record.wxName}</p>
            <p>重量:  {record.wxName}</p>
            <p>下单时间:  {record.wxName}</p>
            <p>国际段订单号:  {record.wxName}</p>
            <p>订单状态:  {record.wxName}</p>
            <h1>寄件地址: {record.wxName}</h1>
            <h1>中转地址: {record.wxName}</h1>
            <h1>收件地址: {record.wxName}</h1>
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
