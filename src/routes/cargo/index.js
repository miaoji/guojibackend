import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Cargo = ({ location, dispatch, cargo, loading }) => {
  const {
    list,
    pagination,
    currentItem,
    modalVisible,
    modalType,
    isMotion,

    selectNation,

    selectParcelType,
    selectProductType,
    parcelDis,
    productDis,

    selectWeChatUser,
    intlPrice,
    insuredVisiable,
    packageBin,
    selectKdCompany,
  } = cargo
  // const { pageSize } = pagination

  // 订单修改modal
  const modalProps = {
    type: modalType,
    item: currentItem,
    maskClosable: false,
    visible: modalVisible,
    confirmLoading: loading.effects['cargo/create'],
    title: '创建订单',
    wrapClassName: 'vertical-center-modal',
    selectNation,

    selectParcelType,
    selectProductType,
    parcelDis,
    productDis,

    selectWeChatUser,
    intlPrice,
    insuredVisiable,
    packageBin,
    selectKdCompany,
    getParcelType (data) {
      dispatch({
        type: 'cargo/getParcelType',
        payload: data,
      })
    },
    getProductType (data) {
      dispatch({
        type: 'cargo/getProductType',
        payload: data,
      })
    },
    getIntlPrice (data) {
      dispatch({
        type: 'cargo/getIntlPrice',
        payload: data,
      })
    },
    setInsuredVisiable (data) {
      switch (data) {
        case 1:
          dispatch({
            type: 'cargo/showInsured',
          })
          break
        case 0:
          dispatch({
            type: 'cargo/hideInsured',
          })
          break
        default:
          break
      }
    },
    setPackageBin (data) {
      dispatch({
        type: 'cargo/setPackageBin',
        payload: data,
      })
    },
    onOk (data) {
      dispatch({
        type: 'cargo/create',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'cargo/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['cargo/query'],
    pagination,
    location,
    isMotion,
    onChange (page, filter) {
      const value = {
        status: filter.STATUS ? filter.STATUS[0] : undefined,
      }
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          ...value,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
  }

  const filterProps = {
    isMotion,
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
    onAdd () {
      dispatch({ type: 'cargo/getCountry' })
      dispatch({ type: 'cargo/getWeChatUser' })
      dispatch({ type: 'cargo/getKdCompany' })
      dispatch({
        type: 'cargo/showModal',
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
    </div>
  )
}

Cargo.propTypes = {
  cargo: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ cargo, loading }) => ({ cargo, loading }))(Cargo)
