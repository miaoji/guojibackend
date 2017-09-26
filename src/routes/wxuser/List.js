import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'
import { time } from '../../utils'

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
      title: '头像',
      dataIndex: 'headimgurl',
      key: 'headimgurl',
      width: 64,
      className: styles.avatar,
      render: (text) => <img alt={'avatar'} width={24} src={text} />,
    }, {
      title: '微信名',
      dataIndex: 'nick_name',
      key: 'nick_name',
      // render: (text, record) => <Link to={`wxuser/${record.id}`}>{text}</Link>,
    }, {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text) => {
        const str = text.toString()
        if (str === '') {
          return <span>未绑定手机号</span>
        } else {
          let encryptNum = str.substr(0, 3) + '***' + str.substr(7, 10)
          return <span>{encryptNum}</span>
        }
      }
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (text) => {
        const realtext = {
          '0': '未知',
          '1': '男',
          '2': '女',
        }
        return <span>{realtext[text]}</span>
      }
    }, {
      title: '关注状态',
      dataIndex: 'hidden_status',
      key: 'hidden_status',
      filters: [
        { text: '关注', value: '1' },
        { text: '取消关注', value: '0' }
      ],
      onFilter: (value, record) => Number(record.subscribe) === Number(value),
      render: (text) => {
        const realtext = {
          '0': '取消关注',
          '1': '关注',
        }
        return <span>{realtext[text]}</span>
      }
    },{
      title: '关注时间',
      dataIndex: 'subscribe_time',
      key: 'subscribe_time',
      render: (text) => {
        const renderTime = time.formatTime(text)
        return <span>{renderTime}</span>
      }
    },{
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
        expandedRowRender={record =>
          <div className={classnames({ [styles.p]: true })}>
            <p>openid:  {record.openid}</p>
            <p>手机号:  {record.mobile}</p>
            <p>证件号:  {record.id_card}</p>
          </div>
        }
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
