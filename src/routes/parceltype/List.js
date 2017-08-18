import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Table, Modal, Icon, message } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定要发送这一条订单吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'did',
      key: 'did',
    },{
      title: '目的地',
      dataIndex: 'mdd',
      key: 'mdd',
      render: (text) => <span>{text}</span>,
    },{
      title: '包裹类型名称',
      dataIndex: 'cname',
      key: 'cname',
    },{
      title: '最小重量',
      dataIndex: 'minweight',
      key: 'minweight',
      render: (text) => <span>{text}kg</span>,
    },{
      title: '最大重量',
      dataIndex: 'maxweight',
      key: 'maxweight',
      render: (text) => <span>{text}kg</span>,
    },/*{
      title: '货物类型代码',
      dataIndex: 'hid',
      key: 'hid',
    },*/{
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      render: (text) => <span>{text}</span>,
    },{
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改类型' }/*, { key: '2', name: '确认类型' }*/]} />
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
