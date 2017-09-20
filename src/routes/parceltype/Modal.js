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
      onOk(data)
    })
  }

  const handleClick= async function() {
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
          {getFieldDecorator('destination', {
            initialValue: item.country_cn,
            rules: [
              {
                required: true,
                message: '请输入目的地国家!',
              },
            ],
          })(<Select defaultValue="1" onFocus={handleClick}>{selectNation}</Select>)}
        </FormItem>
        <FormItem label="包裹类型中文名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('nameCn', {
            initialValue: item.NAME_CN || '包裹',
            rules: [
              {
                required: true,
                message: '请输入包裹类型中文名称!',
              },
            ],
          })(
            <Radio.Group defaultValue={'包裹'}>
              <Radio value={'包裹'}>包裹</Radio>
              <Radio value={'文件'}>文件</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="最小重量(kg)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('minRange', {
            initialValue: item.MIN_RANGE,
            rules: [
              {
                required: true,
                pattern: /^[0-9]{1,}([\.]{1}[0-9]{1,}){0,1}$/,
                message: '请输入最小重量!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="最大重量(kg)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('maxRange', {
            initialValue: item.MAX_RANGE,
            rules: [
              {
                required: true,
                pattern: /^[0-9]{1,}([\.]{1}[0-9]{1,}){0,1}$/,
                message: '请输入最大重量!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="备注" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.REMARK,
            rules: [
              {
                required: false,
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
