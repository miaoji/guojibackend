import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Cascader } from 'antd'

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
  selectWxuser,
  modalType,
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
  let options = []
  for (let i = 0; i < 24; i++) {
    options.push({ value: i, label: `${i}时`, children: [] })
    for (let j = 0; j < 60; j++) {
      options[i].children.push({ value: j, label: `${j}分` })
    }
  }
  console.log('options', options)
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="推送时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('pushtime', {
            // initialValue: item.nickName,
            rules: [
              {
                required: true,
                message: '请选择推送时间!',
              },
            ],
          })(<Cascader options={options} showSearch placeholder="点击选择" />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
  selectWxuser: PropTypes.array,
  modalType: PropTypes.string
}

export default Form.create()(modal)
