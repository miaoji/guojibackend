import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Destination = ({ location, dispatch, destination, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = destination
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    title: `${modalType === 'create' ? '创建目的地信息' : '修改目的地信息'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `destination/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'destination/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['destination/query'],
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
    onEditItem (item) {
      dispatch({
        type: 'destination/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    addBoot (item) {
      dispatch({
        type: 'order/showBootModal',
        payload: {
          currentItem: item,
        },
      })
    }
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
        pathname: '/destination',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/destination',
      }))
    },
    onAdd () {
      dispatch({
        type: 'destination/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Destination.propTypes = {
  destination: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ destination, loading }) => ({ destination, loading }))(Destination)
