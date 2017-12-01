import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Table, Modal, Button, message } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { time } from '../../utils'
import { Link } from 'dva/router'

const confirm = Modal.confirm

// 状态,1.待付款，2.付款完成，3.国内完成，4.国际完成，5异常订单，6取消订单
const realtext = {
  1: '待付款',
  2: '付款完成',
  3: '国内完成',
  4: '国际完成',
  5: '异常订单',
  6: '取消订单',
  7: '未到件',
  8: '已到件',
}
const realColor = {
  0: 'OrangeRed',
  1: '#3728ff',
  2: 'BlueViolet',
  3: 'OliveDrab',
  4: '#0094ff',
  5: 'Red',
  6: 'Black',
  7: 'OrangeRed',
  8: '#008229',
}
// 包裹状态: 0 还没有合单, -1 普货, -2特货
const List = ({ filter, onSetRepair, onModifyOrder, onSetStatus, onSetWeight, onSetCancel, filterStatus, onDeleteItem, onSetFreight, addBoot, showStateModal, isMotion, location, onCreateCtorder, ztorderLoading, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      // 确定运费
      case '1':
        if (record.parentId < 0) {
          onSetFreight(record)
        } else {
          message.warn('该订单不能进行此操作!!!')
        }
        break
        // 删除订单
      case '2':
        confirm({
          title: '确定要删除这一订单吗?',
          onOk () {
            onDeleteItem(record.id)
          },
        })
        break
        // 修改状态
      case '3':
        onSetStatus(record)
        break
        // 修改订单
      case '4':
        onModifyOrder(record)
        break
        // 撤销合单
      case '5':
        if (record.parentId > 0) {
          confirm({
            title: '确定要撤销本子订单的合单操作吗?',
            onOk () {
              onSetCancel(record)
            },
          })
        } else {
          message.warn('本订单不能进行此操作!!!')
        }
        break
        // 称重
      case '6':
        onSetWeight(record)
        break
      case '7':
        onSetRepair(record)
        break
      case '8':
        window.open(`/bootdetail?orderNo=${record.orderNo}`)
        break
      default:
        break
    }
  }

  const handleCreateZtorder = (record) => {
    confirm({
      title: '确定要发送中通订单吗?',
      onOk () {
        onCreateCtorder(record)
      },
    })
  }

  const columns = [
    {
      title: '全部订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      render: (text, record) => {
        if (text) {
          return <Link to={`/cargodetailInfo?orderNo=${record.orderNo}`}>{text}</Link>
        }
        const newText = record.cnNo || '暂无订单号'
        return <span>{newText}</span>
      },
    }, {
      title: '收件人',
      dataIndex: 'receiverName',
      key: 'receiverName',
    }, {
      title: '收件人手机',
      dataIndex: 'receiverMobile',
      key: 'receiverMobile',
    }, {
      title: '运费',
      dataIndex: 'totalFee',
      key: 'totalFee',
      render: (text) => <span>{text ? Number(text) / 100 : 0}元</span>,
    }, {
      title: '包裹状态',
      dataIndex: 'parentId',
      key: 'parentId',
      render: (text) => {
        text > 0 ? text = 1 : text = text
        const newParentId = {
          0: '待合单',
          '-1': '普货订单',
          '-2': '特货订单',
          1: '子订单',
        }
        return <span>{newParentId[text]}</span>
      },
    }, {
      title: '包裹长度',
      dataIndex: 'length',
      key: 'length',
      render: (text) => <span>{text ? `${text}cm` : '未测量'}</span>,
    }, {
      title: '包裹宽度',
      dataIndex: 'width',
      key: 'width',
      render: (text) => <span>{text ? `${text}cm` : '未测量'}</span>,
    }, {
      title: '包裹高度',
      dataIndex: 'height',
      key: 'height',
      render: (text) => <span>{text ? `${text}cm` : '未测量'}</span>,
    }, {
      title: '包裹重量',
      dataIndex: 'weight',
      key: 'weight',
      render: (text) => <span>{text ? `${text}kg` : '未称重'}</span>,
    }, {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        const realTexts = {
          0: '未到件',
          1: '已到件',
        }
        if (record.parentId < 0) {
          return <span style={{ color: realColor[text] }}>{realtext[text]}</span>
        }
        return <span style={{ color: realColor[record.cargoStatus] }}>{realTexts[record.cargoStatus]}</span>
      },
    }, {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        const newTime = time.formatTime(text)
        return <span>{newTime}</span>
      },
    }, {
      title: '到件时间',
      dataIndex: 'confirmTime',
      key: 'confirmTime',
      render: (text, record) => {
        if (record.parentId < 0) {
          return <span>请查看子订单</span>
        } else if (Number(record.cargoStatus) === 1) {
          return <span>{time.rebuildTime(text)}</span>
        }
        return <span>暂无</span>
      },
    }, {
      title: '仓管费',
      dataIndex: 'cost',
      key: 'cost',
      render: (text, record) => {
        if (!record.confirmTime) {
          return <span>0 元</span>
        }
        let time = new Date().getTime() - Number(record.confirmTime)
        if (time <= 1814400000) {
          return <span>0 元</span>
        } else {
          let cost = Math.ceil((time-1814400000)/86400000)
          return <span>{cost} 元</span>
        }
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        if (record.parentId === 0) {
          return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '3', name: '到件处理' }, { key: '2', name: '删除订单' }]} />
        } else if (record.parentId < 0) {
          return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '4', name: '国际信息' }, { key: '6', name: '测量称重' }, { key: '1', name: '包裹定价' }, { key: '7', name: '补价处理' }, { key: '8', name: '补价记录' }]} />
        } else if (record.parentId > 0) {
          return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '5', name: '撤销合单' }, { key: '2', name: '删除订单' }]} />
        }
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
  onSetFreight: PropTypes.func,
  addBoot: PropTypes.func,
  showStateModal: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
