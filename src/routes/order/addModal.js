import React from 'react'
import PropTypes from 'prop-types'
import { message, Form, Input, InputNumber, Modal, Radio, Select, Row, Col, Button } from 'antd'
import styles from './Modal.less'
import classnames from 'classnames'

const FormItem = Form.Item
const RadioGroup = Radio.Group

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const addModal = ({
  item = {},
  onOk,
  selectNation,
  selectProvince,
  selectCity,
  selectCounty,
  provinceDis,
  cityDis,
  districtDis,
  getCountry,
  getProvince,
  getCity,
  getCounty,
  selectParcelType,
  selectProductType,
  parcelDis,
  productDis,
  getParcelType,
  getProductType,
  selectWeChatUser,
  getIntlPrice,
  intlPrice,
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

const countryChange = async function(e) {
    await getProvince(e)
    setFieldsValue({
      sendProv: null,
      sendCity: null,
      sendCounty: null,
    })
  }

  const provinceChange = async function(e) {
    await getCity(e)
    setFieldsValue({
      sendCity: null,
      sendCounty: null,
    })
  }

  const cityChange = async function(e) {
    await getCounty(e)
    setFieldsValue({
      sendCounty: null,
    })
  }

  const packageChange = async function(data) {
    // 通过目的地查询包裹类型
    await getParcelType(data)
    setFieldsValue({
      packageType: null,
      productType: null,
    })
  }

  const productChange = async function(data) {
    await getProductType(JSON.parse(data).id)
    setFieldsValue({ productType: null })
  }

  const handleClick = function() {
    const data = getFieldsValue()
    if (!data.weight) {
      message.warn('您还没有填写包裹重量呢!!!')
      return
    }
    if (!data.receiverCountry) {
      message.warn('您还没有选择收件国家呢!!!')
      return
    }
    if (!data.packageType) {
      message.warn('您还没有选择包裹类型呢!!!')
      return
    }
    if (!data.productType) {
      message.warn('您还没有选择产品类型呢!!!')
      return
    }
    const newdata = {
      weight: data.weight,
      countryId: JSON.parse(data.receiverCountry).id,
      packageTypeId: JSON.parse(data.packageType).id,
      productTypeId: data.productType,
    }
    getIntlPrice(newdata)
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem style={{marginTop: '6px'}} label="微信用户" hasFeedback {...formItemLayout}>
          {getFieldDecorator('wxUserId', {
            rules: [
              {
                required: false,
                message: '请选择微信用户!',
              },
            ],
          })(<Select showSearch placeholder="点击选择可按用户名和手机号码搜索">{selectWeChatUser}</Select>)}
        </FormItem>
        <hr className={classnames({[styles.hr]: true})}/>
        <FormItem label="包裹长度" hasFeedback {...formItemLayout}>
          {getFieldDecorator('length', {
            rules: [
              {
                required: false,
                message: '请输入包裹长度!',
              },
            ],
          })(<Input placeholder="请输入包裹长度!" />)}
        </FormItem>
        <FormItem label="包裹宽度" hasFeedback {...formItemLayout}>
          {getFieldDecorator('width', {
            rules: [
              {
                required: false,
                message: '请输入包裹宽度!',
              },
            ],
          })(<Input placeholder="请输入包裹宽度!" />)}
        </FormItem>
        <FormItem label="包裹高度" hasFeedback {...formItemLayout}>
          {getFieldDecorator('height', {
            rules: [
              {
                required: false,
                message: '请输入包裹高度!',
              },
            ],
          })(<Input placeholder="请输入包裹高度!" />)}
        </FormItem>
        <FormItem label="包裹重量" hasFeedback {...formItemLayout}>
          {getFieldDecorator('weight', {
            rules: [
              {
                required: true,
                message: '请输入包裹重量!',
              },
            ],
          })(<Input placeholder="请输入包裹重量!" />)}
        </FormItem>
        <FormItem label="是否退件" hasFeedback {...formItemLayout}>
          {getFieldDecorator('returnGood', {
            initialValue: 1,
            rules: [
              {
                required: false,
                message: '请输入是否退件!',
              },
            ],
          })(<RadioGroup>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </RadioGroup>)}
        </FormItem>
        <FormItem label="是否保价" hasFeedback {...formItemLayout}>
          {getFieldDecorator('insured', {
            initialValue: 1,
            rules: [
              {
                required: false,
                message: '请输入是否保价!',
              },
            ],
          })(<RadioGroup>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </RadioGroup>)}
        </FormItem>
        <FormItem label="保价金额" hasFeedback {...formItemLayout}>
          {getFieldDecorator('insuredAmount', {
            rules: [
              {
                required: false,
                message: '请输入保价金额!',
              },
            ],
          })(<Input placeholder="请输入保价金额!" />)}
        </FormItem>
        <hr className={classnames({[styles.hr]: true})}/>
        <FormItem label="寄件人姓名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('senderName', {
            rules: [
              {
                required: true,
                message: '请输入寄件人姓名!',
              },
            ],
          })(<Input placeholder="请输入寄件人姓名!" />)}
        </FormItem>
        <FormItem label="寄件人手机号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('senderMobile', {
            rules: [
              {
                required: true,
                message: '请输入寄件人手机号!',
              },
            ],
          })(<Input placeholder="请输入寄件人手机号!" />)}
        </FormItem>
        <FormItem label="寄件人省份" hasFeedback {...formItemLayout}>
          {getFieldDecorator('senderProv', {
            rules: [
              {
                required: true,
                message: '请选择寄件人省份!',
              },
            ],
          })(<Select placeholder="请选择寄件人省份" onChange={provinceChange}>{selectProvince}</Select>)}
        </FormItem>
        <FormItem label="寄件人市级" hasFeedback {...formItemLayout}>
          {getFieldDecorator('senderCity', {
            rules: [
              {
                required: true,
                message: '请选择寄件人市级!',
              },
            ],
          })(<Select disabled={cityDis} placeholder="请选择寄件人市级" onChange={cityChange}>{selectCity}</Select>)}
        </FormItem>
        <FormItem label="寄件人县区" hasFeedback {...formItemLayout}>
          {getFieldDecorator('senderCounty', {
            rules: [
              {
                required: true,
                message: '请选择寄件人县区!',
              },
            ],
          })(<Select disabled={districtDis} placeholder="请选择寄件人县区！">{selectCounty}</Select>)}
        </FormItem>
        <FormItem label="寄件人地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('senderAddress', {
            rules: [
              {
                required: true,
                message: '请输入寄件人地址!',
              },
            ],
          })(<Input placeholder="请输入寄件人地址!" />)}
        </FormItem>
        <FormItem label="寄件人邮编" hasFeedback {...formItemLayout}>
          {getFieldDecorator('senderPostcode', {
            rules: [
              {
                required: true,
                message: '请输入寄件人邮编!',
              },
            ],
          })(<Input placeholder="请输入寄件人邮编!" />)}
        </FormItem>
        <hr className={classnames({[styles.hr]: true})}/>
        <FormItem label="收件人姓名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('receiverName', {
            rules: [
              {
                required: true,
                message: '请输入收件人姓名!',
              },
            ],
          })(<Input placeholder="请输入收件人姓名!" />)}
        </FormItem>
        <FormItem label="收件人手机" hasFeedback {...formItemLayout}>
          {getFieldDecorator('receiverMobile', {
            rules: [
              {
                required: true,
                message: '请输入收件人手机!',
              },
            ],
          })(<Input placeholder="请输入收件人手机!" />)}
        </FormItem>
        <FormItem label="收件人国家" hasFeedback {...formItemLayout}>
          {getFieldDecorator('receiverCountry', {
            rules: [
              {
                required: true,
                message: '请选择收件人国家!',
              },
            ],
          })(<Select onChange={packageChange} placeholder="请选择收件人国家">{selectNation}</Select>)}
        </FormItem>
        <FormItem label="收件人地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('receiverAddress', {
            rules: [
              {
                required: true,
                message: '请输入收件人地址!',
              },
            ],
          })(<Input placeholder="请输入收件人地址!" />)}
        </FormItem>
        <FormItem label="收件地址邮编" hasFeedback {...formItemLayout}>
          {getFieldDecorator('receiverPostcode', {
            rules: [
              {
                required: true,
                message: '请输入收件人地址邮编!',
              },
            ],
          })(<Input placeholder="请输入收件人地址邮编!" />)}
        </FormItem>
        <hr className={classnames({[styles.hr]: true})}/>
        <FormItem label="物品(包裹)类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('packageType', {
            rules: [
              {
                required: true,
                message: '请选择物品类型!',
              },
            ],
          })(<Select placeholder="请选择物品类型" onChange={productChange} disabled={parcelDis}>{selectParcelType}</Select>)}
        </FormItem>
        <FormItem label="产品类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('productType', {
            rules: [
              {
                required: true,
                message: '请选择产品类型!',
              },
            ],
          })(<Select placeholder="请选择产品类型" disabled={productDis}>{selectProductType}</Select>)}
        </FormItem>
        <FormItem label="运费(元)" hasFeedback {...formItemLayout}>
          <Row gutter={24}>
            <Col span={12}>
              {getFieldDecorator('totalFee', {
                initialValue: intlPrice.finalPrice || undefined,
                rules: [{ required: true, message: 'Please input the captcha you got!' }],
              })(
                <Input value={intlPrice} size="large" />
              )}
            </Col>
            <Col span={9}>
              <Button type="primary" size="large" onClick={handleClick}>查询运费</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="备注" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            rules: [
              {
                required: false,
                message: '请输入备注信息!',
              },
            ],
          })(<Input placeholder="请输入备注信息!" />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

addModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(addModal)
