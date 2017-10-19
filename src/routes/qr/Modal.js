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

  const handleChange = (e) => {
    console.log('e',e.target.value)
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const paramDisabled = type === 'update'

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="推广人姓名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.NAME,
            rules: [
              {
                required: true,
                message: '请输入推广人姓名!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="有效时长" hasFeedback {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: item.TYPE,
            rules: [
              {
                required: true,
                message: '请输入有效时长!',
              },
            ],
          })(<Radio.Group onChange={handleChange}>
            <Radio value={1}>永久有效</Radio>
            <Radio value={0}>临时有效</Radio>
          </Radio.Group>)}
        </FormItem>
        <FormItem label="有效期" hasFeedback {...formItemLayout}>
          {getFieldDecorator('seconds', {
            initialValue: item.SECONDS,
            rules: [
              {
                required: true,
                pattern: /^[0-9]{0,}$/,
                message: '请选择有效期!',
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
