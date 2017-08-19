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
//		不需要的参数
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
        <FormItem label="包裹类型编码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('producttypeid', {
            initialValue: item.producttypeid,
            rules: [
              {
                required: true,
                message: '请输入包裹类型编码!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="产品名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('product_name', {
            initialValue: item.product_name,
            rules: [
              {
                required: true,
                message: '请输入产品名称!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="状态" hasFeedback {...formItemLayout}>
          {getFieldDecorator('state', {
            initialValue: item.state,
            rules: [
              {
                required: true,
                type: 'number',
                message: '请选择状态!',
              },
            ],
          })(
            <Radio.Group>
              <Radio value={1}>生效</Radio>
              <Radio value={2}>失效</Radio>
            </Radio.Group>
          )}
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
