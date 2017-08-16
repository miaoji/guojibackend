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
        <FormItem label="货物类型代码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('hid', {
            initialValue: item.hid,
            rules: [
              {
                required: true,
                message: '请输入货物类型代码!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="中文名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('cname', {
            initialValue: item.cname,
            rules: [
              {
                required: true,
                message: '请输入中文名称!',
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
