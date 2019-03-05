/**   
 * api接口统一管理
 * login 登录
 * Inspection 巡检管理
 * MeterReading 抄表管理
 * Patrol 巡更管理
 * 详情请看接口文档
 */
import { get, post } from './http';
const login = p => post('Check', p);
const project = p => post('Project', Object.assign({ProjectID:localStorage.getItem('projectid')},p))
const system = p => post('System', p)
const Alarm = p => post('Alarm', p)
const Inspection = p => post('Inspection',Object.assign({ProjectID:localStorage.getItem('projectid')},p))
const Report = p => post('Report',p)
const FileUpLoad = p => post('FileUpLoad', Object.assign({ProjectID:localStorage.getItem('projectid')},p))
const Orders = p => post('Orders', Object.assign({ProjectID:localStorage.getItem('projectid')},p))
const MeterReading = p => post('MeterReading',Object.assign({ProjectID:localStorage.getItem('projectid')},p))
const Patrol = p => post('Patrol',Object.assign({ProjectID:localStorage.getItem('projectid')},p))
const Monitor = p => post('Monitor',Object.assign({ProjectID:localStorage.getItem('projectid')},p))
export{
    login,
    project,
    system,
    Alarm,
    Inspection,
    Report,
    FileUpLoad,
    Orders,
    MeterReading,
    Patrol,
    Monitor
}