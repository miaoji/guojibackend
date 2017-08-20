import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Table, Modal, Button } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'

const confirm = Modal.confirm

const realtext = {
  '1': '待付款',
  '2': '付款完成',
  '3': '中通完成',
  '0': 'fpx完成',
  '4': '异常订单',
  '5': '取消订单',
}

const List = ({ onDeleteItem, onEditItem, addBoot, isMotion, location, onCreateZtorder, ztorderLoading, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        onEditItem(record)
        break
      case '2':
        confirm({
          title: '确定要删除订单吗?',
          onOk () {
            onDeleteItem(record.id)
          }
        })
        break
      case '3':
        addBoot(record)
        break
      case '4':
        window.open(`/orderboot/${record.serialnumber}`)
        break
      default:
        break
    }
  }

  const handleCreateZtorder = (record) => {
    confirm({
      title: '确定要发送中通订单吗?',
      onOk () {
        onCreateZtorder(record)
      }
    })
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
      title: '寄件人手机',
      dataIndex: 'senderPhone',
      key: 'senderPhone'
    },{
      title: '收件人',
      dataIndex: 'buyerName',
      key: 'buyerName'
    },{
      title: '收件人手机',
      dataIndex: 'buyerPhone',
      key: 'buyerPhone'
    },{
      title: '预付总金额',
      dataIndex: 'totalfee',
      key: 'totalfee',
      render: (text) => <span>{text ? Number(text)/100 : 0}元</span>,
   },{
      title: '下单时间',
      dataIndex: 'endtime',
      key: 'endtime',
    }, {
      title: '订单状态',
      dataIndex: 'starte',
      key: 'starte',
      render: (text) => {
        return <span>{realtext[text]}</span>
      }
    },{
      title: '预报信息',
      key: 'createztorder',
      width: 100,
      render: (text, record) => {
        const starte = record.starte
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
            <p>订单号:  {record.serialnumber}</p>
            <p>寄件人:  {record.senderName}</p>
            <p>收件人:  {record.buyerName}</p>
            <p>预付总金额:  {record.totalfee/100}元</p>
            <p>产品类型:  {record.producttypeid}</p>
            <p>收件人证件号:  {record.buyerIDCard}</p>
            <p>国内段订单号:  {record.ZTONO}</p>
            <p>国际段订单号:  {record.FPXNO}</p>
            <p>重量:  {record.bearload}</p>
            <p>寄件地址: {record.senderAddr}</p>
            <p>中转地址: {record.transferAddr}</p>
            <p>收件地址: {record.buyerAddr}</p>
            <p>下单时间:  {record.endtime}</p>
            <p>订单状态:  {realtext[record.starte]}</p>
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
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
