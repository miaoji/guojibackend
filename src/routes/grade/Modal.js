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
          })(<Input placeholder="请输入推广等级" />)}
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
          })(<Input placeholder="请输入等级名称" />)}
        </FormItem>
        <FormItem label="需累计消费(￥)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('spreadConsumption', {
            initialValue: item.spreadConsumption ? item.spreadConsumption / 100 : '',
            rules: [
              {
                required: true,
                pattern: /^[0-9]{1,}([\.]{1}[0-9]{1,}){0,1}$/,
                message: '请输入需累计消费金额!',
              }
            ]
          })(<Input placeholder="请输入需累计消费金额" />)}
        </FormItem>
        <FormItem label="一级分红比例(%)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('consumptionRatio', {
            initialValue: item.consumptionRatio ? item.consumptionRatio * 100 : '8',
            rules: [
              {
                required: true,
                pattern: /^100$|^[1-9][0-9]$|^[1-9]$/,
                message: '请输入一级分红比例!',
              },
            ],
          })(<Input placeholder="请输入一级分红比例" />)}
        </FormItem>
        <FormItem label="二级分红比例(%)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('consumptionRatioSecond', {
            initialValue: item.consumptionRatioSecond ? item.consumptionRatioSecond * 100 : '20',
            rules: [
              {
                required: true,
                pattern: /^100$|^[1-9][0-9]$|^[1-9]$/,
                message: '请输入二级分红比例!',
              },
            ],
          })(<Input placeholder="请输入二级分红比例" />)}
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
