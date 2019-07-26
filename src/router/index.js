import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/home' 
/* import login from '@/components/user/login' */

/*
 1.实时监测:monitoring,
 2.预告警管理:foreshow,
 3.设备警管理:DeviceManagement
 4.能源管理:energy,
 5.任务警管理:TaskManagement,
 6.统计报表:Count,
 7.系统管理:SystemManagement
 */
//import UniversalConfigPage from '@/components/commonPage/index'//通用配置页面，固定的,所有配置的页面，都跳转在这个页面
//import ConfigPage_list from '@/components/commonPage/list'//通用配置页面，固定,所有配置的页面，都跳转在这个页面

//import monitoring from '@/components/monitoring' //实时监测
//import product from '@/components/monitoring/product' //实时监测详细
//import detail_info from '@/components/monitoring/detail_info' //实时监测详
//import detail_info_list from '@/components/monitoring/detail_info_list' //实时监测详细-详细页

//import searchdata from '@/components/home/test'     //实时监测-子菜单1
//import devicemoniter from '@/components/home/test'  //实时监测-子菜单2
//import KeyEquipment from '@/components/home/test'   //实时监测-子菜单3


/*----------*/
//import foreshow from '@/components/foreshow' //预告警管理
//import test from '@/components/foreshow/test'
//import now_count from '@/components/foreshow/now_count'//实时告警
//import foreshow_count from '@/components/foreshow/count'//告警统计
//import history_count from '@/components/foreshow/history_count'//历史告警

/*----------*/
//import DeviceManagement from '@/components/DeviceManagement' //设备警管理
//import EquipmentDeskAccount from '@/components/home/test'//设备警管理-子菜单1
//import EquipmentStatistics from '@/components/home/test'//设备警管理-子菜单2


/*----------*/
//import energy from '@/components/energy' //能源管理
//import energy_list from '@/components/energy/list' //能源管理
//import CalculationSettings from '@/components/home/test' // 计算设置-子菜单1
//import EnergyPlan from '@/components/home/test' //能源计划 -子菜单2
//import EnergyIndicators from '@/components/home/test' //能源指标-子菜单3
//import EnergyStatistics from '@/components/energy/list' //能源统计-子菜单4



/*----------*/
//import TaskManagement from '@/components/TaskManagement' //任务警管理
//import FixRecords from '@/components/home/test'//维修管理-子菜单


//import InspectionStandard from '@/components/TaskManagement/InspectionStandard' //巡检管理-巡检标准
//import InspectionRecords from '@/components/TaskManagement/InspectionRecords' //巡检管理-巡检记录  
//import InspectionPlan from '@/components/home/test' //巡检管理-巡检计划 

//import MaintenanceRecords from '@/components/home/test'//保养管理-保养记录
//import MaintenancePlan from '@/components/home/test'//保养管理-保养计划 
//import MaintenanceStandard from '@/components/home/test'//保养管理-保养标准 
/************ 抄表管理 *******************/
/*----------*/

//import Count from '@/components/Count' //统计报表
//import Count_list from '@/components/Count/list' //统计报表
// import DailyStatistics from '@/components/Count/list' //统计报表- 日常统计
// import AlarmStatistics2 from '@/components/Count/list' //告警统计（日常统计子菜单1）
// import EquipmentStatistics2 from '@/components/Count/list' //设备统计（日常统计子菜单2）
// import EnergyStatistics2 from '@/components/Count/list' //能源统计（日常统计子菜单3）
// import PersonalReports from '@/components/Count/list' //个人报表
/*----------*/

//import SystemManagement from '@/components/SystemManagement' //系统管理
//import DeviceChangeManagement from '@/components/home/test' // 
//import ProjectManagement from '@/components/home/test' // 
//import UserManagement from '@/components/SystemManagement/user'  //用户管理
//import ConfigurationManagement from '@/components/SystemManagement/ConfigurationManagement' //配置管理
//import role from '@/components/SystemManagement/role';//角色管理

/*----------*/
import agreement from '@/components/agreement' //安卓页面

import { router_children } from '@/router/index_children.js';//一级子路由模块加载

let routers_item = [
	{
		path: '/',
		name: 'login',
		component: () => import("@/components/user/login"),
		meta: {
			title: '千仞云平台'
		}
	},
	{
		path: '/agreement', //给安卓用的页面，不是pc项目
		name: 'agreement',
		component: agreement,
		meta: {
			title: '千仞云平台'
		}
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('@/components/home'),
		redirect: '/home/ProjectBrowse',//子路由设置默认页
		children: [
			{
				path: 'ProjectBrowse', //项目概览
				name: 'ProjectBrowse',
				component: () => import('@/components/ProjectOverview/index.vue'),
				redirect: '/home/ProjectBrowse/comprehensive',
				children:[
					{
						path: 'comprehensive',
						name: 'Comprehensive', //综合态势
						component: () => import('@/components/ProjectOverview/comprehensive.vue')
					},
				]
			},
			{
				path: 'monitoring',
				name: 'monitoring',
				component: () => import('@/components/monitoring'),
				redirect: '/home/monitoring',//子路由设置默认页
				children: [
					{
						path: '/',
						name: 'product',
						component: () => import('@/components/monitoring/product'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'detail_info/:id/:SingleType', //详情页
						name: 'detail_info',
						component: () => import('@/components/monitoring/detail_info'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'detail_info_list/:id/:PossionID/:getalldata/',//详情页-详细列表
						name: 'detail_info_list',
						component: () => import('@/components/monitoring/detail_info_list'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					/*-------实时监测-子菜单----*/
					{
						path: 'searchdata', //实时监测-数据查询
						name: 'searchdata',
						component: () => import('@/components/monitoring/searchdata.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'devicemoniter', //实时监测-子菜单2
						name: 'devicemoniter',
						component: () => import('@/components/home/test'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'KeyEquipment', //实时监测-重点监测
						name: 'KeyEquipment',
						component: () => import('@/components/monitoring/KeyEquipment.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					/*-------实时监测-子菜单----*/


				]

			},
			{
				path: 'foreshow',//预告警管理
				name: 'foreshow',
				component: () => import('@/components/foreshow'),
				redirect: '/home/foreshow',//子路由设置默认页

				children: [
					/*{ path: '/', //实时告警
					  name: 'test',
					  component: test,
					  meta: {
					    title: '千仞云平台',
					    requireAuth: true,  
				      }
					},*/

					{
						path: '/', //实时告警
						name: 'now_count',
						component: () => import('@/components/foreshow/now_count'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					},
					{
						path: 'history_count', //历史警统
						name: 'history_count',
						component: () => import('@/components/foreshow/history_count'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					},
					{
						path: 'foreshow_count', //预告警统计
						name: 'foreshow_count',
						component: () => import('@/components/foreshow/count'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					},
					{
						path: 'AlarmConfig', //告警配置
						name: 'AlarmConfig',
						component: () => import('@/components/alarmManagement/alarmConfig.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					}
				]


			},

			{
				path: 'UniversalConfigPage',   //通用配置页面,所有配置的页面，都跳转在这个页面
				name: 'UniversalConfigPage',
				component: () => import('@/components/commonPage/index'),
				redirect: '/home/ConfigPage_list/:guid',//子路由设置默认页
				meta: {
					title: '千仞云平台',
					requireAuth: true,
				},
				children: [
					{
						path: '/home/ConfigPage_list/:guid',
						name: 'ConfigPage_list',
						component: () => import('@/components/commonPage/list'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					},
				]
			},

			{
				path: 'DeviceManagement',//设备管理
				name: 'DeviceManagement',
				component: () => import('@/components/DeviceManagement'),
				redirect: '/home/DeviceManagement',//子路由设置默认页
				meta: {
					title: '千仞云平台',
					requireAuth: true,
				},
				children: [
					{
						path: '/',   //设备台账
						name: 'EquipmentDeskAccount',
						component: () => import('@/components/DeviceManagement/EquipmentDeskAccount.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'DeviceInfo/:deviceID',   //设备详情
						name: 'DeviceInfo',
						component: () => import('@/components/DeviceManagement/deviceInfo.vue'),
						redirect: 'DeviceInfo/:deviceID',
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
						children: [
							{
								path: '',
								name: 'basicInfo', //设备详情基本信息
								component: () => import('@/components/DeviceManagement/basicInfo.vue')
							},
							{
								path: 'breakingNews',
								name: 'breakingNews',//设备详情大事件
								component: () => import('@/components/DeviceManagement/breakingNews.vue')
							},
							{
								path: 'alarmRecord',
								name: 'alarmRecord', // 设备详情-告警记录
								component: () => import('@/components/DeviceManagement/alarmRecord.vue')
							},
							{
								path: 'fixRecord',
								name: 'fixRecord', // 设备详情-维修记录
								component: () => import('@/components/DeviceManagement/fixRecord.vue')
							},
							{
								path: 'deviceMaintenanceRecord',
								name: 'deviceMaintenanceRecord',// 设备详情-保养记录
								component: () => import('@/components/DeviceManagement/maintenanceRecord.vue'),
								meta: {
									title: '千仞云平台',
									requireAuth: true,
								},
							},
							{
								path: 'log',
								name: 'log',// 设备详情-启停日志
								component: () => import('@/components/DeviceManagement/log.vue'),
								meta: {
									title: '千仞云平台',
									requireAuth: true,
								},
							},
							{
								path: 'file',
								name: 'file',// 设备详情-启停日志
								component: () => import('@/components/DeviceManagement/file.vue'),
								meta: {
									title: '千仞云平台',
									requireAuth: true,
								},
							},
						]
					},
					{
						path: 'EquipmentStatistics',   //设备统计
						name: 'EquipmentStatistics',
						component: () => import('@/components/home/test'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},



				]


			},
			{
				path: 'energy',//能源警管理
				name: 'energy',
				component: () => import('@/components/energy'),
				redirect: '/home/energy',//子路由设置默认页
				meta: {
					title: '千仞云平台',
					requireAuth: true,
				},
				children: [
					{
						path: '/',
						name: 'energy_list',
						component: () => import('@/components/energy/list'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},


					{
						path: 'CalculationSettings',//计算设置
						name: 'CalculationSettings',
						component: () => import('@/components/energy/energyConfig.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'EnergyPlan',//"能源计划"
						name: 'EnergyPlan',
						component: () => import('@/components/energy/energyPlan.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'EnergyIndicators',//"能源指标"
						name: 'EnergyIndicators',
						component: () => import('@/components/home/test'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'EnergyStatistics',//能源统计"
						name: 'EnergyStatistics',
						component: () => import('@/components/energy/list'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					}


				]


			},

			{
				path: 'TaskManagement',//任务管理
				name: 'TaskManagement',
				component: () => import('@/components/TaskManagement'),
				redirect: '/home/TaskManagement',//子路由设置默认页
				meta: {
					title: '千仞云平台',
					requireAuth: true, // 判断该路由是否需要登录权限
				},
				children: [

					/* { path: '/',
						 name: 'FixManagement',// 维修管理
						 component: FixManagement,
						 meta: {
							 title: '千仞云平台',
							 requireAuth: true, 
						  },
					 },*/

					{
						path: '/',
						name: 'FixRecords',// 维修管理--维修记录第一个子菜单
						component: () => import('@/components/TaskManagement/FixRecords.vue'), //默认为第一个菜单 
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'InspectionStandard',
						name: 'InspectionStandard', // 巡检管理-巡检标准
						component: () => import('@/components/TaskManagement/InspectionStandard.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'Worklist',
						name: 'Worklist',
						component: () => import('@/components/TaskManagement/workList.vue'),// 工单管理
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'InspectionRoad',
						name: 'InspectionRoad',
						component: () => import('@/components/TaskManagement/InspectionRoad.vue'), //巡检路线
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'InspectionItem',
						name: 'InspectionItem',
						component: () => import('@/components/TaskManagement/InspectionItem.vue'), //巡检点管理
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'InspectionRecords',
						name: 'InspectionRecords', // 巡检管理-巡检记录
						component: () => import('@/components/TaskManagement/InspectionRecords.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'InspectionPlan',
						name: 'InspectionPlan', // 巡检管理-巡检计划
						component: () => import('@/components/TaskManagement/InspectionPlan.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},

					{
						path: 'MaintenanceRecords',
						name: 'MaintenanceRecords',// 保养管理-保养记录
						component: () => import('@/components/TaskManagement/Maintenance/MaintenanceRecords.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},

					{
						path: 'MaintenancePlan',
						name: 'MaintenancePlan',// 保养管理-保养计划
						component: () => import('@/components/TaskManagement/Maintenance/MaintenancePlan.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'MaintenanceStandard',
						name: 'MaintenanceStandard',// 保养管理-保养标准
						component: () => import('@/components/TaskManagement/Maintenance/MaintenanceStandard.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'Supplies',
						name: 'Supplies',// 耗材库
						component: () => import('@/components/TaskManagement/Supplies.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'MeterReadingPoint',
						name: 'MeterReadingPoint',
						component: () => import('@/components/TaskManagement/MeterReading/MeterReadingPoint.vue'), //抄表点管理
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					},
					{
						path: 'MeterReadingLine',
						name: 'MeterReadingLine',
						component: () => import('@/components/TaskManagement/MeterReading/MeterReadingLine.vue'), //抄表路线管理
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					},
					{
						path: 'MeterReadingPlan',
						name: 'MeterReadingPlan',
						component: () => import('@/components/TaskManagement/MeterReading/MeterReadingPlan.vue'), //抄表计划管理
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}

					},
					{
						path: 'MeterReadingRecords',
						name: 'MeterReadingRecords',// 抄表管理-抄表记录
						component: () => import('@/components/TaskManagement/MeterReading/MeterReadingRecords.vue'), //抄表计划管理
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'PatrolPoint',
						name: 'PatrolPoint',
						component: () => import('@/components/TaskManagement/Patrol/PatrolPoint.vue'), //巡更点管理
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					},
					{
						path: 'PatrolLine',
						name: 'PatrolLine',
						component: () => import('@/components/TaskManagement/Patrol/PatrolLine.vue'), //巡更路线管理
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					},
					{
						path: 'UPatrolPlan',
						name: 'UPatrolPlan',
						component: () => import('@/components/TaskManagement/Patrol/PatrolPlan.vue'), //巡更计划管理
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					},
					{
						path: 'PatrolPlanRecord',
						name: 'PatrolPlanRecord',
						component: () => import('@/components/TaskManagement/Patrol/PatrolRecord.vue'), //巡更记录管理
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					},
					{
						path: 'QueryPatrolPlanRecord',
						name: 'QueryPatrolPlanRecord',
						component: () => import('@/components/TaskManagement/Patrol/QueryPatrolPlanRecord.vue') //巡更查询
					},
					{
						path: 'MatterRecord',
						name: 'MatterRecord',
						component: () => import('@/components/TaskManagement/MatterRecord.vue'), //报事
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					},
					{
						path: 'AlarmRecord',
						name: 'AlarmRecord',
						component: () => import('@/components/TaskManagement/AlarmRecord.vue'), //告警记录
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					}
				]


			},




			{
				path: 'Count',//报表统计
				name: 'Count',
				component: () => import('@/components/energy'),
				redirect: '/home/Count',
				children: [
					{
						path: '/',
						name: '',
						component: () => import('@/components/Count/list'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					},
					{
						path: 'DailyStatistics',//日常统计
						name: 'DailyStatistics',
						component: () => import('@/components/Count/list'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					},
					{
						path: 'AlarmStatistics2',//告警统计(日常统计子菜单)
						name: 'AlarmStatistics2',
						component: () => import('@/components/Count/list'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					},
					{
						path: 'EquipmentStatistics2',//设备统计(日常统计子菜单)
						name: 'EquipmentStatistics2',
						component: () => import('@/components/Count/list'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					},
					{
						path: 'EnergyStatistics2',//能源统计(日常统计子菜单)
						name: 'EnergyStatistics2',
						component: () => import('@/components/Count/list'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					},
					{
						path: 'PersonalReports', //个人报表
						name: 'PersonalReports',
						component: () => import('@/components/Count/list'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						}
					}



				]

			},

			{
				path: 'SystemManagement',//系统管理
				name: 'SystemManagement',
				component: () => import('@/components/SystemManagement'),
				redirect: '/home/SystemManagement/DeviceChangeManagement',
				meta: {
					title: '千仞云平台',
					requireAuth: true,
				},
				children: [
					{
						path: 'DeviceChangeManagement',
						name: 'DeviceChangeManagement', // 系统管理-设备管理
						component: () => import('@/components/home/test'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},

					{
						path: '/',
						name: 'UserManagement', // 用户管理
						component: () => import('@/components/SystemManagement/user'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'role',
						name: 'role',//角色管理
						component: () => import('@/components/SystemManagement/role'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'ProjectManagement', //物联管理
						name: 'ProjectManagement',
						component: () => import('@/components/home/test'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},

					{
						path: 'ConfigurationManagement', //配置管理
						name: 'ConfigurationManagement',
						component: () => import('@/components/SystemManagement/ConfigurationManagement'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'ProjectInfo',
						name: 'ProjectInfo', //工程管理 -项目信息
						component: () => import('@/components/SystemManagement/projectManagement.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},

					},
					{
						path: 'AreaInfo',
						name: 'AreaInfo', //工程管理 -区域信息
						component: () => import('@/components/SystemManagement/areaInfo.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},

					},
					{
						path: 'GateWay',
						name: 'GateWay', //工程管理 -网关信息
						component: () => import('@/components/SystemManagement/gatewayInfo.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},

					},
					{
						path: 'Device',
						name: 'Device', //工程管理 -物联设备
						component: () => import('@/components/SystemManagement/iotDevice.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'Meter',
						name: 'Meter', //工程管理 -物联设备
						component: () => import('@/components/SystemManagement/meterInfo.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},

					},
					{
						path: 'DeviceMeter',
						name: 'DeviceMeter', //工程管理 -设备仪表
						component: () => import('@/components/SystemManagement/deviceMeter.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},

					},
					{
						path: 'AreaMaping',
						name: 'AreaMaping', //工程管理 -区域映射
						component: () => import('@/components/SystemManagement/areaMaping.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},

					},
					{
						path: 'DeviceMaping',
						name: 'DeviceMaping', //工程管理 -设备映射
						component: () => import('@/components/SystemManagement/deviceMaping.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},

					},
					{
						path: 'Block',
						name: 'Block', //标准配置 -集团信息
						component: () => import('@/components/SystemManagement/blockInfo.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},

					},
					{
						path: 'ProjectConfig',
						name: 'ProjectConfig', //工程管理 -项目流程
						component: () => import('@/components/SystemManagement/projectConfig.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},

					}, {
						path: 'SystemType', //标准配置 - 系统分类
						name: 'SystemType',
						component: () => import('@/components/SystemManagement/systemType.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'DeviceType', //标准配置 - 设备分类
						name: 'DeviceType',
						component: () => import('@/components/SystemManagement/deviceType.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'AlarmType', //标准配置 - 告警类型
						name: 'AlarmType',
						component: () => import('@/components/SystemManagement/alarmType.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'EnergyType', //标准配置 - 能源类型
						name: 'EnergyType',
						component: () => import('@/components/SystemManagement/energyType.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'DataItem', //标准配置 - 数据标识
						name: 'DataItem',
						component: () => import('@/components/SystemManagement/dataItem.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'MeterType', //标准配置 - 仪表类型
						name: 'MeterType',
						component: () => import('@/components/SystemManagement/meterType.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'MeterModel', //标准配置 - 仪表型号
						name: 'MeterModel',
						component: () => import('@/components/SystemManagement/meterModel.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'MeterProto', //标准配置 - 仪表协议
						name: 'MeterProto',
						component: () => import('@/components/SystemManagement/meterProto.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'Protocol', //标准配置 - 协议解析
						name: 'Protocol',
						component: () => import('@/components/SystemManagement/protocol.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'SystemLog', //系统管理- 操作日志
						name: 'SystemLog',
						component: () => import('@/components/SystemManagement/systemLog.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'Bluetooth', //系统管理- 蓝牙信息
						name: 'Bluetooth',
						component: () => import('@/components/SystemManagement/bluetooth.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'SignInfo', //系统管理- 签到信息
						name: 'SignInfo',
						component: () => import('@/components/SystemManagement/signInfo.vue'),
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
					{
						path: 'InspectionDeviceTypeDataItem', //标准配置（巡检标准）
						name: 'InspectionDeviceTypeDataItem',
						component: () => import('@/components/TaskManagement/InspectionStandard.vue')
					},
					{
						path: 'BasisMaintenanceStandards', //标准配置（保养标准）
						name: 'BasisMaintenanceStandards',
						component: () => import('@/components/TaskManagement/Maintenance/MaintenanceStandard.vue')
					}
				]


			},





		]
	},

]

/*for(let k=0;k<router_children.length;k++){
	routers_item[2].children.push(router_children[k])
}

console.log(routers_item)*/

Vue.use(Router)

export default new Router({
	// mode: 'history',
	routes: routers_item
})
