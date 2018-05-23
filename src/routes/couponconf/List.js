import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import moment from 'moment'

const confirm = Modal.confirm

const List = ({ location, onEnable, onEditItem, onDeleteItem, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        onEditItem(record)
        break
      case '2':
        confirm({
          title: '确定要删除吗?',
          onOk() {
            onDeleteItem(record.id)
          },
        })
        break
      case '3':
        onEnable(record)
        break
      default:
        break
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '优惠券名称',
      dataIndex: 'coupon_name',
      key: 'coupon_name',
    }, {
      title: '优惠金额',
      dataIndex: 'coupon_money',
      key: 'coupon_money',
      render: (text) => {
        return <span>{text || 0} 元</span>
      }
    }, {
      title: '发放方式',
      dataIndex: 'coupon_type',
      key: 'coupon_type',
      render: (text) => {
        const replText = {
          0: '关注发放',
          1: '下单支付发放',
        }
        return <span>{replText[text]}</span>
      }
    }, {
      title: '优惠券使用门槛',
      dataIndex: 'coupon_threshold',
      key: 'coupon_threshold',
      render: (text) => {
        return <span>{text || 0} 元</span>
      }
    }, {
      title: '叠加',
      dataIndex: 'superposition',
      key: 'superposition',
      render: (text) => {
        const replText = {
          0: '不允许',
          1: '允许'
        }
        return <span>{(text || text === 0) ? replText[text] : '未知'}</span>
      }
    }, {
      title: '启用',
      dataIndex: 'initiate_mode',
      key: 'initiate_mode',
      render: (text) => {
        const replText = {
          0: '未启用',
          1: '已启用'
        }
        return <span>{(text || text === 0) ? replText[text] : '未知'}</span>
      }
    }, {
      title: '创建时间',
      dataIndex: 'gmt_create',
      key: 'gmt_create',
      render: (text) => {
        return <span>{text ? moment.unix(text / 1000).format('YYYY-MM-DD HH:mm:ss') : '未知时间'}</span>
      }
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '3', name: '启用' }, { key: '2', name: '删除' }]} />
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
        expandedRowRender={record => {
          return (
            <div className={classnames({ [styles.open]: true })}>
              <div className={classnames({ [styles.rows]: true })}>
                <p>生效时间 : <span>{record.effective_date ? moment.unix(record.effective_date / 1000).format('YYYY-MM-DD HH:mm:ss') : '未知时间'}</span></p>
                <p>发放数量 : <span>{record.coupon_count}</span></p>
                <p>生成规则 : <span>{`前缀: ${record.coupon_prefix} 位数: ${record.coupon_digit}`}</span></p>
              </div>
              <div className={classnames({ [styles.rows]: true })}>
                <p>失效时间 : <span>{record.expiry_date ? moment.unix(record.expiry_date / 1000).format('YYYY-MM-DD HH:mm:ss') : '未知时间'}</span></p>
                <p>剩余数量 : <span>{record.coupon_count - record.lssue_number}</span></p>
                <p></p>
              </div>
            </div>
          )
        }}
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
  onEnable: PropTypes.func,
  location: PropTypes.object,
}

export default List
