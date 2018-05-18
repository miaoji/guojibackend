import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { notification } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import BootModal from './bootModal'
import AddModal from './addModal'
import StateModal from './stateModal'
import LocusModal from './locusModal'

const Order = ({ location, dispatch, order, loading }) => {
  const {
    list,
    pagination,
    currentItem,
    addModalVisible,
    stateModalVisible,
    modalVisible,
    bootModalVisible,
    modalType,
    isMotion,
    // selectedRowKeys,
    selectKdCompany,
    selectNation,
    selectProvince,
    selectCity,
    selectCounty,
    provinceDis,
    cityDis,
    districtDis,

    selectParcelType,
    selectProductType,
    parcelDis,
    productDis,

    selectWeChatUser,
    intlPrice,
    insuredVisiable,
    locusModalVisible,
  } = order
  // const { pageSize } = pagination
  let addTitle = ''
  if (modalType === 'create') {
    addTitle = '创建订单'
  } else if (modalType === 'bengal') {
    addTitle = '创建孟加拉订单'
  } else {
    addTitle = '修改订单'
  }
  // 订单创建的modal
  const addModelProps = {
    type: modalType,
    item: currentItem,
    maskClosable: false,
    visible: addModalVisible,
    confirmLoading: loading.effects['order/create'],
    title: addTitle,
    wrapClassName: 'vertical-center-modal',
    selectNation,
    selectProvince,
    selectCity,
    selectCounty,
    provinceDis,
    cityDis,
    districtDis,

    selectParcelType,
    selectProductType,
    parcelDis,
    productDis,

    selectWeChatUser,
    intlPrice,
    insuredVisiable,
    getCountry() {
      dispatch({
        type: 'order/getCountry',
      })
    },
    getProvince(data) {
      dispatch({
        type: 'order/getProvince',
        payload: data,
      })
    },
    getCity(data) {
      dispatch({
        type: 'order/getCity',
        payload: data,
      })
    },
    getCounty(data) {
      dispatch({
        type: 'order/getCounty',
        payload: data,
      })
    },
    getParcelType(data) {
      dispatch({
        type: 'order/getParcelType',
        payload: data,
      })
    },
    getProductType(data) {
      dispatch({
        type: 'order/getProductType',
        payload: data,
      })
    },
    getIntlPrice(data) {
      dispatch({
        type: 'order/getIntlPrice',
        payload: data,
      })
    },
    setInsuredVisiable(data) {
      if (data === 0) {
        dispatch({
          type: 'order/showInsured',
        })
      } else if (data === 1) {
        dispatch({
          type: 'order/hideInsured',
        })
      } else {
        return
      }
    },
    onOk(data) {
      dispatch({
        type: `order/${modalType === 'update' ? 'update' : 'create'}order`,
        payload: { ...data, modalType }
      })
    },
    onCancel() {
      dispatch({
        type: 'order/hideAddModal',
      })
    },
  }

  // 发往国外modal
  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: true,
    confirmLoading: loading.effects['order/update'],
    title: '添加国际段快递信息',
    wrapClassName: 'vertical-center-modal',
    selectKdCompany,
    onOk(data) {
      dispatch({
        type: 'order/update',
        payload: data,
      })
    },
    getKdCompany() {
      dispatch({
        type: 'order/getKdCompany',
      })
    },
    onCancel() {
      dispatch({
        type: 'order/hideModal',
      })
    },
  }

  // 补价modal
  const bootModalProps = {
    type: modalType,
    item: currentItem,
    visible: bootModalVisible,
    confirmLoading: loading.effects['order/update'],
    title: '提交补价',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: 'order/addBoot',
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'order/hideBootModal',
      })
    },
  }

  // 改状态modal
  const stateModalProps = {
    type: modalType,
    item: currentItem,
    visible: stateModalVisible,
    confirmLoading: loading.effects['order/update'],
    title: '修改状态',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: 'order/updateState',
        payload: data
      })
    },
    onCancel() {
      dispatch({
        type: 'order/hideStateModal'
      })
    }
  }

  // 改状态modal
  const locusModalProps = {
    type: modalType,
    item: currentItem,
    visible: locusModalVisible,
    confirmLoading: loading.effects['order/update'],
    title: '单号关联',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: 'order/bindOrderNo',
        payload: data
      })
    },
    onCancel() {
      dispatch({
        type: 'order/hideLocusModal'
      })
    }
  }

  const listProps = {
    filter: {
      ...location.query
    },
    dataSource: list,
    loading: loading.effects['order/query'],
    pagination,
    location,
    isMotion,
    onBindOrderNo(item) {
      dispatch({
        type: 'order/showLocusModal',
        payload: {
          currentItem: item,
        }
      })
    },
    onChange(page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize
        }
      }))
    },
    onMarkItem(id) {
      dispatch({
        type: 'order/markBlackList',
        payload: id,
      })
    },
    onDeleteItem(id) {
      dispatch({
        type: 'order/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'order/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        }
      })
      dispatch({
        type: 'order/getKdCompany',
      })
    },
    addBoot(item) {
      dispatch({
        type: 'order/showBootModal',
        payload: {
          currentItem: item,
        }
      })
    },
    showLocusModal(item) {
      dispatch(routerRedux.push({
        pathname: '/locus',
        query: {
          orderId: item.ID
        }
      }))
    },
    showStateModal(item) {
      dispatch({
        type: 'order/showStateModal',
        payload: {
          currentItem: item,
        }
      })
    },
    onCreateCtorder(item) {
      dispatch({
        type: 'order/createChinaOrder',
        payload: {
          id: item.ID,
          orderNo: item.ORDER_NO,
        }
      })
    },
    filterStatus(value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
        }
      }))
    },
    updateOrderInfo(item) {
      if (item.STATUS > 2) {
        notification.warning({
          message: '订单修改限制！',
          description: '仅允许修改未到达中转站的订单'
        })
        return
      }
      dispatch({ type: 'order/getCountry' })
      dispatch({ type: 'order/getProvince' })
      dispatch({ type: 'order/getWeChatUser' })
      if (item.INSURED === 1) {
        dispatch({ type: 'order/hideInsured' })
      }
      dispatch({
        type: 'order/showAddModal',
        payload: {
          modalType: 'update',
          currentItem: item
        }
      })
    }
  }

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
        },
      }))
    },
    onAdd() {
      dispatch({ type: 'order/getCountry' })
      dispatch({ type: 'order/getProvince' })
      dispatch({ type: 'order/getWeChatUser' })
      dispatch({
        type: 'order/showAddModal',
        payload: {
          modalType: 'create',
          currentItem: {}
        },
      })
    },
    onBengalAdd() {
      dispatch({ type: 'order/getCountry' })
      dispatch({ type: 'order/getProvince' })
      dispatch({ type: 'order/getWeChatUser' })
      dispatch({
        type: 'order/showAddModal',
        payload: {
          modalType: 'bengal',
          currentItem: {}
        },
      })
    },
    switchIsMotion() {
      dispatch({ type: 'order/switchIsMotion' })
    },
  }

  // const handleDeleteItems = () => {
  //   dispatch({
  //     type: 'order/multiDelete',
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
      {bootModalVisible && <BootModal {...bootModalProps} />}
      {stateModalVisible && <StateModal {...stateModalProps} />}
      {addModalVisible && <AddModal {...addModelProps} />}
      {locusModalVisible && <LocusModal {...locusModalProps} />}
    </div>
  )
}

Order.propTypes = {
  order: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ order, loading }) => ({ order, loading }))(Order)
