import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { time } from '../../utils'
// import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ location, onEditItem, onPushMsg, onDeleteItem, ...tableProps }) => {
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

  const lickClick = (record) => {
    confirm({
      title: `您确定要将 \`${record.route}\` 这条消息推送给用户吗?`,
      onOk() {
        onPushMsg(record.route)
      },
    })
  }

  const columns = [
    {
      title: '路由信息',
      dataIndex: 'route',
      key: 'route',
    }, {
      title: '路由时间',
      dataIndex: 'routeTime',
      key: 'routeTime',
      render: (text) => {
        return <span>{time.formatTime(text)}</span>
      }
    }, {
      title: '推送操作',
      dataIndex: 'option',
      key: 'option',
      render: (text, record) => {
        return <span onClick={() => lickClick(record)} className={classnames({ [styles.link]: true })}>推送模板消息</span>
      }
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
  onPushMsg: PropTypes.func,
  location: PropTypes.object,
}

export default List
