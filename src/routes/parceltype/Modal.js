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
          {getFieldDecorator('mdd', {
            initialValue: item.mdd,
            rules: [
              {
                required: true,
                message: '请输入目的地!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="包裹类型名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('cname', {
            initialValue: item.cname,
            rules: [
              {
                required: true,
                message: '请输入包裹类型名称!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="英文名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('ename', {
            initialValue: item.ename,
            rules: [
              {
                required: true,
                message: '请输入英文名称!',
              },
            ],
          })(<Input />)}
        </FormItem>
        
        <FormItem label="最小重量(kg)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('minweight', {
            initialValue: item.minweight,
            rules: [
              {
                required: true,
                message: '请输入最小重量!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="最大重量(kg)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('maxweight', {
            initialValue: item.maxweight,
            rules: [
              {
                required: true,
                message: '请输入最大重量!',
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
