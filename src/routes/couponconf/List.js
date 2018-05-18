import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import moment from 'moment'

const confirm = Modal.confirm

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
      title: '优惠券名称',
      dataIndex: 'coupon_name',
      key: 'coupon_name',
    }, {
      title: '优惠金额',
      dataIndex: 'coupon_money',
      key: 'coupon_money',
      render: (text) => {
        return <span>{text || 0} 元</span>
      }
    }, {
      title: '优惠卷截止时间',
      dataIndex: 'expiry_date',
      key: 'expiry_date',
      render: (text) => {
        return <span>{text ? moment.unix(text / 1000).format('YYYY-MM-DD HH:mm:ss') : '未知时间'}</span>
      }
    }, {
      title: '优惠券使用门槛',
      dataIndex: 'coupon_threshold',
      key: 'coupon_threshold',
      render: (text) => {
        return <span>{text || 0} 元</span>
      }
    }, {
      title: '生成规则',
      dataIndex: 'coupon_prefix',
      key: 'coupon_prefix',
      render: (text, record) => {
        return <span>{`前缀: ${text} 位数: ${record.coupon_digit}`}</span>
      }
    }, {
      title: '发放数量',
      dataIndex: 'coupon_count',
      key: 'coupon_count',
    }, {
      title: '剩余数量',
      dataIndex: 'lssue_number',
      key: 'lssue_number',
      render: (text, record) => {
        text = text || 1000
        return <span>{text - record.coupon_count}</span>
      }
    }, {
      title: '创建时间',
      dataIndex: 'gmt_create',
      key: 'gmt_create',
      render: (text) => {
        return <span>{text ? moment.unix(text / 1000).format('YYYY-MM-DD HH:mm:ss') : '未知时间'}</span>
      }
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '删除' }]} />
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
