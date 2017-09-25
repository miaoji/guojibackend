import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Table, Modal, Button } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { time } from '../../utils'

const confirm = Modal.confirm

const realtext = {
  '1': '待付款',
  '2': '付款完成',
  '3': '中通完成',
  '0': 'fpx完成',
  '4': '异常订单',
  '5': '取消订单',
}

const List = ({ onDeleteItem, onEditItem, addBoot, isMotion, location, onCreateCtorder, ztorderLoading, ...tableProps }) => {
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
      dataIndex: 'ORDER_NO',
      key: 'ORDER_NO',
    },{
      title: '寄件人',
      dataIndex: 'SENDER_NAME',
      key: 'SENDER_NAME',
    },{
      title: '寄件人手机',
      dataIndex: 'SENDER_MOBILE',
      key: 'SENDER_MOBILE'
    },{
      title: '收件人',
      dataIndex: 'RECEIVER_NAME',
      key: 'RECEIVER_NAME'
    },{
      title: '收件人手机',
      dataIndex: 'RECEIVER_MOBILE',
      key: 'RECEIVER_MOBILE'
    },{
      title: '预付总金额',
      dataIndex: 'TOTAL_FEE',
      key: 'TOTAL_FEE',
      render: (text) => <span>{text ? Number(text)/100 : 0}元</span>,
   },{
      title: '下单时间',
      dataIndex: 'CREATE_TIME',
      key: 'CREATE_TIME',
    }, {
      title: '订单状态',
      dataIndex: 'STATUS',
      key: 'STATUS',
      render: (text) => {
        return <span>{realtext[text]}</span>
      }
    },{
      title: '预报信息',
      key: 'INTL_NO',
      width: 100,
      render: (text, record) => {
        const starte = record.STATUS
        if (starte === 2) {
          return <Button type="primary" size="default" ghost onClick={e => handleCreateZtorder(record, e)}>
            发送
          </Button>
        } else {
          return <Button type="primary" size="default" ghost disabled>
            发送
          </Button>
        }
      },
    },{
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '3', name: '改价'}, { key: '4', name: '改价记录' }, { key: '2', name: '删除' }]} />
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
            <p>订单号:  {record.ORDER_NO}</p>
            <p>寄件人:  {record.SENDER_NAME}</p>
            <p>收件人:  {record.RECEIVER_NAME}</p>
            <p>预付总金额:  {record.TOTAL_FEE/100}元</p>
            <p>产品类型:  {record.PRODUCT_TYPE}</p>
            <p>收件人证件号:  {record.RECEIVER_ID}</p>
            <p>国内段订单号:  {record.CN_NO}</p>
            <p>国际段订单号:  {record.INTL_NO}</p>
            <p>重量:  {record.WEIGHT}kg</p>
            <p>寄件地址: {record.SENDER_ADDRESS}</p>
            <p>中转地址: {record.TRANSFER_ADDRESS}</p>
            <p>收件地址: {record.RECEIVER_ADDRESS}</p>
            <p>下单时间:  {record.CREATE_TIME}</p>
            <p>订单状态:  {realtext[record.STATUS]}</p>
          </div>
        }
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.ID}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  addBoot: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
