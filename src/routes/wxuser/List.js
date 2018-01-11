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
      dataIndex: 'HEADIMGURL',
      key: 'HEADIMGURL',
      width: 64,
      className: styles.avatar,
      render: (text) => <img alt={'avatar'} width={24} src={text} />,
    }, {
      title: '微信名',
      dataIndex: 'NICK_NAME',
      key: 'NICK_NAME',
      // render: (text, record) => <Link to={`wxuser/${record.id}`}>{text}</Link>,
    }, {
      title: '手机号',
      dataIndex: 'MOBILE',
      key: 'MOBILE',
      render: (text) => {
        const str = text.toString()
        if (str === '') {
          return <span>未绑定手机号</span>
        }
        let encryptNum = `${str.substr(0, 3)}***${str.substr(7, 10)}`
        return <span>{encryptNum}</span>
      },
    }, {
      title: '性别',
      dataIndex: 'SEX',
      key: 'SEX',
      render: (text) => {
        const realtext = {
          0: '未知',
          1: '男',
          2: '女',
        }
        return <span>{realtext[text]}</span>
      },
    }, {
      title: '寄件总次数',
      dataIndex: 'PACKAGE_COUNT',
      key: 'PACKAGE_COUNT',
    }, {
      title: '消费总金额',
      dataIndex: 'TOTAL_AMOUNT',
      key: 'TOTAL_AMOUNT',
      render: (text) => {
        return <span>{text / 100}</span>
      },
    }, {
      title: '黑名单',
      dataIndex: 'BLACKLIST',
      key: 'BLACKLIST',
      filters: [
        { text: '是', value: 1 },
        { text: '否', value: 0 },
      ],
      onFilter: (value, record) => Number(record.BLACKLIST) === Number(value),
      render: (text) => {
        const realtext = {
          0: '否',
          1: '是',
        }
        return <span>{realtext[text]}</span>
      },
    }, {
      title: '关注状态',
      dataIndex: 'SUBSCRIBE',
      key: 'SUBSCRIBE',
      filters: [
        { text: '关注', value: '1' },
        { text: '取消关注', value: '0' },
      ],
      onFilter: (value, record) => Number(record.SUBSCRIBE) === Number(value),
      render: (text) => {
        const realtext = {
          0: '取消关注',
          1: '关注',
        }
        return <span>{realtext[text]}</span>
      },
    }, {
      title: '关注时间',
      dataIndex: 'SUBSCRIBE_TIME',
      key: 'SUBSCRIBE_TIME',
      render: (text) => {
        const renderTime = time.formatTime(text)
        return <span>{renderTime}</span>
      },
    }, {
      title: '推广人',
      dataIndex: 'qrName',
      key: 'qrName',
      render: (text) => {
        return <span>{text || '无'}</span>
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }/* { key: '2', name: '标记' }*/]} />
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
            <p>openid:                                                                                                      {record.OPENID}</p>
            <p>手机号:                                                                                                      {record.MOBILE ? `${record.MOBILE.toString().substr(0, 3)}***${record.MOBILE.toString().substr(7, 10)}` : '未绑定手机号'}</p>
            <p>证件号:                                                                                                      {record.ID_CARD ? record.ID_CARD : '未绑定证件号'}</p>
          </div>
        }
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.ID}
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
