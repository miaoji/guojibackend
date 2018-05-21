import React from 'react'
import PropTypes from 'prop-types'
import {
  Table, Modal,
  // Button
} from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { time } from '../../utils'

const confirm = Modal.confirm

const List = ({ onQuery, onDeleteItem, onShowTimeModal, onEditItem, isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定要暂停通知吗?',
        onOk() {
          onDeleteItem(record.spreadUserId)
        },
      })
    } else if (e.key === '3') {
      onShowTimeModal(record)
    }
  }

  // const handleClick = (text) => {
  //   onQuery({ parentId: text })
  // }

  const columns = [
    {
      title: '推广人姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '微信昵称',
      dataIndex: 'nickName',
      key: 'nickName',
      render: (text) => <span>{text}</span>,
    }, {
      title: '推广等级',
      dataIndex: 'spreadName',
      key: 'spreadName',
      render: (text, record) => {
        if (record.spreadUserType === 0) {
          return <span>{text}</span>
        }
        return <span>VIP用户</span>
      }
    }, {
      title: '推广类型',
      dataIndex: 'consumptionRatio',
      key: 'consumptionRatio',
      render: (text, record) => {
        let replText = ''
        if (record.wxQrId) {
          replText = '二维码推广'
        }
        if (record.wxAppId) {
          replText = 'APP推广'
        }
        return <span>{replText}</span>
      }
    }, {
      title: '二维码图片',
      dataIndex: 'qrTicket',
      key: 'qrTicket',
      render: (text, record) => {
        return <a href={`/spreadqr?TICKET=${record.qrTicket}&name=${record.name}&parameter=${record.qrTicket}`} target="_blank">点击查看</a>
      },
    }, {
      title: '一级分润比例',
      dataIndex: 'spreadUserRatio',
      key: 'spreadUserRatio',
      render: (text) => {
        return <span>{(text || 0) * 100}%</span>
      },
    }, {
      title: '二级分润比例',
      dataIndex: 'spreadUserRatioSecond',
      key: 'spreadUserRatioSecond',
      render: (text) => {
        return <span>{(text || 0) * 100}%</span>
      },
    }, {
      title: '晋级类型',
      dataIndex: 'spreadUserType',
      key: 'spreadUserType',
      render: (text) => {
        const replText = {
          0: '自动',
          1: '手动',
        }
        return <span>{replText[text]}</span>
      }
    }, {
      title: '团队消费金额/元',
      dataIndex: 'consumeTeam',
      key: 'consumeTeam',
      render: (text) => <span>{text / 100 || '0'}</span>,
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        const raplTime = time.formatTime(text || '')
        return <span>{raplTime}</span>
      }
    }, {
      title: '用户数量',
      dataIndex: 'count',
      key: 'count',
      render: (text) => {
        return <span>{text || '无'}</span>
      }
    }, {
      title: '用户管理',
      dataIndex: 'spreadUserId',
      key: 'spreadUserId',
      render: (text, record) => {
        if (record.count > 0) {
          return <a href={`/spreaduser?parentId=${text}`} target="_blank">点击查看</a>
        }
        return <span>无</span>
        // return <Button type="primary" onClick={e => handleClick(text, e)}>点击查看</Button>
      }
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '3', name: '推送时间' }, { key: '2', name: '暂停推送' }]} />
      }
    }
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
  onShowTimeModal: PropTypes.func,
  onQuery: PropTypes.func
}

export default List