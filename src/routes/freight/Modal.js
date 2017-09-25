import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select } from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item
const Option = Select.Option

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
  selectPackage,
  getPackage,
  selectParcelType,
  getParcelType,
  selectProductType,
  getProductType,
  productDis,
  freightDis,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue
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
    // 处理selectPackage 放入 option中
    await getPackage()
  }

  const handleChange=async function(data){
    //通过目的地查询包裹类型
    await getParcelType(data)
    setFieldsValue({
      packageType:null,
      productType:null
    })
  }

  const productChange=async function(data){
    await getProductType(JSON.parse(data).id)
    setFieldsValue({productType:null})
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
                message: '请选择目的地国家!',
              },
            ],
          })(<Select defaultValue="1" onChange={handleChange} onFocus={handleClick}>{selectPackage}</Select>)}
        </FormItem>
        <FormItem label="物品(包裹)类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('packageType', {
            initialValue: item.name_cn,
            rules: [
              {
                required: true,
                message: '请选择物品类型!',
              },
            ],
          })(<Select defaultValue='' onChange={productChange} disabled={productDis}>{selectParcelType}</Select>)}
        </FormItem>
        <FormItem label="产品类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('productType', {
            initialValue: item.product_name,
            rules: [
              {
                required: true,
                message: '请选择产品类型!',
              },
            ],
          })(<Select defaultValue="" disabled={freightDis}>{selectProductType}</Select>)}
        </FormItem>
        <FormItem label="首重价格(¥)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('initPrice', {
            initialValue: item.INIT_PRICE,
            rules: [
              {
                required: true,
                pattern: /^[0-9]{1,}([\.]{1}[0-9]{1,}){0,1}$/,
                message: '请输入首重价格!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="首重重量(kg)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('initWeight', {
            initialValue: item.INIT_WEIGHT,
            rules: [
              {
                required: true,
                pattern: /^[0-9]{1,}([\.]{1}[0-9]{1,}){0,1}$/,
                message: '请输入首重重量!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="续重价格(¥)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('steppingPrice', {
            initialValue: item.STEPPING_PRICE,
            rules: [
              {
                required: true,
                pattern: /^[0-9]{1,}([\.]{1}[0-9]{1,}){0,1}$/,
                message: '请输入续重价格!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="步进重量(kg)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('steppingWeight', {
            initialValue: item.STEPPING_WEIGHT,
            rules: [
              {
                required: true,
                pattern: /^[0-9]{1,}([\.]{1}[0-9]{1,}){0,1}$/,
                message: '请输入步进重量!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="燃油附加费(¥)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('fuelCharge', {
            initialValue: item.FUEL_CHARGE,
            rules: [
              {
                required: true,
                pattern: /^[0-9]{1,}([\.]{1}[0-9]{1,}){0,1}$/,
                message: '请输入燃油附加费!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="邮编段" hasFeedback {...formItemLayout}>
          {getFieldDecorator('postcode', {
            initialValue: item.POSTCODE || '',
            rules: [
              {
                required: false,
                pattern: /^[0-9]{6}$/,
                message: '请输入邮编段!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="备注" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.REMARK || '',
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
  productDis: PropTypes.Blooean,
  freightDis: PropTypes.Blooean,
  selectPackage: PropTypes.object,
  getPackage: PropTypes.func,
  onOk: PropTypes.func
}

export default Form.create()(modal)
