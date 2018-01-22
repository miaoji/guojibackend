import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input, Col, Icon } from 'antd'
import { config } from '../../utils'
import styles from './index.less'

const FormItem = Form.Item

const Login = ({
  login,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  const { loginLoading, verifyImage, loginType, getCodeAuth, codeLoading } = login

  /**
   * [帐号密码登录]
   * @return {[type]} [description]
   */
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: `login/${loginType}Login`, payload: values })
    })
  }

  /**
   * [刷新二维码]
   * @return {[type]} [description]
   */
  function handleRefreshImage() {
    dispatch({ type: 'login/handleRefreshImage' })
  }

  /**
   * [切换登录方式]
   * @return {[type]} [description]
   */
  function switchLoginType() {
    dispatch({
      type: 'login/switchLoginType',
      payload: {
        loginType,
      },
    })
  }

  /**
   * [获取手机号验证码]
   * @return {[type]} [description]
   */
  function handleGetCode() {
    validateFieldsAndScroll((errors, values) => {
      if (!values.mobile) {
        return
      }
      dispatch({
        type: 'login/getVerifyCodeByMobile',
        payload: {
          mobile: values.mobile,
        },
      })
      setTimeout(() => {
        dispatch({
          type: 'login/setCodeAuth',
          payload: {
            getCodeAuth: true,
          },
        })
      }, 30000)
    })
  }

  return (
    <div>
      <canvas id="background"></canvas>
      <div className={styles.form}>
        <h3 className={styles.switch} onClick={switchLoginType}>
          {
            loginType === 'account' ? '手机验证码登录' : '帐号密码登录'
          }
          <Icon type="double-right" />
        </h3>
        <div className={styles.logo}>
          <img alt={'logo'} src={config.logo} />
          <span>{config.name}</span>
        </div>
        {
          loginType === 'account' ?
            <form>
              <FormItem hasFeedback>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: '请输入用户名',
                    },
                  ],
                })(<Input size="large" onPressEnter={handleOk} placeholder="用户名" />)}
              </FormItem>
              <FormItem hasFeedback>
                <Row type="flex" align="middle">
                  <Col span={16}>
                    <img src={verifyImage} alt="验证码" className={styles.verifyimage} />
                  </Col>
                  <Col span={8}>
                    <Button className={styles.button} type="primary" size="small" onClick={handleRefreshImage} >刷新</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator('imageCode', {
                  rules: [
                    {
                      required: true,
                      message: '请输入验证码',
                    },
                  ],
                })(<Input size="large" onPressEnter={handleOk} placeholder="验证码" />)}
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码',
                    },
                  ],
                })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="密码" />)}
              </FormItem>
              <Row>
                <Button type="primary" size="large" onClick={handleOk} loading={loginLoading}>
                  登录
                </Button>
              </Row>
            </form>
            : <form>
              <FormItem hasFeedback>
                {getFieldDecorator('mobile', {
                  rules: [
                    {
                      required: true,
                      message: '请输入手机号',
                      pattern: /^1[3456789]\d{9}$/,
                    },
                  ],
                })(<Input size="large" type="number" onPressEnter={handleOk} placeholder="手机号" />)}
              </FormItem>
              <FormItem
                hasFeedback
                extra="请输入获取到的验证码"
              >
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('code', {
                      rules: [
                        {
                          required: true,
                          message: '请输入验证码',
                        },
                      ],
                    })(<Input size="large" type="number" onPressEnter={handleOk} placeholder="验证码" />)}
                  </Col>
                  <Col span={8}>
                    <Button size="large" onClick={handleGetCode} disabled={!getCodeAuth} loading={codeLoading}>
                      {getCodeAuth ? '点击获取' : '30s后重新获取'}
                    </Button>
                  </Col>
                </Row>
              </FormItem>
              <Row>
                <Button type="primary" size="large" onClick={handleOk} loading={loginLoading}>
                  登录
                </Button>
              </Row>
            </form>
        }
      </div>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ login }) => ({ login }))(Form.create()(Login))
