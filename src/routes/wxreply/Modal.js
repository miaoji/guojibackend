import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'

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
  type,
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
        <FormItem label="关键字" hasFeedback {...formItemLayout}>
          {getFieldDecorator('keyword', {
            initialValue: item.keyword,
            rules: [
              {
                required: true,
                // pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请输入关键字!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="回复内容" hasFeedback {...formItemLayout}>
          {getFieldDecorator('content', {
            initialValue: item.content,
            rules: [
              {
                required: true,
                // pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请输入回复内容!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="备注信息" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            rules: [
              {
                required: false,
                // pattern: /^[\u4e00-\u9fa5]{0,}$/,
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
