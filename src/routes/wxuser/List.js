import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onMarkItem, onEditItem, isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定要将这一用户打入黑名单吗?(可在更新中修改)',
        onOk () {
          onMarkItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '微信名',
      dataIndex: 'wxName',
      key: 'wxName',
      render: (text, record) => <Link to={`wxuser/${record.id}`}>{text}</Link>,
    }, {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
      render: (text) => {
        const str = text.toString()
        let encryptNum = str.substr(0, 5) + '****' + str.substr(9, 10)
        return <span>{encryptNum}</span>
      }
    }, {
      title: '地理所属店铺',
      dataIndex: 'belongStore',
      key: 'belongStore'
    }, {
      title: '寄件次数',
      dataIndex: 'sendCount',
      key: 'sendCount',
    }, {
      title: '收件次数',
      dataIndex: 'pickupCount',
      key: 'pickupCount',
    }, {
      title: '消费金额',
      dataIndex: 'consume',
      key: 'consume',
      render: text => <span>￥{text}</span>
    }, {
      title: '关注状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '关注', value: '1' },
        { text: '取消关注', value: '0' }
      ],
      onFilter: (value, record) => Number(record.status) === Number(value),
      render: (text) => {
        const realtext = {
          '0': '取消关注',
          '1': '关注',
        }
        return <span>{realtext[text]}</span>
      }
    }, {
      title: '是否黑名单',
      dataIndex: 'blacklist',
      key: 'blacklist',
      filters: [
        { text: '否', value: '0' },
        { text: '是', value: '1' }
      ],
      onFilter: (value, record) => Number(record.blacklist) === Number(value),
      render: (text) => {
        const realtext = {
          '0': '否',
          '1': '是',
        }
        return <span>{realtext[text]}</span>
      }
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '标记' }]} />
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
  onMarkItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
