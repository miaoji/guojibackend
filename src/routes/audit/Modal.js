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
      	<FormItem label="状态" hasFeedback {...formItemLayout}>
          {getFieldDecorator('status', {
            initialValue: item.status,
            rules: [
              {
                required: true,
                message: '请选择状态！',
              },
            ],
          })(
            <Radio.Group>
              <Radio value={0}>未提现</Radio>
              <Radio value={1}>体现成功</Radio>
              <Radio value={2}>拒绝</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="原因" hasFeedback {...formItemLayout}>
          {getFieldDecorator('reason', {
            initialValue: item.reason,
            rules: [
              {
                required: true,
                message: '请输入推广等级!',
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
