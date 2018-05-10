import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

const List = ({ location, onEditItem, onDeleteItem, ...tableProps }) => {
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
        expandedRowRender={record =>
          <div className={classnames({ [styles.p]: true })}>
            <p>openid:{record.OPENID}</p>
            <p>手机号:{record.MOBILE ? `${record.MOBILE.toString().substr(0, 3)}***${record.MOBILE.toString().substr(7, 10)}` : '未绑定手机号'}</p>
            <p>证件号:{record.ID_CARD ? record.ID_CARD : '未绑定证件号'}</p>
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
