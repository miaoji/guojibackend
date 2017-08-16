import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import styles from './user.less'
import CountUp from 'react-countup'
import { color } from '../../../utils'
const countUpProps = {
  start: 0,
  duration: 2.75,
  useEasing: true,
  useGrouping: true,
  separator: ',',
}


function User ({ avatar, name, email, sales, sold }) {
  const handleSelfPage = () => {
    window.open('http://www.mijihome.cn/')
  }

  return (<div className={styles.user}>
    <div className={styles.header}>
      <div className={styles.headerinner}>
        <div className={styles.avatar} style={{ backgroundImage: `url(${avatar})` }} />
        <h5 className={styles.name}>{name}</h5>
        <p>{email}</p>
      </div>
    </div>
    <div className={styles.number}>
      <div className={styles.item}>
        <p>销售收益</p>
        <p style={{ color: color.green }}><CountUp
          end={sales}
          prefix="￥"
          {...countUpProps}
        /></p>
      </div>
      <div className={styles.item}>
        <p>项目销售</p>
        <p style={{ color: color.blue }}><CountUp
          end={sold}
          {...countUpProps}
        /></p>
      </div>
    </div>
    <div className={styles.footer}>
      <Button type="ghost" size="large" onClick={handleSelfPage}>个人主页</Button>
    </div>
  </div>)
}

User.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  sales: PropTypes.number,
  sold: PropTypes.number,
}

export default User
