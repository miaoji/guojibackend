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
        title: '确定要删除这一条产品类型吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
   {
      title: '产品名称编号',
      dataIndex: 'product_code',
      key: 'product_code',
    },{
      title: '目的地',
      dataIndex: 'nation',
      key: 'nation',
    },{
      title: '包裹类型',
      dataIndex: 'name_ch',
      key: 'name_ch',
    },{
      title: '产品类型',
      dataIndex: 'product_name',
      key: 'product_name',
    },{
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (text) => {
      	const createtime =time.formatTime(text)
      	return <span>{createtime}</span>
      }
    },{
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      render:(text) => <span>{text}</span>,
    },{
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (text) => {
        const realtext = {
          '2': '失效',
          '1': '生效',
        }
        return <span>{realtext[text]}</span>
      }
    },{
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改类型'}, { key: '2', name: '删除'}]} />
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
//      expandedRowRender={record =>
//        <div className={classnames({ [styles.p]: true })}>
//          <p>寄件人:  {record.wxName}</p>
//          <p>收件人:  {record.wxName}</p>
//          <p>证件类型:  {record.wxName}</p>
//          <p>证件号:  {record.wxName}</p>
//          <p>重量:  {record.wxName}</p>
//          <p>体积:  {record.wxName}</p>
//          <p>体积:  {record.wxName}</p>
//          <p>体积:  {record.wxName}</p>
//          <p>体积:  {record.wxName}</p>
//          <p>体积:  {record.wxName}</p>
//          <p>体积:  {record.wxName}</p>
//          <p>体积:  {record.wxName}</p>
//        </div>
//      }
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
