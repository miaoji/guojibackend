import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
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
      data.address = data.address.join(' ')
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
        <FormItem label="订单号" disabled hasFeedback {...formItemLayout}>
          {getFieldDecorator('did', {
            initialValue: item.did,
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: '请输入订单号!',
              },
            ],
          })(<Input disabled />)}
        </FormItem>
        <FormItem label="中转地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('wxName', {
            initialValue: item.wxName,
            rules: [
              {
                required: true,
                message: '请输入中转地址!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="收件人" hasFeedback {...formItemLayout}>
          {getFieldDecorator('recipient', {
            initialValue: item.recipient,
            rules: [
              {
                required: true,
                message: '请输入收件人!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="收件地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('recipientAddress', {
            initialValue: item.recipientAddress,
            rules: [
              {
                required: true,
                message: '请输入收件地址!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="目的地" hasFeedback {...formItemLayout}>
          {getFieldDecorator('destination', {
            initialValue: item.destination && item.address.split(' '),
            rules: [
              {
                required: true,
                message: '请选择一个地址!',
              },
            ],
          })(<Cascader
            size="large"
            style={{ width: '100%' }}
            options={city}
            placeholder="选择一个地址"
          />)}
        </FormItem>
        <FormItem label="产品类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('productType', {
            initialValue: item.productType,
            rules: [
              {
                required: true,
                message: '请输入产品类型!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="国内段单号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('chinaSN', {
            initialValue: item.chinaSN,
            rules: [
              {
                required: true,
                message: '请输入国内段单号!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="国际段单号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('fpxSN', {
            initialValue: item.fpxSN,
            rules: [
              {
                required: true,
                message: '请输入国际段单号!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="证件类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('documentsN', {
            initialValue: item.documentsN,
            rules: [
              {
                required: true,
                message: '请输入证件类型!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="证件号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('documentN', {
            initialValue: item.documentN,
            rules: [
              {
                required: true,
                message: '请输入证件号!',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
