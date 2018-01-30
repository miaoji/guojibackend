import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Table, Modal, Icon, message } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'
import { time } from '../../utils'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定要删除吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '头像',
      dataIndex: 'headimgurl',
      key: 'headimgurl',
      className: styles.avatar,
      render: (text) => <img alt={'avatar'} width={24} src={text} />,
    }, {
      title: '微信名',
      dataIndex: 'nickName',
      key: 'nickName',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (text) => {
        const repl = {
          0: '未知',
          1: '男',
          2: '女'
        }
        return <span>{repl[text]}</span>
      },
    }, {
      title: '寄件次数',
      dataIndex: 'packageCount',
      key: 'packageCount',
      render: (text) => <span>{text || 0}次</span>,
    }, {
      title: '总消费金额',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text) => {
        return <span>{text / 100 || 0} 元</span>
      }
    }, {
      title: '关注时间',
      dataIndex: 'subscribeTime',
      key: 'subscribeTime',
      render: (text) => {
        const raplTime = time.formatTime(text || '')
        return <span>{raplTime}</span>
      },
    }, /*{
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
      },
    },*/
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
