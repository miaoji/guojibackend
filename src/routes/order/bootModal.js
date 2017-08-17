import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Modal } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const bootModal = ({
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
          {getFieldDecorator('serialnumber', {
            initialValue: item.serialnumber,
            rules: [
              {
                required: true,
                message: '请输入订单号!',
              },
            ],
          })(<Input disabled />)}
        </FormItem>
        <FormItem label="补价金额" hasFeedback {...formItemLayout}>
          {getFieldDecorator('boot', {
            initialValue: item.boot,
            rules: [
              {
                required: true,
                message: '请输入补价金额!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="补价原因" hasFeedback {...formItemLayout}>
          {getFieldDecorator('reason', {
            initialValue: item.reason,
            rules: [
              {
                required: true,
                message: '补价原因!',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

bootModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(bootModal)
