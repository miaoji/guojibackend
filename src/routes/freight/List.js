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
    }, {
      title: '目的地国家',
      dataIndex: 'destCtry',
      key: 'destctry',
    }, {
      title: '物品类型',
      dataIndex: 'cargotype',
      key: 'cargotype',
      render: (text) => {
        const realtext = {
          '0': '其他',
          '1': '其他',
          '2': '包裹',
        }
        return <span>{realtext[text]}</span>
      }
    }, {
      title: '产品类型',
      dataIndex: 'producttypeid',
      key: 'producttypeid',
    }, {
      title: '首重价格',
      dataIndex: 'initialprice',
      key: 'initialprice',
      render:(text) => <span>¥{text}</span>,
    }, {
      title: '首重重量',
      dataIndex: 'ykgweight',
      key: 'ykgweight',
      render: (text) => <span>{text}kg</span>,
    },{
      title: '续重价格',
      dataIndex: 'continuedheavyprice',
      key: 'continuedheavyprice',
      render: (text) => <span>¥{text}</span>,
    },{
      title: '步进重量',
      dataIndex: 'stepping',
      key: 'stepping',
      render: (text) => <span>{text}kg</span>,
    },{
      title: '燃油附加费',
      dataIndex: 'fuelcharge',
      key: 'fuelcharge',
      render: (text) => <span>¥{text}</span>,
    },{
      title: '邮编段',
      dataIndex: 'zipcodesegment',
      key: 'zipcodesegment',
      render: (text) => <span>{text}</span>,
    },{
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
      render: (text) => {
      	const createtime =time.formatTime(text)
      	return <span>{createtime}</span>
      }
    },{
      title: '操作人',
      dataIndex: 'confirmor',
      key: 'confirmor',
    },{
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },{
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' },]} />
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
