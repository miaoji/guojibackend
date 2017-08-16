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
      data.address = data.address.join(' ')
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
        <FormItem label="帐号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('accounts', {
            initialValue: item.accounts,
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: '请输入帐号!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('pwd', {
            initialValue: item.pwd,
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: '请输入密码!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="经营者姓名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '请输入经营者姓名!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="店铺名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('storename', {
            initialValue: item.storename,
            rules: [
              {
                required: true,
                message: '请输入店铺名称!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="店铺级别" hasFeedback {...formItemLayout}>
          {getFieldDecorator('level', {
            initialValue: item.level,
            rules: [
              {
                required: true,
                type: 'number',
                message: '请选择店铺级别!',
              },
            ],
          })(
            <Radio.Group>
              <Radio value={1}>主张号</Radio>
              <Radio value={0}>子帐号</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="所属上级" hasFeedback {...formItemLayout}>
          {getFieldDecorator('superior', {
            initialValue: item.superior,
            rules: [
              {
                required: (Number(item.superior) === 1),
                pattern: /^1[34578]\d{9}$/,
                message: '请输入所属上级!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: item.address && item.address.split(' '),
            rules: [
              {
                required: true,
              },
            ],
          })(<Cascader
            size="large"
            style={{ width: '100%' }}
            options={city}
            placeholder="选择一个地址"
          />)}
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
