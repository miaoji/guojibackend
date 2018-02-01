import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { time, screen } from '../../../utils'
import styles from './index.less'

const { formatTime } = time
// const wx_qr_prefix = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='

const Detail = ({ orderDetail }) => {
  const { data } = orderDetail
  const { wxUser, orderItemList, cnExpressInfo, gjExpressInfo, xnExpressInfo } = data
  const realSex = {
    0: '未知',
    1: '男',
    2: '女',
  }

  const realOrderStatus = screen.orderStateByNum

  const realBlackList = {
    0: '否',
    1: '是',
  }


  return (<div className="content-inner">
    <div className={styles.content}>
      {data.wxUser ? <div className={styles.item}>
        <div className={styles.title}>订单详情:</div>

        <div className={styles.titleItem}>收件人信息:</div>
        <span>收件人姓名: {data.receiverName ? data.receiverName : '暂无'}</span>
        <span>收件人公司: {data.receiverCompany ? data.receiverCompany : '暂无'}</span>
        <span>收件人国家: {data.receiverCountry ? data.receiverCountry : '暂无'}</span>
        <span>收件地址邮编: {data.receiverPostcode ? data.receiverPostcode : '暂无'}</span>
        <span>收件人电话: {data.receiverMobile ? data.receiverMobile : '暂无'}</span>
        <span></span>
        <span>收件人详细地址: {data.receiverAddress ? data.receiverAddress : '暂无'}</span>

        <div className={styles.titleItem}>发件人信息:</div>
        <span>发件人姓名: {data.senderName ? data.senderName : '暂无'}</span>
        <span>发件人省份: {data.senderProv ? data.senderProv : '暂无'}</span>
        <span>发件地址邮编: {data.senderPostcode ? data.senderPostcode : '暂无'}</span>
        <span>发件人国家: {data.senderCountry ? data.senderCountry : '暂无'}</span>
        <span>发件人城市: {data.senderCity ? data.senderCity : '暂无'}</span>
        <span>发件人电话: {data.senderMobile ? data.senderMobile : '暂无'}</span>
        <span>发件人公司: {data.senderCompany ? data.senderCompany : '暂无'}</span>
        <span>发件人县区: {data.senderCounty ? data.senderCounty : '暂无'}</span>
        <span>发件人地址: {data.senderAddress ? data.senderAddress : '暂无'}</span>

        <div className={styles.titleItem}>中转地址信息:</div>
        <span>中转地址名称: {data.transferName ? data.transferName : '暂无'}</span>
        <span>中转地址公司: {data.transferCompany ? data.transferCompany : '暂无'}</span>
        <span>中转地址电话: {data.transferMobile ? data.transferMobile : '暂无'}</span>
        <span>中转地址国家: {data.transferCountry ? data.transferCountry : '暂无'}</span>
        <span>中转地址省份: {data.transferProv ? data.transferProv : '暂无'}</span>
        <span>中转地址市级: {data.transferCity ? data.transferCity : '暂无'}</span>
        <span>中转地址县区: {data.transferCounty ? data.transferCounty : '暂无'}</span>
        <span>中转地址详细地址: {data.transferAddress ? data.transferAddress : '暂无'}</span>
        <span>中转地址详细邮编: {data.transferPostcode ? data.transferPostcode : '暂无'}</span>

        <div className={styles.titleItem}>订单基础信息:</div>
        <span>订单号: {data.orderNo ? data.orderNo : '暂无'}</span>
        <span>国内单号: {data.cnNo ? data.cnNo : '暂无'}</span>
        <span>国际单号: {data.intlNo ? data.intlNo : '暂无'}</span>
        <span>下单时间: {time.formatTime(data.createTime)}</span>
        <span>国内段快递公司: {data.kdCompanyCodeCn ? data.kdCompanyCodeCn : '暂无'}</span>
        <span>国际段快递公司: {data.kdCompanyCode ? data.kdCompanyCode : '暂无'}</span>
        <span>订单状态: {realOrderStatus[data.status]}</span>
        <span>预付总金额: {(data.totalFee ? data.totalFee : '暂无') / 100}元</span>
        <span>快件重量: {data.weight}kg</span>
        <span>是否保价: {data.insured === 1 ? '是' : '否'}</span>
        <span>保价金额: {data.insuredAmount === 0 ? '无' : `${data.insuredAmount}元`}</span>
        <span>保费: {data.insuredPrice === 0 ? '无' : `${data.insuredPrice}元`}</span>

        <div className={styles.title}>包裹详情:</div>
        <span>包裹重量: {data.weight ? `${data.weight}kg` : '包裹暂未称重'}</span>
        <span>中文名称: {orderItemList.nameCn ? orderItemList.nameCn : '暂无'}</span>
        <span>英文名称: {orderItemList.nameEn ? orderItemList.nameEn : '暂无'}</span>
        <span>包裹长度: {data.length ? `${data.length}cm` : '包裹暂未测量'}</span>
        <span>单价: {orderItemList.unitPrice ? orderItemList.unitPrice : '暂无'}</span>
        <span>数量: {orderItemList.quantity ? orderItemList.quantity : '暂无'}</span>
        <span>包裹宽度: {data.width ? `${data.width}cm` : '包裹暂未测量'}</span>
        <span>价值: {orderItemList.worth ? orderItemList.worth : '暂无'}</span>
        <span>海关编号: {orderItemList.hscode ? orderItemList.hscode : '暂无'}</span>
        <span>包裹高度: {data.height ? `${data.height}cm` : '包裹暂未测量'}</span>

        <div className={styles.title}>微信详情:</div>
        <span>用户昵称: {wxUser.nickName ? wxUser.nickName : '暂无'}</span>
        <span>手机号码: {wxUser.mobile ? wxUser.mobile : '暂无'}</span>
        <span>性别: {wxUser.sex ? realSex[wxUser.sex] : '暂无'}</span>
        <span>寄件总次数: {wxUser.packageCount ? wxUser.packageCount : '暂无'}</span>
        <span>关注时间: {time.formatTime(wxUser.subscribeTime)}</span>
        <span>证件号: {wxUser.idCard ? wxUser.idCard : '暂无'}</span>
        <span>消费总金额: {wxUser.totalAmount ? `${wxUser.totalAmount / 100}元` : '暂无'}</span>
        <span>黑名单: {wxUser.blacklist ? realBlackList[wxUser.blacklist] : '未知'}</span>
        <span>关注状态: {wxUser.subscribe ? wxUser.subscribe : '暂无'}</span>

        <div className={styles.title}>国内段快递信息:</div>
        {cnExpressInfo ? cnExpressInfo.map(item => (<div><span>{item.time}</span><span>{item.context}</span></div>)) : <span>暂无快递信息</span>}

        <div className={styles.title}>国际段快递信息:</div>
        {gjExpressInfo ? gjExpressInfo.map(item => (<div><span>{item.time}</span><span>{item.context}</span></div>)) : <span>暂无快递信息</span>}

        <div className={styles.title} style={{ display: xnExpressInfo ? 'block' : 'none' }}>孟加拉快递信息:</div>
        {xnExpressInfo ? xnExpressInfo.map(item => (<div><span>{formatTime(item.routeTime)}</span><span>{item.route}</span></div>)) : <span></span>}

      </div> : <h3>暂无订单详细信息</h3>}
    </div>
  </div>)
}

Detail.propTypes = {
  orderDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ orderDetail, loading }) => ({ orderDetail, loading: loading.models.orderDetail }))(Detail)
