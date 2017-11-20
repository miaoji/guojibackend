import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Table, Modal, Button } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { time } from '../../utils'
import { Link } from 'dva/router'

const confirm = Modal.confirm

//状态,1.待付款，2.付款完成，3.国内完成，4.国际完成，5异常订单，6取消订单
const realtext = {
  '1': '待付款',
  '2': '付款完成',
  '3': '国内完成',
  '4': '国际完成',
  '5': '异常订单',
  '6': '取消订单'
}
// 包裹状态: 0 还没有合单, -1 普货, -2特货
const List = ({ filter, filterStatus, onDeleteItem, onEditItem, addBoot, showStateModal, isMotion, location, onCreateCtorder, ztorderLoading, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        onEditItem(record)
        break
      case '2':
        confirm({
          title: '确定要删除这一订单吗?',
          onOk () {
            onDeleteItem(record.ID)
          }
        })
        break
      case '3':
        addBoot(record)
        break
      case '4':
        window.open(`/bootdetail?orderNo=${record.ORDER_NO}`)
        break
      case '5':
        showStateModal(record)
        break
      default:
        break
    }
  }

  const handleCreateZtorder = (record) => {
    confirm({
      title: '确定要发送中通订单吗?',
      onOk () {
        console.log('record', record)
        onCreateCtorder(record)
      }
    })
  }

  const columns = [
    {
      title: '全部订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },{
      title: '寄件人',
      dataIndex: 'senderName',
      key: 'senderName',
    },{
      title: '寄件人手机',
      dataIndex: 'senderMobile',
      key: 'senderMobile'
    },{
      title: '收件人',
      dataIndex: 'receiverName',
      key: 'receiverName'
    },{
      title: '收件人手机',
      dataIndex: 'receiverMobile',
      key: 'receiverMobile'
    },{
      title: '预付总金额',
      dataIndex: 'totalFee',
      key: 'totalFee',
      render: (text) => <span>{text ? Number(text)/100 : 0}元</span>,
    },{
      title: '包裹状态',
      dataIndex: 'parentId',
      key: 'parentId',
      render: (text) => {
        const realText={
          '0': '待合单',
          '-1': '普货订单',
          '-2': '特货订单'
        }
        return <span>{ realText[text] }</span>
      }
    },{
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '待付款', value: 1 },
        { text: '付款完成', value: 2 },
        { text: '国内完成', value: 3 },
        { text: '国际完成', value: 4 },
        { text: '异常订单', value: 5 },
        { text: '取消订单', value: 6 }
      ],
      filterMultiple: false,
      render: (text) => {
        return <span>{realtext[text]}</span>
      }
    },{
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },{
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '5', name: '修改状态' }, { key: '1', name: '修改订单' }, { key: '3', name: '改价'}, { key: '4', name: '改价记录' }, { key: '2', name: '删除' }]} />
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
            <p>订单号:  {record.orderNo}</p>
            <p>国内段订单号:  {record.cnNo}</p>
            <p>国际段订单号:  {record.intlNo}</p>
            <p>寄件人:  {record.senderName}</p>
            <p>收件人:  {record.receiverName}</p>
            <p>收件人证件号:  {record.RECEIVER_ID}</p>
            <p>预付总金额:  {record.totalFee/100}元</p>
            <p>产品类型:  {record.PRODUCT_TYPE}</p>
            <p>重量:  {record.WEIGHT}kg</p>
            <p>寄件地址: {record.senderAddress}</p>
            <p>中转地址: {record.transferAddress}</p>
            <p>收件地址: {record.receiverAddress}</p>
            <p>下单时间:  {record.createTime}</p>
            <p>订单状态:  {realtext[record.status]}</p>
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
  addBoot: PropTypes.func,
  showStateModal: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
