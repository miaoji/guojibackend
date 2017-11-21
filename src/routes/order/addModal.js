import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Modal } from 'antd'
import styles from './Modal.less'
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

const addModal = ({
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
        <FormItem label="寄件人姓名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('orderNo', {
            initialValue: item.ORDER_NO,
            rules: [
              {
                required: true,
                message: '请输入寄件人姓名!',
              },
            ],
          })(<Input/>)}
        </FormItem>
        <FormItem label="寄件人手机" hasFeedback {...formItemLayout}>
          {getFieldDecorator('orderss', {
            initialValue: item.orderss,
            rules: [
              {
                required: true,
                message: '请输入寄件人手机号码'
              }
            ]
          })(<Input/>)}
        </FormItem>
        <FormItem label="收件人姓名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('orderaa', {
            initialValue: item.orderaa,
            rules: [
              {
                required: true,
                message: '请输入收件人姓名!'
              }
            ]
          })(<Input/>)}
        </FormItem>
        <FormItem label="收件人手机" hasFeedback {...formItemLayout}>
          {getFieldDecorator('orderaa', {
            initialValue: item.orderaa,
            rules: [
              {
                required: true,
                message: '请输入收件人手机号码!'
              }
            ]
          })(<Input/>)}
        </FormItem>
        <FormItem label="预付总金额" hasFeedback {...formItemLayout}>
          {getFieldDecorator('orderaa', {
            initialValue: item.orderaa,
            rules: [
              {
                required: true,
                message: '请输入预付总金额!'
              }
            ]
          })(<Input/>)}
        </FormItem>
        <FormItem label="快件重量(kg)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('orderaa', {
            initialValue: item.orderaa,
            rules: [
              {
                required: true,
                message: '请输入快件重量!'
              }
            ]
          })(<Input/>)}
        </FormItem>
        <FormItem label="是否保价" hasFeedback {...formItemLayout}>
          {getFieldDecorator('orderaa', {
            initialValue: item.orderaa,
            rules: [
              {
                required: true,
                message: '请选择是否保价!'
              }
            ]
          })(<Input/>)}
        </FormItem>
        <FormItem label="保价金额" hasFeedback {...formItemLayout}>
          {getFieldDecorator('orderaa', {
            initialValue: item.orderaa,
            rules: [
              {
                required: true,
                message: '请输入保价金额!'
              }
            ]
          })(<Input/>)}
        </FormItem>
        <FormItem label="寄件地址明细" hasFeedback {...formItemLayout}>
          {getFieldDecorator('priceSpread', {
            initialValue: item.boot,
            rules: [
              {
                required: true,
                message: '请输入寄件地址明细!',
              },
            ],
          })(<Input/>)}
        </FormItem>
        <FormItem label="收件地址明细" hasFeedback {...formItemLayout}>
          {getFieldDecorator('reason', {
            initialValue: item.reason,
            rules: [
              {
                required: true,
                message: '收件地址明细!',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

addModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(addModal)
