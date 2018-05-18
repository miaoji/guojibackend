import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
// import { Link } from 'dva/router'
import { time } from '../../utils'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定要删除一条等级配置吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '推广等级',
      dataIndex: 'spreadLevel',
      key: 'spreadLevel',
      render: (text) => <span>{text}</span>,
    }, {
      title: '等级名称',
      dataIndex: 'spreadName',
      key: 'spreadName',
    }, {
      title: '需累计消费',
      dataIndex: 'spreadConsumption',
      key: 'spreadConsumption',
      render: (text) => {
        return <span>{text / 100}</span>
      },
    }, {
      title: '一级分红比例',
      dataIndex: 'consumptionRatio',
      key: 'consumptionRatio',
      render: (text) => <span>{text * 100}%</span>
    }, {
      title: '二级分红比例',
      dataIndex: 'consumptionRatioSecond',
      key: 'consumptionRatioSecond',
      render: (text) => <span>{Math.floor(text * 100)}%</span>
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        const raplTime = time.formatTime(text || '')
        return <span>{raplTime}</span>
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
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
