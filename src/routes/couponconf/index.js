import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Couponconf = ({ location, dispatch, couponconf, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = couponconf
  const { pageSize } = pagination

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['boot/update'],
    title: `${modalType === 'create' ? '创建优惠券' : '修改优惠券'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `couponconf/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'couponconf/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['couponconf/query'],
    pagination,
    location,
    onChange(page) {
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
    onEnable(item) {
      dispatch({
        type: 'couponconf/showModal',
        payload: {
          modalType: 'enable',
          currentItem: item,
        },
      })
    },
    onDeleteItem(id) {
      dispatch({
        type: 'couponconf/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'couponconf/showModal',
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
    onCouponToWxUser() {
      dispatch({
        type: 'couponconf/showModal',
        payload: {
          modalType: 'couponToWxUser',
          currentItem: {},
        },
      })
    },
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/couponconf',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/couponconf',
      }))
    },
    onAdd() {
      dispatch({
        type: 'couponconf/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion() {
      dispatch({ type: 'couponconf/switchIsMotion' })
    },
  }

  // const handleDeleteItems = () => {
  //   dispatch({
  //     type: 'couponconf/multiDelete',
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

Couponconf.propTypes = {
  couponconf: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ couponconf, loading }) => ({ couponconf, loading }))(Couponconf)
