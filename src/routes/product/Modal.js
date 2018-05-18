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
  selectParcelType,
  getParcelType,
  productDis,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
    resetFields,
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
  const handleClick = async function() {
    // 处理selectPackage 放入 option中
    // 获取国际信息
    // await getNation()
  }

  const handleChange = async function(data) {
    // 通过目的地查询包裹类型
    await getParcelType(data)
    // 当目的地的数据改变时,清空包裹类型select组件的数据
    setFieldsValue({ packageType: null })
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
            initialValue: item.country_cn,
            rules: [
              {
                required: true,
                message: '请输入目的地国家!',
              },
            ],
          })(<Select placeholder="输入文字可搜索" showSearch onChange={handleChange} onFocus={handleClick}>{selectNation}</Select>)}
        </FormItem>
        <FormItem label="订单类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('cargoType', {
            initialValue: item.CARGO_TYPE || 0,
            rules: [
              {
                required: true,
                message: '请输入包裹类型中文名称!',
              },
            ],
          })(
            <Radio.Group defaultValue={0}>
              <Radio value={0}>直邮订单</Radio>
              <Radio value={1}>集运订单</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="包裹类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('packageType', {
            initialValue: item.NAME_CN,
            rules: [
              {
                required: true,
                message: '请输入包裹类型!',
              },
            ],
          })(<Select placeholder="点击选择" value="1" disabled={productDis}>{selectParcelType}</Select>)}
        </FormItem>
        <FormItem label="产品名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('productName', {
            initialValue: item.PRODUCT_NAME,
            rules: [
              {
                required: true,
                message: '请输入产品名称!',
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
  productDis: PropTypes.Blooean,
  item: PropTypes.object,
  selectNation: PropTypes.object,
  getNation: PropTypes.func,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
