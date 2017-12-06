import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Sale = ({ location, dispatch, sale, loading }) => {
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
    selectKdCompany
  } = sale
  const { pageSize } = pagination

  // 订单修改modal
  const modalProps = {
    type: modalType,
    item: currentItem,
    maskClosable: false,
    visible: modalVisible,
    confirmLoading: loading.effects['sale/create'],
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
        type: 'sale/getParcelType',
        payload: data,
      })
    },
    getProductType (data) {
      dispatch({
        type: 'sale/getProductType',
        payload: data,
      })
    },
    getIntlPrice (data) {
      dispatch({
        type: 'sale/getIntlPrice',
        payload: data,
      })
    },
    setInsuredVisiable (data) {
      switch(data) {
        case 1:
          dispatch({
            type: 'sale/showInsured',
          })
          break
        case 0:
          dispatch({
            type: 'sale/hideInsured',
          })
          break
        default:
          break
      }
    },
    setPackageBin (data) {
      dispatch({
        type: 'sale/setPackageBin',
        payload: data
      })
    },
    onOk (data) {
      dispatch({
        type: 'sale/create',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'sale/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['sale/query'],
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
      dispatch({ type: 'sale/getCountry' })
      dispatch({ type: 'sale/getWeChatUser' })
      dispatch({ type: 'sale/getKdCompany'})
      dispatch({
        type: 'sale/showModal',
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

Sale.propTypes = {
  sale: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ sale, loading }) => ({ sale, loading }))(Sale)
