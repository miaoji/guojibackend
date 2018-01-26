import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { screen } from '../../utils'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const orderState = screen.orderStateByNum
const orderStateArr = screen.orderStateByArr

const List = ({ filter, onDeleteItem, showLocusModal, onEditItem, addBoot, showStateModal, updateOrderInfo, isMotion, location, onCreateCtorder, ztorderLoading, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        onEditItem(record)
        break
      case '2':
        confirm({
          title: '确定要删除这一订单吗?',
          onOk() {
            onDeleteItem(record.ID)
          },
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
      case '6':
        updateOrderInfo(record)
        break
      case '7':
        showLocusModal(record)
        break
      default:
        break
    }
  }

  const handleCreateZtorder = (record) => {
    confirm({
      title: '确定要发送中通订单吗?',
      onOk() {
        onCreateCtorder(record)
      },
    })
  }


  const columns = [
    {
      title: '全部订单号',
      dataIndex: 'ORDER_NO',
      key: 'ORDER_NO',
      render: (text, record) => {
        return <Link to={`/orderdetail?orderNo=${record.ORDER_NO}`}>{text}</Link>
      },
    }, {
      title: '寄件人',
      dataIndex: 'SENDER_NAME',
      key: 'SENDER_NAME',
      render: (text) => {
        return <span style={{ width: '80px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{text}</span>
      },
    }, {
      title: '寄件人手机',
      dataIndex: 'SENDER_MOBILE',
      key: 'SENDER_MOBILE',
    }, {
      title: '收件人',
      dataIndex: 'RECEIVER_NAME',
      key: 'RECEIVER_NAME',
      render: (text) => {
        return <span style={{ width: '80px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{text}</span>
      },
    }, {
      title: '收件人手机',
      dataIndex: 'RECEIVER_MOBILE',
      key: 'RECEIVER_MOBILE',
    }, {
      title: '预付总金额',
      dataIndex: 'TOTAL_FEE',
      key: 'TOTAL_FEE',
      render: (text) => <span>{text ? Number(text) / 100 : 0}元</span>,
    }, {
      title: '实付总金额',
      dataIndex: 'CASH_FEE',
      key: 'CASH_FEE',
      render: (text) => {
        return <span>{text ? `${text / 100}元` : '0元'}</span>
      },
    }, {
      title: '下单时间',
      dataIndex: 'CREATE_TIME',
      key: 'CREATE_TIME',
    }, {
      title: '订单状态',
      dataIndex: 'STATUS',
      key: 'STATUS',
      filters: orderStateArr,
      filterMultiple: false,
      render: (text) => {
        return <span>{orderState[text]}</span>
      },
    }, {
      title: '预报信息',
      key: 'INTL_NO',
      width: 100,
      render: (text, record) => {
        const starte = record.STATUS
        if (starte === 2) {
          return (<Button type="primary" size="default" ghost onClick={e => handleCreateZtorder(record, e)}>
            发送
          </Button>)
        }
        return (<Button type="primary" size="default" ghost disabled>
          发送
        </Button>)
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        if (record.ORDER_TYPE === 4) {
          return (<DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[
            { key: '7', name: '快递轨迹' },
            { key: '5', name: '修改状态' },
            { key: '1', name: '发往国外' },
            { key: '6', name: '修改订单' },
            { key: '3', name: '补价处理' },
            { key: '4', name: '补价记录' },
            { key: '2', name: '删除订单' },
          ]} />)
        }
        return (<DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[
          { key: '5', name: '修改状态' },
          { key: '1', name: '发往国外' },
          { key: '6', name: '修改订单' },
          { key: '3', name: '补价处理' },
          { key: '4', name: '补价记录' },
          { key: '2', name: '删除订单' }
        ]} />)
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
            <p>订单号:{record.ORDER_NO}</p>
            <p>国内段订单号:{record.CN_NO}</p>
            <p>国际段订单号:{record.INTL_NO}</p>
            <p>寄件人:{record.SENDER_NAME}</p>
            <p>收件人:{record.RECEIVER_NAME}</p>
            <p>收件人证件号:{record.RECEIVER_ID}</p>
            <p>预付总金额:{record.TOTAL_FEE / 100}元</p>
            <p>产品类型:{record.PRODUCT_TYPE}</p>
            <p>重量:{record.WEIGHT}kg</p>
            <p>寄件地址: {record.SENDER_ADDRESS}</p>
            <p>中转地址: {record.TRANSFER_ADDRESS}</p>
            <p>收件地址: {record.RECEIVER_ADDRESS}</p>
            <p>下单时间:{record.CREATE_TIME}</p>
            <p>订单状态:{orderState[record.STATUS]}</p>
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
  showStateModal: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  filter: PropTypes.object,
  updateOrderInfo: PropTypes.func,
  onCreateCtorder: PropTypes.func,
  ztorderLoading: PropTypes.bool
}

export default List
