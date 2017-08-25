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
  }

  const productChange=async function(data){
    await getProductType(JSON.parse(data).id)
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="目的地国家" hasFeedback {...formItemLayout}>
          {getFieldDecorator('destctry', {
            initialValue: item.destCtry,
            rules: [
              {
                required: true,
                message: '请选择目的地国家!',
              },
            ],
          })(<Select defaultValue="1" onSelect={handleChange} onFocus={handleClick}>{selectPackage}</Select>)}
        </FormItem>
        <FormItem label="物品(包裹)类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('cargotype', {
            initialValue: item.cargotype,
            rules: [
              {
                required: true,
                message: '请选择物品类型!',
              },
            ],
          })(<Select defaultValue='' onChange={productChange} disabled={productDis}>{selectParcelType}</Select>)}
        </FormItem>
        <FormItem label="产品类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('producttypeid', {
            initialValue: item.producttypeid,
            rules: [
              {
                required: true,
                message: '请选择产品类型!',
              },
            ],
          })(<Select defaultValue="" disabled={freightDis}>{selectProductType}</Select>)}
        </FormItem>
        <FormItem label="首重价格(¥)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('initialprice', {
            initialValue: item.initialprice,
            rules: [
              {
                required: true,
                message: '请输入首重价格!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="首重重量(kg)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('ykgweight', {
            initialValue: item.ykgweight,
            rules: [
              {
                required: true,
                message: '请输入首重重量!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="续重价格(¥)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('continuedheavyprice', {
            initialValue: item.continuedheavyprice,
            rules: [
              {
                required: true,
                message: '请输入续重价格!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="步进重量(kg)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('stepping', {
            initialValue: item.stepping,
            rules: [
              {
                required: true,
                message: '请输入步进重量!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="燃油附加费(¥)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('fuelcharge', {
            initialValue: item.fuelcharge,
            rules: [
              {
                required: true,
                message: '请输入燃油附加费!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="邮编段" hasFeedback {...formItemLayout}>
          {getFieldDecorator('zipcodesegment', {
            initialValue: item.zipcodesegment,
            rules: [
              {
                required: true,
                message: '请输入邮编段!',
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
