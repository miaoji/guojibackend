import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import moment from 'moment'

const confirm = Modal.confirm
// const wx_qr_prefix = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='

const List = ({ location, onEditItem, onDeleteItem, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        onEditItem(record)
        break
      case '2':
        confirm({
          title: '确定要删除吗?',
          onOk() {
            onDeleteItem(record.id)
          },
        })
        break
      default:
        break
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '用户昵称',
      dataIndex: 'nickName',
      key: 'nickName',
      render: (text, record) => {
        return <span>{record.wxUserId.nickName}</span>
      }
    }, {
      title: '优惠卷编码',
      dataIndex: 'couponCode',
      key: 'couponCode',
    }, {
      title: '优惠金额',
      dataIndex: 'couponMoney',
      key: 'couponMoney',
      render: (text, record) => {
        return <span>{record.couponType.couponMoney}</span>
      }
    }, {
      title: '优惠卷状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const replText = {
          1: '未使用',
          0: '已使用',
        }
        return <span>{replText[text]}</span>
      }
    }, {
      title: '叠加',
      dataIndex: 'superposition',
      key: 'superposition',
      render: (text, record) => {
        const replText = {
          0: '允许',
          1: '不允许'
        }
        return <span>{(record.couponType.superposition || record.couponType.superposition === 0) ? replText[record.couponType.superposition] : '未知'}</span>
      }
    }, {
      title: '生效时间',
      dataIndex: 'effectiveDate',
      key: 'effectiveDate',
      render: (text, record) => {
        return <span>{record.couponType.effectiveDate}</span>
      }
    }, {
      title: '截至时间',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: (text, record) => {
        return <span>{record.couponType.expiryDate}</span>
      }
    }, {
      title: '发放时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
      render: (text) => {
        const time = text ? moment(text / 1).format('YYYY-MM-DD') : '未知时间'
        return <span>{time}</span>
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    rows: tableProps.pagination.rows,
  }

  const getBodyWrapper = body => { return <AnimTableBody {...getBodyWrapperProps} body={body} /> }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true })}
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
  location: PropTypes.object,
}

export default List
