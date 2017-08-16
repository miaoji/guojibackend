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
      dataIndex: 'id',
      key: 'id',
    },{
      title: '国家',
      dataIndex: 'country',
      key: 'country',
    }, {
      title: '省份',
      dataIndex: 'sheng',
      key: 'sheng',
    },{
      title: '市级',
      dataIndex: 'shi',
      key: 'shi',
    },{
      title: '县级',
      dataIndex: 'xian',
      key: 'xian',
    },{
      title: '详细信息',
      dataIndex: 'xiangxi',
      key: 'xiangxi',
    },{
      title: '邮编',
      dataIndex: 'ycode',
      key: 'ycode',
    },{
      title: '用户ID',
      dataIndex: 'did',
      key: 'did',
    },{
      title: '发件公司名',
      dataIndex: 'fagongsi',
      key: 'fagongsi',
    },{
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },{
      title: '联系人',
      dataIndex: 'cname',
      key: 'cname',
    },{
      title: '证件号',
      dataIndex: 'uid',
      key: 'uid',
    },{
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },{
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const realtext = {
          '1': '下单完成',
          '2': '付款完成',
          '3': '中通完成',
          '0': 'fpx完成',
          '4': '异常订单',
          '5': '取消订单',
        }
        return <span>{realtext[text]}</span>
      }
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
