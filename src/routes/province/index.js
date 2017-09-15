import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Province = ({ location, dispatch, province, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, provinceModalVisible, locationData } = province
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    title: `${modalType === 'create' ? '创建目的地信息' : '修改目的地信息'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `province/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'province/hideModal',
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
        type: `province/createProvince`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'province/hideLocationModal',
        payload: {
          type: 'province'
        }
      })
    },
  }

  const listProps = {
    loading: loading.effects['province/query'],
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
        type: 'province/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'province/delete',
        payload: id,
      })
    },
    showModal (item, type) {
      dispatch({
        type: 'province/queryLocation',
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
        pathname: '/province',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/province',
      }))
    },
    onAdd () {
      dispatch({
        type: 'province/showModal',
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

Province.propTypes = {
  province: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ province, loading }) => ({ province, loading }))(Province)
