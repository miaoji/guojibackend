import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { NumberCard, Quote, User } from './components'
import styles from './index.less'
import { color } from '../../utils'
import SimpleChartComponent from './components/Echart/SimpleChartComponent'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

function Dashboard ({ dashboard }) {
  const { quote, quotess, numbers, user } = dashboard
  const numberCards = numbers.map((item, key) => <Col key={key} lg={8} md={12}>
    <NumberCard {...item} />
  </Col>)

  return (
    <Row gutter={24}>
      {numberCards}
      <Col lg={24} md={24}>
        <Card>
          <SimpleChartComponent />
        </Card>
      </Col>
      {/* 首页中心提示信息 */}
      <Col lg={18} md={24} style={{ display: 'none' }}>
        <Card bordered={false} bodyStyle={{ ...bodyStyle.bodyStyle, padding: 0 }}>
          <User {...user} />
        </Card>
      </Col>
      {/* 首页中心提示信息 */}
      <Col lg={6} md={24} style={{ display: 'none' }}>
        <Row gutter={24}>
          <Col lg={24} md={12}>
            <Card bordered={false} className={styles.quote} bodyStyle={{
              padding: 0,
              height: 204,
              background: color.blue,
            }}>
              <Quote {...quote} />
            </Card>
          </Col>
          <Col lg={24} md={12}>
            <Card bordered={false} className={styles.quote} bodyStyle={{
              padding: 0,
              height: 204,
              background: color.red,
            }}>
              <Quote {...quotess} />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
