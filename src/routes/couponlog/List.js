import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'

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
          onOk () {
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
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '用户昵称',
      dataIndex: 'content',
      key: 'content',
    }, {
      title: '优惠卷编码',
      dataIndex: 'create_time',
      key: 'create_time',
    }, {
      title: '优惠金额',
      dataIndex: 'create_time',
      key: 'create_time',
    }, {
      title: '优惠卷状态',
      dataIndex: 'create_time',
      key: 'create_time',
    }, {
      title: '发放时间',
      dataIndex: 'create_time',
      key: 'create_time',
    }, {
      title: '截至时间',
      dataIndex: 'create_time',
      key: 'create_time',
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
