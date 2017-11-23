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

const weightModal = ({
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
        <FormItem label="包裹长度(cm)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('length', {
            initialValue: item.length,
            rules: [
              {
                required: true,
                message: '请输入包裹长度!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="包裹宽度(cm)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('width', {
            initialValue: item.width,
            rules: [
              {
                required: true,
                message: '请输入包裹宽度!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="包裹高度(cm)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('height', {
            initialValue: item.height,
            rules: [
              {
                required: true,
                message: '请输入包裹高度!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="包裹重量(kg)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('weight', {
            initialValue: item.weight,
            rules: [
              {
                required: true,
                message: '请输入包裹重量!',
              },
            ],
          })(<Input/>)}
        </FormItem>
      </Form>
    </Modal>
  )
}

weightModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(weightModal)
