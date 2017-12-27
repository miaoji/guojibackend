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

const modal = ({
  item = {},
  onOk,
  selectNation,
  selectParcelType,
  selectProductType,
  parcelDis,
  productDis,
  getParcelType,
  getProductType,
  selectWeChatUser,
  getIntlPrice,
  intlPrice,
  setInsuredVisiable,
  insuredVisiable,
  packageBin,
  setPackageBin,
  selectKdCompany,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    if (packageBin.length === 0) {
      message.warn('您还没有录入包裹信息呢!!!')
      return
    }
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
        packageBin,
      }
      onOk(data)
    })
  }

  const countryChange = async function(e) {
    await getProvince(e)
    setFieldsValue({
      sendProv: undefined,
      sendCity: undefined,
      sendCounty: undefined,
    })
  }

  const provinceChange = async function(e) {
    await getCity(e)
    setFieldsValue({
      sendCity: undefined,
      sendCounty: undefined,
    })
  }

  const cityChange = async function(e) {
    await getCounty(e)
    setFieldsValue({
      sendCounty: undefined,
    })
  }

  const packageChange = async function(data) {
    // 通过目的地查询包裹类型
    await getParcelType(data)
    setFieldsValue({
      packageType: undefined,
      productType: undefined,
    })
  }

  const productChange = async function(data) {
    await getProductType(JSON.parse(data).id)
    setFieldsValue({ productType: undefined })
  }

  const handleClick = function () {
    const data = getFieldsValue()
    if (!data.weight) {
      message.warn('您还没有填写包裹重量呢!!!')
      return
    }
    if (!data.insuredAmount && data.insured == 1) {
      message.warn('您选择了保价,但没有填写保价金额!!!')
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

  const sendClick = function () {
    const data = getFieldsValue()
    if (!data.orderName) {
      message.warn('请输入包裹品名!!!')
      return
    }
    if (!data.totalFee) {
      message.warn('请输入包裹价值!!!')
      return
    }
    if (!data.kdCompanyCodeCn) {
      message.warn('请选择快递公司!!!')
      return
    }
    if (!data.cnNo) {
      message.warn('请输入国内单号!!!')
      return
    }

    setPackageBin({
      orderName: data.orderName,
      totalFee: data.totalFee,
      kdCompanyCodeCn: data.kdCompanyCodeCn,
      cnNo: data.cnNo,
      packageBin,
    })
    setFieldsValue({ orderName: undefined, totalFee: undefined, kdCompanyCodeCn: undefined, cnNo: undefined })
  }

  const insuredChange = function (e) {
    setInsuredVisiable(e.target.value)
    if (e.target.value === 0) {
      setFieldsValue({ insuredAmount: undefined })
    }
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>-- 选择对应用户信息 --</p>
        <hr className={classnames({ [styles.hr]: true })} />
        <FormItem style={{ marginTop: '6px' }} label="微信用户" hasFeedback {...formItemLayout}>
          {getFieldDecorator('wxUserId', {
            rules: [
              {
                required: false,
                message: '请选择微信用户!',
              },
            ],
          })(<Select showSearch placeholder="点击选择可按用户名和手机号码搜索">{selectWeChatUser}</Select>)}
        </FormItem>
        <hr className={classnames({ [styles.hr]: true })} />
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>-- 添加收件地址信息 --</p>
        <hr className={classnames({ [styles.hr]: true })} />
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
                message: '请输入收件人地址邮编!',
              },
            ],
          })(<Input placeholder="请输入收件人地址邮编!" />)}
        </FormItem>
        <hr className={classnames({ [styles.hr]: true })} />
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>-- 添加包裹 --</p>
        <hr className={classnames({ [styles.hr]: true })} />
        <FormItem label="包裹品名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('orderName', {
            rules: [
              {
                message: '请输入包裹品名!',
              },
            ],
          })(<Input placeholder="请输入包裹品名!" />)}
        </FormItem>
        <FormItem label="包裹价值" hasFeedback {...formItemLayout}>
          {getFieldDecorator('totalFee', {
            rules: [
              {
                message: '请输入包裹价值!',
              },
            ],
          })(<Input placeholder="请输入包裹价值!" />)}
        </FormItem>
        <FormItem label="快递公司" hasFeedback {...formItemLayout}>
          {getFieldDecorator('kdCompanyCodeCn', {
            rules: [
              {
                message: '请选择快递公司名!',
              },
            ],
          })(<Select showSearch placeholder="输入快递公司名称可搜索">{selectKdCompany}</Select>)}
        </FormItem>
        <FormItem label="国内单号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('cnNo', {
            rules: [
              {
                message: '请输入收件人国内单号!',
              },
            ],
          })(<Input placeholder="请输入国内单号!" />)}
        </FormItem>
        <FormItem label="确认创建" hasFeedback {...formItemLayout}>
          {getFieldDecorator('aaaa', {
            rules: [],
          })(<Button onClick={sendClick} size="large" type="primary">创建</Button>)}
        </FormItem>
        <div className={classnames({ [styles.hide]: packageBin.length === 0 })}>
          <hr className={classnames({ [styles.hr]: true })} />
          <table className={classnames({ [styles.tables]: true })}>
            <tr>
              <td>品名</td>
              <td>价值</td>
              <td>快递公司</td>
              <td>国内单号</td>
            </tr>
            {
              packageBin.map((item) => {
                return (<tr>
                  <td>{item.orderName}</td>
                  <td>{item.totalFee}</td>
                  <td>{item.kdCompanyCodeCn.split('/-/')[0]}</td>
                  <td>{item.cnNo}</td>
                  </tr>)
              })
            }
          </table>
        </div>
        <hr className={classnames({ [styles.hr]: true })} />
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
