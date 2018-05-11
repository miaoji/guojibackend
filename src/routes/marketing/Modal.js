import React from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Modal,
} from 'antd'

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

  console.log('type', type)

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="优惠券ID" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                // pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请输入优惠券ID!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <div style={{ display: ((type === 'sendVoucher' || type === 'pushMsgByUser') ? 'block' : 'none') }}>
          <FormItem label="优惠券金额" hasFeedback {...formItemLayout}>
            {getFieldDecorator('couponMoney', {
              rules: [
                {
                  required: true,
                  // pattern: /^[\u4e00-\u9fa5]{0,}$/,
                  message: '请输入优惠券金额!',
                },
              ],
            })(<Input />)}
          </FormItem>
        </div>
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
