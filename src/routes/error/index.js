import React from 'react'
import { Icon } from 'antd'
import { Link } from 'dva/router'
import styles from './index.less'

const Error = () => <div className="content-inner">
  <div className={styles.error}>
    <Icon type="frown-o" />
    <h1>404 Not Found</h1>
    <Link to="/dashboard">
      点击返回首页
    </Link>
  </div>
</div>

export default Error
