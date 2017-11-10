/*
 * 修改状态Modal
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Select, Modal } from 'antd'
// import styles from './addModal.less'
import classnames from 'classnames'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

//状态,1.待付款，2.付款完成，3.国内完成，4.国际完成，5异常订单，6取消订单
const realtext = {
  '1': '待付款',
  '2': '付款完成',
  '3': '国内完成',
  '4': '国际完成',
  '5': '异常订单',
  '6': '取消订单'
}

const stateModal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
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

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="订单号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('orderNo', {
            initialValue: item.ORDER_NO,
            rules: [
              {
                required: true,
                message: '请输入订单号!',
              },
            ],
          })(<Input disabled/>)}
        </FormItem>
        <FormItem label="状态" hasFeedback {...formItemLayout}>
          {getFieldDecorator('state', {
            initialValue: realtext[item.STATUS],
            rules: [
              {
                required: true,
                message: '请输入补价金额!',
              },
            ],
          })(
            <Select>
              <Option value="1">待付款</Option>
              <Option value="2">付款完成</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

// <Option value="3">国内完成</Option>
// <Option value="4">国际完成</Option>
// <Option value="5">异常订单</Option>
// <Option value="6">取消订单</Option>

stateModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(stateModal)
