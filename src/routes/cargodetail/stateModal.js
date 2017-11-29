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

// 到件状态,0:未到件,1:已到件

const realtext = {
  0: '未到件',
  1: '已到件',
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
            initialValue: realtext[item.cargoStatus],
            rules: [
              {
                required: true,
                message: '请输入补价金额!',
              },
            ],
          })(
            <Select>
              <Option value="未到件">未到件</Option>
              <Option value="已到件">已到件</Option>
            </Select>
          )}
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
