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
        title: '确定要删除这一条包裹类型吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '微信用户',
      dataIndex: 'nickName',
      key: 'nickName',
      render: (text) => <span>{text}</span>,
    }, {
      title: '推广等级',
      dataIndex: 'spreadName',
      key: 'spreadName',
    }, {
      title: '关注途径',
      dataIndex: 'consumptionRatio',
      key: 'consumptionRatio',
      render: (text,record) => {
        let replText = ''
        if (record.wxQrId) {
          replText = '二维码推广'
        }
        if (record.wxAppId) {
          replText = 'APP推广'
        }
        return <span>{replText}</span>
      },
    }, {
      title: '用户推广比例',
      dataIndex: 'ConsumptionRatio',
      key: 'ConsumptionRatio',
      render: (text) => <span>{text}</span>,
    }, {
      title: '晋级类型',
      dataIndex: 'spreadUserType',
      key: 'spreadUserType',
      render: (text) => {
        const replText = {
          0: '自动',
          1: '手动'
        }
        return <span>{replText[text]}</span>
      },
    }, {
      title: '团队消费金额',
      dataIndex: 'consumeTeam',
      key: 'consumeTeam',
      render: (text) => <span>{text?text:'0'}</span>,
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        const raplTime = time.formatTime(text?text:'')
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
