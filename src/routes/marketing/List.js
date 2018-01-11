import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Table, Modal, Icon, message, Button } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { time } from '../../utils'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ location, onEditItem, onDeleteItem, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        onEditItem(record)
        break
      case '2':
        confirm({
          title: '确定要删除吗?',
          onOk () {
            onDeleteItem(record.id)
          },
        })
        break
      default:
        break
    }
  }

  const copyUrl = (record, e) => {
    const href = `http://www.mingz-tech.com/wechat/#/send?appid=${record.appid}`
    let temp = window.prompt('使用Ctrl+C复制到剪切板', href)
    temp.select()
    document.execCommand('copy', false)
  }

  const columns = [
    {
      title: '头像',
      dataIndex: 'HEADIMGURL',
      key: 'HEADIMGURL',
      width: 80,
      className: styles.avatar,
      render: (text) => <img alt={'avatar'} width={24} src={text} />,
    }, {
      title: '微信名',
      dataIndex: 'NICK_NAME',
      key: 'NICK_NAME',
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
    }, {
      title: '推广人',
      dataIndex: 'qrName',
      key: 'qrName',
      render: (text) => {
        return <span>{text || '无'}</span>
      },
    }, /*{
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' },]} />
      },
    },*/
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    rows: tableProps.pagination.rows,
  }

  const getBodyWrapper = body => { return <AnimTableBody {...getBodyWrapperProps} body={body} /> }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true })}
        bordered
        expandedRowRender={record =>
          <div className={classnames({ [styles.p]: true })}>
            <p>openid:                                                                                                                          {record.OPENID}</p>
            <p>手机号:                                                                                                                          {record.MOBILE ? `${record.MOBILE.toString().substr(0, 3)}***${record.MOBILE.toString().substr(7, 10)}` : '未绑定手机号'}</p>
            <p>证件号:                                                                                                                          {record.ID_CARD ? record.ID_CARD : '未绑定证件号'}</p>
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
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
