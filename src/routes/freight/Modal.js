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
//    data.address = data.address.join(' ')
console.log('data',data)
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
        <FormItem label="目的地国家" hasFeedback {...formItemLayout}>
          {getFieldDecorator('destctry', {
            initialValue: item.destCtry,
            rules: [
              {
                required: true,
                message: '请输入目的地国家!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="物品类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('cargotype', {
            initialValue: item.cargotype,
            rules: [
              {
                required: true,
                message: '请输入物品类型!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="产品类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('producttypeid', {
            initialValue: item.producttypeid,
            rules: [
              {
                required: true,
                message: '请输入产品类型!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="首重价格" hasFeedback {...formItemLayout}>
          {getFieldDecorator('initialprice', {
            initialValue: item.initialprice,
            rules: [
              {
                required: true,
                message: '请输入首重价格!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="首重重量" hasFeedback {...formItemLayout}>
          {getFieldDecorator('ykgweight', {
            initialValue: item.ykgweight,
            rules: [
              {
                required: true,
                message: '请输入首重重量!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="续重价格" hasFeedback {...formItemLayout}>
          {getFieldDecorator('continuedheavyprice', {
            initialValue: item.continuedheavyprice,
            rules: [
              {
                required: true,
                message: '请输入续重价格!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="步进重量" hasFeedback {...formItemLayout}>
          {getFieldDecorator('stepping', {
            initialValue: item.stepping,
            rules: [
              {
                required: true,
                message: '请输入步进重量!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="燃油附加费" hasFeedback {...formItemLayout}>
          {getFieldDecorator('fuelcharge', {
            initialValue: item.fuelcharge,
            rules: [
              {
                required: true,
                message: '请输入燃油附加费!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="邮编段" hasFeedback {...formItemLayout}>
          {getFieldDecorator('zipcodesegment', {
            initialValue: item.zipcodesegment,
            rules: [
              {
                required: true,
                message: '请输入邮编段!',
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
