import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const County = ({ location, dispatch, county, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType,
    // provinceModalVisible,
    // locationData
  } = county
  // const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    title: `${modalType === 'create' ? '创建县区信息' : '修改县区信息'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `county/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'county/hideModal',
      })
    },
  }

  // const provinceModalProps = {
  //   item: currentItem,
  //   list: locationData,
  //   visible: provinceModalVisible,
  //   title: `编辑${currentItem.name}省份信息`,
  //   wrapClassName: 'vertical-center-modal',
  //   onOk (data) {
  //     dispatch({
  //       type: 'county/createProvince',
  //       payload: data,
  //     })
  //   },
  //   onCancel () {
  //     dispatch({
  //       type: 'county/hideLocationModal',
  //       payload: {
  //         type: 'province',
  //       },
  //     })
  //   },
  // }

  const listProps = {
    loading: loading.effects['county/query'],
    list,
    pagination,
    location,
    onChange () {
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
        type: 'county/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'county/delete',
        payload: id,
      })
    },
    showModal (item, type) {
      dispatch({
        type: 'county/queryLocation',
        payload: {
          currentItem: item,
          type,
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
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/county',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/county',
      }))
    },
    onAdd () {
      dispatch({
        type: 'county/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
      {/* {provinceModalVisible && <ProvinceModal {...provinceModalProps} />} */}
    </div>
  )
}

County.propTypes = {
  county: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ county, loading }) => ({ county, loading }))(County)
