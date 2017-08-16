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
    }, {
      title: '目的地国家',
      dataIndex: 'mddgj',
      key: 'mddgj',
    }, {
      title: '物品类型',
      dataIndex: 'wplx',
      key: 'wplx',
    }, {
      title: '产品类型',
      dataIndex: 'cplx',
      key: 'cplx',
    }, {
      title: '首重价格',
      dataIndex: 'newmoney',
      key: 'newmoney',
      render:(text) => <span>¥{text}</span>,
    }, {
      title: '首重重量',
      dataIndex: 'sz',
      key: 'sz',
      render: (text) => <span>{text}kg</span>,
    },{
      title: '续重价格',
      dataIndex: 'xz',
      key: 'xz',
      render: (text) => <span>¥{text}</span>,
    },{
      title: '步进重量',
      dataIndex: 'bj',
      key: 'bj',
      render: (text) => <span>{text}kg</span>,
    },{
      title: '燃油附加费',
      dataIndex: 'myc',
      key: 'myc',
      render: (text) => <span>¥{text}</span>,
    },{
      title: '邮编段',
      dataIndex: 'yb',
      key: 'yb',
      render: (text) => <span>{text}</span>,
    },{
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },{
      title: '操作人',
      dataIndex: 'czr',
      key: 'czr',
    },{
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },{
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '确认' }]} />
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
