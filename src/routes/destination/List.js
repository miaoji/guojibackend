import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Table, Modal, Button, Icon, message } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
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
          }
        })
        break
      default:
        break
    }
  }

  return (
    <div>
      <ul className={styles.list}>
        {list.show?<span>{list.name}</span>:list.map(item => (<li key={item.id}>
          <Button title={item.country_cn} size="large">
            <Link to={`/province?countryCode=${item.country_code}`}><span>{item.country_cn} - {item.sort || 0}</span></Link>
            <DropOption onMenuClick={e => handleMenuClick(item, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
          </Button>
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
