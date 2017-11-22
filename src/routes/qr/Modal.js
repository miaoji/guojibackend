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
  inputDis,
  typeDis,
  onShowInput,
  onHideInput,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
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
    switch (e.target.value.toString()) {
      case '1':
        onHideInput()
        setFieldsValue({ seconds: null })
        break
      case '0':
        onShowInput()
        break
      default:
        onHideInput()
    }
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
            initialValue: item.TYPE || 1,
            rules: [
              {
                required: !typeDis,
                message: '请选择有效时长!',
              },
            ],
          })(<Radio.Group onChange={handleChange} disabled={typeDis}>
            <Radio value={1}>永久有效</Radio>
            <Radio value={0}>临时有效(最长一个的时间)</Radio>
          </Radio.Group>)}
        </FormItem>
        <FormItem label="有效期(天)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('seconds', {
            initialValue: item.SECONDS,
            rules: [
              {
                required: !inputDis,
                pattern: /(^[1-9]{1}$)|(^[0-2]{1}[0-9]{1}$)|(^30$)/,
                message: '请输入有效期!',
              },
            ],
          })(<Input disabled={inputDis} />)}
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
