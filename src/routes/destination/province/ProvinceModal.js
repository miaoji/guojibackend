import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Modal } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const provinceModal = ({
  item = {},
  onOk,
  query,
  list,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...provinceModalProps
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
    ...provinceModalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="省份/州中文名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请输入中文名称!',
              },
            ],
          })(<Input placeholder='新建省份/州, 输入名称后按确定键' />)}
        </FormItem>
        <FormItem label="省份/州英文名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('englishname', {
            rules: [
              {
                required: true,
                pattern: /^[A-Za-z\s]{0,}$/,
                message: '请输入英文名称!',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
      <h3>已有省份</h3>
      {list}
    </Modal>
  )
}

provinceModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  query: PropTypes.func,
  list: PropTypes.array
}

export default Form.create()(provinceModal)
