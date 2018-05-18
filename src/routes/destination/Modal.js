import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Radio, Modal } from 'antd'

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
        <FormItem label="国家中文名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('countryCn', {
            initialValue: item.country_cn,
            rules: [
              {
                required: true,
                pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请输入中文名称!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="国家英文名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('countryEn', {
            initialValue: item.country_en,
            rules: [
              {
                required: true,
                pattern: /^[A-Za-z]{0,}([\s]{1}[A-Za-z]{1,}){0,}$/,
                message: '请输入英文名称!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="排序" hasFeedback {...formItemLayout}>
          {getFieldDecorator('sort', {
            initialValue: item.sort || 0,
            rules: [
              {
                required: true,
                message: '请输入排序!',
              },
            ],
          })(<Input type="number" />)}
        </FormItem>
        <FormItem label="热门国家" hasFeedback {...formItemLayout}>
          {getFieldDecorator('hot', {
            initialValue: item.hot,
            rules: [
              {
                required: true,
                message: '请输入包裹类型中文名称!',
              },
            ],
          })(
            <Radio.Group defaultValue={1}>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          )}
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
