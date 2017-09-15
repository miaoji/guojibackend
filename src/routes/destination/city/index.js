import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Citys = ({ location, dispatch, citys, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, citysModalVisible, locationData } = citys
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    title: `${modalType === 'create' ? '创建目的地信息' : '修改目的地信息'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `citys/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'citys/hideModal',
      })
    },
  }

  const citysModalProps = {
    item: currentItem,
    list: locationData,
    visible: citysModalVisible,
    title: `编辑${currentItem.name}省份信息`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      console.log('data', data)
      dispatch({
        type: `citys/createcitys`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'citys/hideLocationModal',
        payload: {
          type: 'citys'
        }
      })
    },
  }

  const listProps = {
    loading: loading.effects['citys/query'],
    list,
    pagination,
    location,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
        },
      }))
    },
    onEditItem (item) {
      dispatch({
        type: 'citys/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'citys/delete',
        payload: id,
      })
    },
    showModal (item, type) {
      dispatch({
        type: 'citys/queryLocation',
        payload: {
          currentItem: item,
          type
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
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/citys',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/citys',
      }))
    },
    onAdd () {
      dispatch({
        type: 'citys/showModal',
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
      {citysModalVisible && <citysModal {...citysModalProps} />}
    </div>
  )
}

Citys.propTypes = {
  citys: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ citys, loading }) => ({ citys, loading }))(Citys)
