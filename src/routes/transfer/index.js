import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Transfer = ({ location, dispatch, transfer, loading }) => {
  const { 
    list, 
    pagination, 
    currentItem, 
    modalVisible, 
    modalType, 
    isMotion, 
    selectedRowKeys, 
    selectNation, 
    selectProvince, 
    selectCity, 
    selectCounty,
    provinceDis,
    cityDis,
    districtDis,
  } = transfer
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['transfer/update'],
    title: `${modalType === 'create' ? '新增中转地址' : '修改中转地址'}`,
    wrapClassName: 'vertical-center-modal',
    selectNation: selectNation,
    selectProvince: selectProvince,
    selectCity: selectCity,
    selectCounty: selectCounty,
    provinceDis: provinceDis,
    cityDis: cityDis,
    districtDis: districtDis,

    onOk (data) {
      dispatch({
        type: `transfer/${modalType}`,
        payload: data,
      })
    },
    getCountry(data){
      dispatch({
        type:`transfer/getCountry`
      })
    },
    getProvince(data){
      dispatch({
        type:`transfer/getProvince`,
        payload:data
      })
    },
    getCity(data){
      console.log('data',data)
      dispatch({
        type:`transfer/getCity`,
        payload:data
      })
    },
    getCounty(data){
      console.log('data',data)
      dispatch({
        type:`transfer/getCounty`,
        payload:data
      })
    },
    onCancel () {
      dispatch({
        type: 'transfer/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['transfer/query'],
    pagination,
    location,
    isMotion,
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
    onMarkItem (id) {
      dispatch({
        type: 'transfer/markBlackList',
        payload: id
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'transfer/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'transfer/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
      dispatch({
        type: 'transfer/getCountry'
      })
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
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/transfer',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/transfer',
      }))
    },
    onAdd () {
      dispatch({
        type: 'transfer/showModal',
        payload: {
          modalType: 'create',
        },
      })
      dispatch({
        type: 'transfer/getCountry'
      })
    },
    switchIsMotion () {
      dispatch({ type: 'transfer/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'transfer/multiDelete',
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
    </div>
  )
}

Transfer.propTypes = {
  transfer: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ transfer, loading }) => ({ transfer, loading }))(Transfer)
