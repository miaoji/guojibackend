import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Table, Modal, Button, Icon, message } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, addBoot, isMotion, location, ...tableProps }) => {
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
    }else if(e.key === '3'){
    	addBoot(record)
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },{
      title: '国家',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '省份',
      dataIndex: 'sheng',
      key: 'sheng',
      render: (text) => {
        return <Button>查看</Button>
      },
    },{
      title: '市级',
      dataIndex: 'shi',
      key: 'shi',
    },{
      title: '县级',
      dataIndex: 'xian',
      key: 'xian',
    },{
      title: '操作人',
      dataIndex: 'confirmor ',
      key: 'confirmor ',
    },{
      title: '操作时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },{
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '确认' },{key:'3', name:'查找'}]} />
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
  addBoot: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
