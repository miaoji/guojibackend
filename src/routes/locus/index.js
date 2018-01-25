import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Locus = ({ location, dispatch, locus, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = locus
  const { pageSize } = pagination

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['boot/update'],
    title: `${modalType === 'create' ? '新增微信菜单配置' : '修改微信菜单配置'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `locus/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'locus/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['locus/query'],
    pagination,
    location,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'locus/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'locus/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/locus',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/locus',
      }))
    },
    onAdd () {
      dispatch({
        type: 'locus/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onSubmitWeChat () {
      dispatch({
        type: 'locus/setmenu',
      })
    },
    switchIsMotion () {
      dispatch({ type: 'locus/switchIsMotion' })
    },
  }

  // const handleDeleteItems = () => {
  //   dispatch({
  //     type: 'locus/multiDelete',
  //     payload: {
  //       ids: selectedRowKeys,
  //     },
  //   })
  // }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Locus.propTypes = {
  locus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ locus, loading }) => ({ locus, loading }))(Locus)
