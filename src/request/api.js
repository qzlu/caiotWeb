/**   
 * api接口统一管理
 * login 登录
 * 详情请看接口文档
 */
import { get, post } from './http';
const login = p => post('Check', p);
const project = p => post('Project', p)
const system = p => post('System', p)
const Alarm = p => post('Alarm', p)
const Inspection = p => post('Inspection',Object.assign({ProjectID:localStorage.getItem('projectid')},p))
const Report = p => post('Report',p)
const FileUpLoad = p => post('FileUpLoad', Object.assign({ProjectID:localStorage.getItem('projectid')},p))
const Orders = p => post('Orders', Object.assign({ProjectID:localStorage.getItem('projectid')},p))
const MeterReading = p => post('MeterReading',Object.assign({ProjectID:localStorage.getItem('projectid')},p))
export{
    login,
    project,
    system,
    Alarm,
    Inspection,
    Report,
    FileUpLoad,
    Orders,
    MeterReading
}