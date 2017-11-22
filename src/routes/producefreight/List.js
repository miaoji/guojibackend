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
      title: '订单号',
      dataIndex: 'did',
      key: 'did',
    }, {
      title: '收件人',
      dataIndex: 'wxName',
      key: 'wxName',
    }, {
      title: '产品类型',
      dataIndex: 'xx',
      key: 'xx',
      render: () => <span>类型未定义</span>,
    }, {
      title: '重量',
      dataIndex: 'maxweight',
      key: 'maxweight',
      render: (text) => <span>{text}kg</span>,
    }, {
      title: '体积重',
      dataIndex: 'minweight',
      key: 'minweight',
      render: (text) => <span>{text}kg</span>,
    }, {
      title: '金额',
      dataIndex: 'consume',
      key: 'consume',
      render: (text) => <span>¥{text}</span>,
    }, {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: '订单状态',
      dataIndex: 'blacklist',
      key: 'blacklist',
      render: (text) => {
        const realtext = {
          0: '否',
          1: '是',
        }
        return <span>{realtext[text]}</span>
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '确认' }]} />
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
