import React from 'react'
import PropTypes from 'prop-types'
import copy from 'copy-to-clipboard'
import {
  // Menu,
  Table,
  Modal,
  // Icon,
  message,
  Button
} from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { time } from '../../utils'
import { Link } from 'dva/router'

const confirm = Modal.confirm
// const wx_qr_prefix = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='

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

  const copyUrl = (record) => {
    const href = `http://www.mingz-tech.com/wechat/#/send?appid=${record.appid}`
    // let temp = window.prompt('使用Ctrl+C复制到剪切板', href)
    // temp.select()
    // document.execCommand('copy', false)
    let copyInfo = copy(href, {
      debug: true,
      message: '复制失败'
    })
    if (copyInfo === true) {
      message.success('已复制到剪切板')
    } else {
      message.warn('复制到剪切板失败,请稍后重试')
    }
  }

  const columns = [
    {
      title: '推广名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'AppId',
      dataIndex: 'appid',
      key: 'appid',
    }, {
      title: '用户量',
      dataIndex: 'userCount',
      key: 'userCount',
      render: (text) => {
        return <span>{text || 0}</span>
      },
    }, {
      title: '下单量',
      dataIndex: 'orderCount',
      key: 'orderCount',
      render: (text) => {
        return <span>{text || 0}</span>
      },
    }, {
      title: '关注用户详情',
      dataIndex: 'qrTICKET',
      key: 'qrTICKET',
      render: (text, record) => {
        return <Link to={`/wxuserdetail?appid=${record.appid}`}>点击查看</Link>
      },
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (text) => {
        const createtime = time.formatTime(text)
        return <span>{createtime}</span>
      },
    }, {
      title: '复制推广链接',
      dataIndex: 'catenate',
      key: 'catenate',
      render: (text, record) => {
        return <Button type="primary" size="large" onClick={e => copyUrl(record, e)}>复制到剪切板</Button>
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '删除' }]} />
      },
    },
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
  location: PropTypes.object,
}

export default List
