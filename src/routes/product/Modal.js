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
        <FormItem label="目的地" hasFeedback {...formItemLayout}>
          {getFieldDecorator('storename', {
            initialValue: item.storename,
            rules: [
              {
                required: true,
                message: '请输入目的地!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="产品名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('productname', {
            initialValue: item.productname,
            rules: [
              {
                required: true,
                message: '请输入产品名称!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="产品属性" hasFeedback {...formItemLayout}>
          {getFieldDecorator('productattr', {
            initialValue: item.productattr,
            rules: [
              {
                required: true,
                message: '请输入产品属性!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="备注" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
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
