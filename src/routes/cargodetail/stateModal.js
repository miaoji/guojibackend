/*
 * 修改状态Modal
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Modal } from 'antd'
// import { shelfNo } from '../../utils'
import { SelectShelf } from '../../components'
// import styles from './addModal.less'
// import classnames from 'classnames'


const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  },
}

// 到件状态,0:未到件,1:已到件

const realtext = {
  0: '未到件',
  1: '已到件',
  7: '国际快递已发货'
}

const realStatus = {
  1: '待付款',
  2: '付款完成',
  3: '国内完成',
  4: '国际完成',
  5: '异常订单',
  6: '取消订单',
  7: '国际快递已发货'
}

const stateModal = ({
  item = {},
  modalType,
  onOk,
  handleChange,
  shelfDis,
  getShelfCount,
  shelfCount,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }


  const selectStateChange = (val) => {
    handleChange(val)
  }

  const onSelectShelfChange = (val) => {
    const value = JSON.parse(val).str + JSON.parse(val).num
    getShelfCount({shelfNo: value})
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem style={{ marginTop: '20px' }} label="订单号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('orderNo', {
            initialValue: item.orderNo || item.cnNo || '暂无订单号',
            rules: [
              {
                required: true,
                message: '请输入订单号!',
              },
            ],
          })(<Input disabled />)}
        </FormItem>
        <FormItem label="状态" hasFeedback {...formItemLayout}>
          {getFieldDecorator('cargoStatus', {
            initialValue: modalType === 'setOrderState' ? realStatus[item.status] : realtext[item.cargoStatus],
            rules: [
              {
                required: true,
                message: '请输入补价金额!',
              },
            ],
          })(
            <Select onSelect={selectStateChange}>{
              modalType === 'setOrderState'
                ? [<Option value="待付款">待付款</Option>, <Option value="已付款">已付款</Option>]
                : [<Option value="未到件">未到件</Option>, <Option value="已到件">已到件</Option>]
            }
            </Select>
            )}
        </FormItem>
        <FormItem label="货架号" hasFeedback {...formItemLayout} style={{ display: (modalType !== 'setOrderState' && !shelfDis) ? 'block' : 'none' }}>
          {getFieldDecorator('shelfNo', {
            initialValue: item.shelfNo || 'A01',
            rules: [
              {
                // required: true,
                message: '请输入补价金额!',
              },
            ],
          })(<SelectShelf onChange={onSelectShelfChange} initValue={item.shelfNo || 'A01'} />)}
        </FormItem>
        <FormItem label="订单数量" hasFeedback {...formItemLayout} style={{ display: (modalType !== 'setOrderState' && !shelfDis) ? 'block' : 'none' }}>
          {getFieldDecorator('shelfNo111', {
          })(<div style={{ paddingLeft: '14px', paddingRight: '14px' }}>{shelfCount}件(相同货架上)</div>)}
        </FormItem>
      </Form>
    </Modal>
  )
}

stateModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(stateModal)
