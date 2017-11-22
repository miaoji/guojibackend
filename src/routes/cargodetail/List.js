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
// 包裹状态: 0 还没有合单, -1 普货, -2特货
const List = ({ filter, onSetStatus, onSetCancel, filterStatus, onDeleteItem, onSetFreight, addBoot, showStateModal, isMotion, location, onCreateCtorder, ztorderLoading, ...tableProps }) => {
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
      case '4':
        window.open(`/bootdetail?orderNo=${record.ORDER_NO}`)
        break
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
      },
    })
  }

  const columns = [
    {
      title: '全部订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
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
        const realText = {
          0: '待合单',
          '-1': '普货订单',
          '-2': '特货订单',
          1: '子订单',
        }
        return <span>{realText[text]}</span>
      },
    }, {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '待付款', value: 1 },
        { text: '付款完成', value: 2 },
        { text: '国内完成', value: 3 },
        { text: '国际完成', value: 4 },
        { text: '异常订单', value: 5 },
        { text: '取消订单', value: 6 },
      ],
      filterMultiple: false,
      render: (text) => {
        return <span>{realtext[text]}</span>
      },
    }, {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        const realText = time.formatTime(text)
        return <span>{realText}</span>
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        if (record.parentId === 0) {
          return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '3', name: '到件处理' }, { key: '2', name: '删除订单' }]} />
        } else if (record.parentId < 0) {
          return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '确定运费' }]} />
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
