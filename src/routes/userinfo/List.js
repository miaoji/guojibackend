import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { time } from '../../utils'

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
      title: '昵称',
      dataIndex: 'real_name',
      key: 'real_name',
    }, {
      title: '登陆名(账号密码登陆使用)',
      dataIndex: 'user_name',
      key: 'user_name',
    }, {
      title: '手机号(手机号码登陆使用)',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (text) => {
        const realText = {
          1: '男',
          0: '女'
        }
        return <span>{realText[text]}</span>
      }
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (text) => {
        const createtime = time.formatTime(text)
        return <span>{createtime}</span>
      },
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
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
