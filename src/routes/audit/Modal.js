import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Radio, Modal } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const modal = ({
  item = {},
  onOk,
  onShowReasonInput,
  disReasonInput,
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

  const handleChange = (e) => {
    const index = e.target.value
    onShowReasonInput({ status: index })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const statusOption = item.type === 2 ? [<Radio value={1}>允许提现</Radio>, <Radio value={2}>拒绝</Radio>] : [<Radio value={0}>未提现</Radio>, <Radio value={1}>提现成功</Radio>, <Radio value={2}>拒绝</Radio>]

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
            <Radio.Group onChange={handleChange}>{statusOption}</Radio.Group>
          )}
        </FormItem>
        <div style={{ display: disReasonInput ? 'none' : 'block' }}>
          <FormItem label="原因" hasFeedback {...formItemLayout}>
            {getFieldDecorator('reason', {
              initialValue: item.reason,
              rules: [
                {
                  required: !disReasonInput,
                  message: '请输入推广等级!',
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
  selectPackage: PropTypes.object,
  getPackage: PropTypes.func,
  onOk: PropTypes.func,
  onShowReasonInput: PropTypes.func,
  disReasonInput: PropTypes.Boolean,
}

export default Form.create()(modal)
