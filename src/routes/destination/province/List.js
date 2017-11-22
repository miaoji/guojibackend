import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Table, Modal, Button, Icon, message } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
// import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm


const List = ({ onDeleteItem, onEditItem, showModal, location, list, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        onEditItem(record)
        break
      case '2':
        confirm({
          title: '确定要删除这目的地吗?',
          onOk () {
            onDeleteItem(record.id)
          },
        })
        break
      default:
        break
    }
  }

  const clickSeeProvince = (record) => {
//  window.open(`/city?provinceid=${record.id}`)
  }
  return (
    <div>
      <ul className={styles.list}>
        {list.show ? <li>{list.name}</li> : list.map(item => (<li key={item.id}>
          <div title={item.province} size="large" onClick={e => clickSeeProvince(item)}>
            <Link to={`/city?provinceCode=${item.province_code}`}>
                <span>{item.province}</span>
            </Link>
            <DropOption onMenuClick={e => handleMenuClick(item, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
          </div>
        </li>))}
      </ul>
    </div>
  )
}


List.propTypes = {
  list: PropTypes.object,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  showModal: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
