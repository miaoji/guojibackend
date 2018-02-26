import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
// import { Link } from 'dva/router'
import { time } from '../../utils'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定要删除吗?',
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '真实姓名',
      dataIndex: 'trueName',
      key: 'trueName',
    }, {
      title: '账号',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '收款类型',
      dataIndex: 'type',
      key: 'type',
      render: (text) => {
        const realText = {
          0: '微信',
          1: '支付宝',
        }
        return <span>{realText[text]}</span>
      },
    }, {
      title: '提现金额',
      dataIndex: 'cash',
      key: 'cash',
      render: (text) => {
        return <span>{text / 100 || 0} 元</span>
      },
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '未提现', value: 0 },
        { text: '提现成功', value: 1 },
        { text: '拒绝', value: 2 }
      ],
      filterMultiple: false,
      onFilter: (value, record) => {
        return record.status.toString().indexOf(value.toString()) === 0
      },
      render: (text) => {
        const realText = {
          0: '未提现',
          1: '提现成功',
          2: '拒绝',
        }
        return <span>{realText[text]}</span>
      },
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        const raplTime = time.formatTime(text || '')
        return <span>{raplTime}</span>
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        if (record.status === 0) {
          return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }]} />
        }
        return <span>禁止操作</span>
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
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
