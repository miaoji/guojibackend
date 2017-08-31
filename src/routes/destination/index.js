import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import ProvinceModal from './ProvinceModal'

const Destination = ({ location, dispatch, destination, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, provinceModalVisible, locationData } = destination
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

  const provinceModalProps = {
    item: currentItem,
    list: locationData,
    visible: provinceModalVisible,
    title: `编辑${currentItem.name}省份信息`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      console.log('data', data)
      dispatch({
        type: `destination/createProvince`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'destination/hideLocationModal',
        payload: {
          type: 'province'
        }
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
    onDeleteItem (id) {
      dispatch({
        type: 'destination/delete',
        payload: id,
      })
    },
    showModal (item, type) {
      dispatch({
        type: 'destination/queryLocation',
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
      {provinceModalVisible && <ProvinceModal {...provinceModalProps} />}
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
