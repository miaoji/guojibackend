import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'
// import classnames from 'classnames'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const bootModal = ({
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
        <FormItem style={{ marginTop: '20px' }} label="订单号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('orderNo', {
            initialValue: item.orderNo,
            rules: [
              {
                required: true,
                message: '请输入订单号!',
              },
            ],
          })(<Input disabled />)}
        </FormItem>
        <FormItem label="运费金额(元)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('totalFee', {
            initialValue: item.totalFee / 100 || null,
            rules: [
              {
                required: true,
                pattern: /^([0-9]*)+(.[0-9]{1,2})?$/,
                message: '请输入有效的数字!',
              },
            ],
          })(<Input placeholder="请输入运费金额" />)}
        </FormItem>
        <FormItem label="备注信息" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            rules: [
              {
                required: true,
                message: '请输入备注信息!',
              },
            ],
          })(<Input placeholder="请输入备注信息" />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

bootModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(bootModal)
