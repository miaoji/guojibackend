import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const City = ({ location, dispatch, city, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, provinceModalVisible, locationData } = city
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    title: `${modalType === 'create' ? '创建目的地信息' : '修改目的地信息'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `city/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'city/hideModal',
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
        type: `city/createProvince`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'city/hideLocationModal',
        payload: {
          type: 'province'
        }
      })
    },
  }

  const listProps = {
    loading: loading.effects['city/query'],
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
        type: 'city/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'city/delete',
        payload: id,
      })
    },
    showModal (item, type) {
      dispatch({
        type: 'city/queryLocation',
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
        pathname: '/city',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/city',
      }))
    },
    onAdd () {
      dispatch({
        type: 'city/showModal',
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

City.propTypes = {
  city: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ city, loading }) => ({ city, loading }))(City)
