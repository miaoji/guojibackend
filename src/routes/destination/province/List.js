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

  const clickSeeProvince = ( record ) => {
    window.open(`/province?userId=${record.id}`)
  }


  const columns = [
    {
      title: '国家',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '省份',
      key: 'province',
      render: (text, record) => {
        return <Button type="primary" onClick={e => showModal(record, 'province', e)}>编辑</Button>
      },
    },{
      title: '市级',
      key: 'city',
      render: (text) => {
        return <Button type="primary">编辑</Button>
      }
    },{
      title: '区县级',
      key: 'county',
      render: (text) => {
        return <Button type="primary">编辑</Button>
      }
    },{
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
      },
    },
  ]

  const getBodyWrapper = body => { return <AnimTableBody {...getBodyWrapperProps} body={body} /> }

  return (
    <div>
      <ul className={styles.list}>
        {list.map(item => (<li key={item.name}>
          <Button size="large" onClick={e => clickSeeProvince(item)}>
            <span>{item.name}</span>
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
