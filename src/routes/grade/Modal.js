import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Select } from 'antd'
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
      	<FormItem label="推广等级" hasFeedback {...formItemLayout}>
          {getFieldDecorator('spreadLevel', {
            initialValue: item.spreadLevel,
            rules: [
              {
                required: true,
                message: '请输入推广等级!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="等级名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('spreadName', {
            initialValue: item.spreadName,
            rules: [
              {
                required: true,
                message: '请输入等级名称!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="需累计消费(￥)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('spreadConsumption', {
            initialValue: item.spreadConsumption ? item.spreadConsumption/100 : '',
            rules: [
              {
                required: true,
                // pattern: /^[0-9]{1,}([\.]{1}[0-9]{1,}){0,1}$/,
                message: '请输入需累计消费金额!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="获取推广费用比例" hasFeedback {...formItemLayout}>
          {getFieldDecorator('consumptionRatio', {
            initialValue: item.consumptionRatio,
            rules: [
              {
                required: true,
                // pattern: /^[0-9]{1,}([\.]{1}[0-9]{1,}){0,1}$/,
                message: '请输入获取推广费用比例!',
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
  selectPackage: PropTypes.object,
  getPackage: PropTypes.func,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
