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
  selectNation,
  getNation,
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
//    不需要的方法
      onOk(data)
    })
  }

  const handleClick= async function() {
    // 处理selectPackage 放入 option中
    await getNation()
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
      	<FormItem label="目的地国家" hasFeedback {...formItemLayout}>
          {getFieldDecorator('nation', {
            initialValue: item.nation,
            rules: [
              {
                required: true,
                message: '请输入目的地国家!',
              },
            ],
          })(<Select defaultValue="1" onFocus={handleClick}>{selectNation}</Select>)}
        </FormItem>
        <FormItem label="包裹类型中文名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name_ch', {
            initialValue: item.name_ch,
            rules: [
              {
                required: true,
                message: '请输入包裹类型中文名称!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="包裹类型英文名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name_en', {
            initialValue: item.name_en,
            rules: [
              {
                required: true,
                message: '请输入包裹类型英文名称!',
              },
            ],
          })(<Input />)}
        </FormItem>
        
        <FormItem label="最小重量(kg)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('min_range', {
            initialValue: item.min_range,
            rules: [
              {
                required: true,
                message: '请输入最小重量!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="最大重量(kg)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('max_range', {
            initialValue: item.max_range,
            rules: [
              {
                required: true,
                message: '请输入最大重量!',
              },
            ],
          })(<Input />)}
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
  selectPackage: PropTypes.object,
  getPackage: PropTypes.func,
  onOk: PropTypes.func
}

export default Form.create()(modal)
