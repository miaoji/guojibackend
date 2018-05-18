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
        <FormItem label="订单号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('accounts', {
            initialValue: item.accounts,
            rules: [
              {
                required: true,
//              pattern: /^1[34578]\d{9}$/,
                message: '请输入订单号!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="收件人" hasFeedback {...formItemLayout}>
          {getFieldDecorator('pwd', {
            initialValue: item.pwd,
            rules: [
              {
                required: true,
//              pattern: /^1[34578]\d{9}$/,
                message: '请输入收件人!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="产品类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('storename', {
            initialValue: item.storename,
            rules: [
              {
                required: true,
                message: '请输入产品类型!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="收件地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: item.address && item.address.split(' '),
            rules: [
              {
                required: true,
                message: '请输入收件地址!',
              },
            ],
          })(<Cascader
            size="large"
            style={{ width: '100%' }}
            options={city}
            placeholder="选择一个收件地址"
          />)}
        </FormItem>
        <FormItem label="重量" hasFeedback {...formItemLayout}>
          {getFieldDecorator('q', {
            initialValue: item.q,
            rules: [
              {
                required: true,
                message: '请输入重量!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="体积重" hasFeedback {...formItemLayout}>
          {getFieldDecorator('w', {
            initialValue: item.w,
            rules: [
              {
                required: true,
                message: '请输入体积重!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="改动金额" hasFeedback {...formItemLayout}>
          {getFieldDecorator('e', {
            initialValue: item.e,
            rules: [
              {
                required: true,
                message: '请输入改动金额!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="备注" hasFeedback {...formItemLayout}>
          {getFieldDecorator('r', {
            initialValue: item.r,
            rules: [
              {
                required: true,
                message: '请输入备注信息!',
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
