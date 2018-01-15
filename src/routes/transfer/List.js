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
        title: '确定要删除这一条包裹类型吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '收件人姓名',
      dataIndex: 'transferName',
      key: 'transferName',
      render: (text) => <span>{text}</span>,
    }, {
      title: '收件人公司',
      dataIndex: 'transferCompany',
      key: 'transferCompany',
    }, {
      title: '收件人电话',
      dataIndex: 'transferMobile',
      key: 'transferMobile',
    }, {
      title: '收件人国家',
      dataIndex: 'countryName',
      key: 'countryName',
      render: (text) => <span>{text}</span>,
    }, {
      title: '收件人省',
      dataIndex: 'provincesName',
      key: 'provincesName',
      render: (text) => <span>{text}</span>,
    }, {
      title: '收件人市',
      dataIndex: 'citiesName',
      key: 'citiesName',
      render: (text) => <span>{text}</span>,
    }, {
      title: '收件人区',
      dataIndex: 'districtsName',
      key: 'districtsName',
      render: (text) => <span>{text}</span>,
    }, {
      title: '收件人详细地址',
      dataIndex: 'transferAddress',
      key: 'transfer_address',
      render: (text) => <span>{text}</span>,
    }, {
      title: '收件人邮编',
      dataIndex: 'transferPostcode',
      key: 'transfer_postcode',
      render: (text) => <span>{text}</span>,
    }, {
      title: '默认',
      dataIndex: 'isDefault',
      key: 'is_default',
      render: (text) => {
        const realDefault = {
          1: '是',
          0: '否',
        }
        return <span>{realDefault[text]}</span>
      },
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      render: (text) => <span>{text}</span>,
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改类型' }, { key: '2', name: '删除' }]} />
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
