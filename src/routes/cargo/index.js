import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import BootModal from './bootModal'
import AddModal from './addModal'
import StateModal from './stateModal'

const Cargo = ({ location, dispatch, cargo, loading }) => {
  const { list, pagination, currentItem, addModalVisible, stateModalVisible, modalVisible, bootModalVisible, modalType, isMotion, selectedRowKeys, selectKdCompany, } = cargo
  const { pageSize } = pagination

  // 订单创建的modal
  const addModelProps = {
    type: modalType,
    item: currentItem,
    visible: addModalVisible,
    confirmLoading: loading.effects['cargo/update'],
    title: '创建订单',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `cargo/addcargo`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'cargo/hideAddModal',
      })
    },
  }

  // 订单修改modal
  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: true,
    confirmLoading: loading.effects['cargo/update'],
    title: `${modalType === 'create' ? '创建订单' : '修改订单'}`,
    wrapClassName: 'vertical-center-modal',
    selectKdCompany: selectKdCompany,
    onOk (data) {
      dispatch({
        type: `cargo/${modalType}`,
        payload: data,
      })
    },
    getKdCompany () {
      dispatch({
        type: `cargo/getKdCompany`
      })
    },
    onCancel () {
      dispatch({
        type: 'cargo/hideModal',
      })
    },
  }

  // 补价modal
  const bootModalProps = {
    type: modalType,
    item: currentItem,
    visible: bootModalVisible,
    confirmLoading: loading.effects['cargo/update'],
    title: '提交补价',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `cargo/addBoot`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'cargo/hideBootModal',
      })
    },
  }

  // 改状态modal
  const stateModalProps = {
    type: modalType,
    item: currentItem,
    visible: stateModalVisible,
    confirmLoading: loading.effects['cargo/update'],
    title: '修改状态',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `cargo/updateState`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'cargo/hideStateModal',
      })
    },
  }

  const listProps = {
    filter: {
      ...location.query,
    },
    dataSource: list,
    loading: loading.effects['cargo/query'],
    pagination,
    location,
    isMotion,
    onChange (page,filter) {
      const value = {
        status:filter.STATUS?filter.STATUS[0]:undefined
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
    onMarkItem (id) {
      dispatch({
        type: 'cargo/markBlackList',
        payload: id
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'cargo/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'cargo/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    addBoot (item) {
      dispatch({
        type: 'cargo/showBootModal',
        payload: {
          currentItem: item,
        },
      })
    },
    showStateModal (item) {
      dispatch({
        type: 'cargo/showStateModal',
        payload: {
          currentItem: item
        }
      })
    },
    onCreateCtcargo (item) {
      dispatch({
        type: 'cargo/createChinacargo',
        payload: {
          id: item.ID,
          cargoNo: item.cargo_NO
        },
      })
    },
    filterStatus (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
        },
      }))
    }
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
      dispatch({
        type: 'cargo/showAddModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'cargo/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'cargo/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      {
         selectedRowKeys.length > 0 &&
           <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
             <Col>
               {`选中 ${selectedRowKeys.length} 个微信用户 `}
               <Popconfirm title={'确定将这些用户打入黑名单吗?'} placement="left" onConfirm={handleDeleteItems}>
                 <Button type="primary" size="large" style={{ marginLeft: 8 }}>标记黑名单</Button>
               </Popconfirm>
             </Col>
           </Row>
      }
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
      {bootModalVisible && <BootModal {...bootModalProps} />}
      {stateModalVisible && <StateModal {...stateModalProps}/>}
      {addModalVisible && <AddModal {...addModelProps}/>}
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
