// export default adr.prototype = {
//   addAdr = params => http.post('api/address/add',params)
//   editAdr = params => http.post('api/address/edit',params)
//   getAdr = params => http.post('api/address/page',params)
//   delAdr = params => http.post('api/address/delete',params)
//   searchAdr = params => http.post('api/address/get',params)
// }
import http from './http'
export default class adr {
  addAdr = params => http.post('api/address/add', params)
  editAdr = params => http.post('api/address/edit', params)
  getAdr = params=> http.post('api/address/page', params)
  delAdr = params => http.post('api/address/delete', params)
  searchAdr = params => http.post('api/address/get', params)
}
