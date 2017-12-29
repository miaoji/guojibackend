import { request, config, pageParams } from '../utils'
const { spreaduser, grade, wxuser } = config.api

export async function query (params) {
    params = pageParams(params)
    return request({
        url: spreaduser.all,
        method: 'get',
        params
    })
}

export async function create (params) {
    console.log(111)
    return request({
        url: spreaduser.create,
        method: 'post',
        params
    })
}

export async function update (params) {
    return request({
        url: spreaduser.update,
        method: 'post',
        params
    })
}

export async function remove (params) {
    console.log('delete', params)
    return request({
        url: spreaduser.hide,
        method: 'delete',
        params
    })
}

export async function gradeInfo () {
    return request({
        url: grade.all,
        method: 'get',
        params: { page: 1, rows: 100000 }
    })
}

export async function wxuserInfo () {
    return request({
        url: wxuser.all,
        method: 'get',
        params: { page: 1, rows: 100000 }
    })
}