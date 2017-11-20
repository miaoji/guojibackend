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
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },{
      title: '批次号',
      dataIndex: 'BATCH',
      key: 'BATCH',
      render: (text,record) => {
        return <Link to={`/cargodetail?batch=${record.BATCH}`}>{text}</Link>
      }
    },{
      title: '用户名',
      dataIndex: 'NICK_NAME',
      key: 'NICK_NAME',
    },{
      title: '下单时间',
      dataIndex: 'CREATE_TIME',
      key: 'CREATE_TIME',
    }
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
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  addBoot: PropTypes.func,
  showStateModal: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
