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
const project = p => post('Project', p)
const system = p => post('System', p)
const Alarm = p => post('Alarm', p)
const Inspection = p => post('Inspection', p)
const Report = p => post('Report',p)
const FileUpLoad = p => post('FileUpLoad', p)
const Orders = p => post('Orders', p)
const MeterReading = p => post('MeterReading', p)
const Patrol = p => post('Patrol', p)
const Monitor = p => post('Monitor',p)
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