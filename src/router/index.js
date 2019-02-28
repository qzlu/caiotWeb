import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home' 
import login from '@/components/user/login'

   /*
	1.实时监测:monitoring,
	2.预告警管理:foreshow,
	3.设备警管理:DeviceManagement
	4.能源管理:energy,
	5.任务警管理:TaskManagement,
	6.统计报表:Count,
	7.系统管理:SystemManagement
    */
import UniversalConfigPage from '@/components/commonPage/index'//通用配置页面，固定的,所有配置的页面，都跳转在这个页面
import ConfigPage_list from '@/components/commonPage/list'//通用配置页面，固定,所有配置的页面，都跳转在这个页面

import monitoring from '@/components/monitoring' //实时监测
import product from '@/components/monitoring/product' //实时监测详细
import detail_info from '@/components/monitoring/detail_info' //实时监测详
import detail_info_list from '@/components/monitoring/detail_info_list' //实时监测详细-详细页
                             
import searchdata from '@/components/home/test'     //实时监测-子菜单1
import devicemoniter from '@/components/home/test'  //实时监测-子菜单2
import KeyEquipment from '@/components/home/test'   //实时监测-子菜单3


/*----------*/
import foreshow from '@/components/foreshow' //预告警管理
import test from '@/components/foreshow/test'
import now_count from '@/components/foreshow/now_count'//实时告警
import foreshow_count from '@/components/foreshow/count'//告警统计
import history_count from '@/components/foreshow/history_count'//历史告警

/*----------*/
import DeviceManagement from '@/components/DeviceManagement' //设备警管理
import EquipmentDeskAccount from '@/components/home/test'//设备警管理-子菜单1
import EquipmentStatistics from '@/components/home/test'//设备警管理-子菜单2


/*----------*/
import energy from '@/components/energy' //能源管理
import energy_list from '@/components/energy/list' //能源管理
import CalculationSettings from '@/components/home/test' // 计算设置-子菜单1
import EnergyPlan from '@/components/home/test' //能源计划 -子菜单2
import EnergyIndicators from '@/components/home/test' //能源指标-子菜单3
import EnergyStatistics from '@/components/energy/list' //能源统计-子菜单4



/*----------*/
import TaskManagement from '@/components/TaskManagement' //任务警管理
import FixRecords from '@/components/home/test'//维修管理-子菜单


import InspectionStandard from '@/components/TaskManagement/InspectionStandard' //巡检管理-巡检标准
import InspectionRecords from '@/components/TaskManagement/InspectionRecords' //巡检管理-巡检记录  
import InspectionPlan from '@/components/home/test' //巡检管理-巡检计划 

import MaintenanceRecords from '@/components/home/test'//保养管理-保养记录
import MaintenancePlan from '@/components/home/test'//保养管理-保养计划 
import MaintenanceStandard from '@/components/home/test'//保养管理-保养标准 
/************ 抄表管理 *******************/
/*----------*/

import Count from '@/components/Count' //统计报表
import Count_list from '@/components/Count/list' //统计报表
import DailyStatistics from '@/components/Count/list' //统计报表- 日常统计
  import AlarmStatistics2 from '@/components/Count/list' //告警统计（日常统计子菜单1）
  import EquipmentStatistics2 from '@/components/Count/list' //设备统计（日常统计子菜单2）
  import EnergyStatistics2 from '@/components/Count/list' //能源统计（日常统计子菜单3）
import PersonalReports from '@/components/Count/list' //个人报表
/*----------*/

import SystemManagement from '@/components/SystemManagement' //系统管理
import DeviceChangeManagement from '@/components/home/test' // 
import ProjectManagement from '@/components/home/test' // 
import UserManagement from '@/components/SystemManagement/user'  //用户管理
import ConfigurationManagement from '@/components/SystemManagement/ConfigurationManagement' //配置管理
import role from '@/components/SystemManagement/role';//角色管理

/*----------*/
import agreement from '@/components/agreement' //安卓页面

import {router_children} from '@/router/index_children.js';//一级子路由模块加载

let routers_item=[  
		{
			path: '/',
			name: 'login',
			component: login,
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
			component: home,
			redirect: '/home/monitoring',//子路由设置默认页
			children: [
			{ path: 'monitoring',
				name: 'monitoring',
				component: monitoring,
				redirect: '/home/monitoring',//子路由设置默认页
				children: [
					 { path: '/',
					 	 name: 'product',
					 	 component: product,
					 	meta: {
							title: '千仞云平台',
							requireAuth: true,  
						},
					 },
					 { path: 'detail_info/:id/:SingleType', //详情页
					 	name: 'detail_info',
					 	component: detail_info,
					 	meta: {
							title: '千仞云平台',
							requireAuth: true,  
						},
					},
					{ path: 'detail_info_list/:id/:PossionID/:getalldata/',//详情页-详细列表
					 	name: 'detail_info_list',
					 	component: detail_info_list,
					 	meta: {
							title: '千仞云平台',
							requireAuth: true,  
						},
					},
				/*-------实时监测-子菜单----*/	
					{ path: 'searchdata', //实时监测-子菜单1
					 	name: 'searchdata',
					 	component: searchdata,
					 	meta: {
							title: '千仞云平台',
							requireAuth: true, 
						},
					},
					{ path: 'devicemoniter', //实时监测-子菜单2
					 	name: 'devicemoniter',
					 	component: devicemoniter,
					 	meta: {
							title: '千仞云平台',
							requireAuth: true, 
						},
					},
					{ path: 'KeyEquipment', //实时监测-子菜单3
					 	name: 'KeyEquipment',
					 	component: KeyEquipment,
					 	meta: {
							title: '千仞云平台',
							requireAuth: true,
						},
					},
				/*-------实时监测-子菜单----*/	
					
					
				]
				
			},
			{ path: 'foreshow',//预告警管理
				name: 'foreshow',
				component: foreshow,
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
					
					{ path: '/', //实时告警
					  name: 'now_count',
					  component: now_count,
					  meta: {
					    title: '千仞云平台',
					    requireAuth: true,  
				         }
				    },
					{ path: 'history_count', //历史警统
					  name: 'history_count',
					  component: history_count,
					  meta: {
					    title: '千仞云平台',
					    requireAuth: true, 
				      }
					},
					{ path: 'foreshow_count', //预告警统计
					  name: 'foreshow_count',
					  component: foreshow_count,
					  meta: {
					    title: '千仞云平台',
					    requireAuth: true, 
				      }
					}
				  ]
				
				
			},
			
			{ path: 'UniversalConfigPage',   //通用配置页面,所有配置的页面，都跳转在这个页面
				name: 'UniversalConfigPage',
				component: UniversalConfigPage, 
				redirect: '/home/ConfigPage_list/:guid',//子路由设置默认页
				meta: {
				 title: '千仞云平台',
				 requireAuth: true,  
				 },
				 children: [
					{ path: '/home/ConfigPage_list/:guid', //实时告警
					  name: 'ConfigPage_list',
					  component: ConfigPage_list,
					  meta: {
					    title: '千仞云平台',
					    requireAuth: true,  
				      }
					},
				]
			},
			
			{   path: 'DeviceManagement',//设备管理
				name: 'DeviceManagement',
				component: DeviceManagement,
				redirect: '/home/DeviceManagement',//子路由设置默认页
				meta: {
					title: '千仞云平台',
					requireAuth: true, 
				},
				children: [
					{ path: '/',   //设备台账
						name: 'EquipmentDeskAccount',
						component: EquipmentDeskAccount,  
						meta: {
							title: '千仞云平台',
							requireAuth: true,  
						 },
					},
					{ path: 'EquipmentStatistics',   //设备统计
						name: 'EquipmentStatistics',
						component: EquipmentStatistics,  
						meta: {
							title: '千仞云平台',
							requireAuth: true,  
						 },
					},
					
					
		
					]
				
				
			},
			
			
			
			{ path: 'energy',//能源警管理
				name: 'energy',
				component: energy,
				redirect: '/home/energy',//子路由设置默认页
				meta: {
					title: '千仞云平台',
					requireAuth: true,  
				},
				children: [
					{ path: '/',
					name: 'energy_list',
					component: energy_list,
					meta: {
						title: '千仞云平台',
						requireAuth: true,  
					 },
					},

					
					{ path: 'CalculationSettings',//计算设置
				  	  name: 'CalculationSettings',
					  component: CalculationSettings,
					  meta: {
						title: '千仞云平台',
						requireAuth: true, 
					  },
					},
					{ path: 'EnergyPlan',//"能源计划"
				  	  name: 'EnergyPlan',
					  component: EnergyPlan,
					  meta: {
						title: '千仞云平台',
						requireAuth: true, 
					  },
					},
					{ path: 'EnergyIndicators',//"能源指标"
				  	  name: 'EnergyIndicators',
					  component: EnergyIndicators,
					  meta: {
						title: '千仞云平台',
						requireAuth: true, 
					  },
					},
					{ path: 'EnergyStatistics',//能源统计"
				  	  name: 'EnergyStatistics',
					  component: EnergyStatistics,
					  meta: {
						title: '千仞云平台',
						requireAuth: true, 
					  },
					}
		
					
					]
				
				
			},
			
			{   path: 'TaskManagement',//任务管理
				name: 'TaskManagement',
				component: TaskManagement,
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
					
					{ path: '/',
						name: 'FixRecords',// 维修管理--维修记录第一个子菜单
						component: FixRecords, //默认为第一个菜单 
						meta: {
							title: '千仞云平台',
							requireAuth: true, 
						 },
					},
					{ path: 'InspectionStandard',
						name: 'InspectionStandard', // 巡检管理-巡检标准
						component: InspectionStandard,
						meta: {
							title: '千仞云平台',
							requireAuth: true,  
						 },
					},
					{ path: 'Worklist',
						name: 'Worklist',
						component: () => import('@/components/TaskManagement/workList.vue'),// 工单管理
						meta: {
							title: '千仞云平台',
							requireAuth: true,  
						 },
					},
					{ path: 'InspectionRoad',
						name: 'InspectionRoad',
						component: () => import('@/components/TaskManagement/InspectionRoad.vue'), //巡检路线
						meta: {
							title: '千仞云平台',
							requireAuth: true,  
						 },
					},
					{ path: 'InspectionPlan',
						name: 'InspectionPlan',
						component: () => import('@/components/TaskManagement/InspectionPlan.vue'), //新增或编辑巡检路线
						meta: {
							title: '千仞云平台',
							requireAuth: true,  
						 },
					},
					{ path: 'InspectionItem',
						name: 'InspectionItem',
						component: () => import('@/components/TaskManagement/InspectionItem.vue'), //巡检点管理
						meta: {
							title: '千仞云平台',
							requireAuth: true,  
						 },
					},
					{ path: 'InspectionRecords',
						name: 'InspectionRecords', // 巡检管理-巡检记录
						component: InspectionRecords,
						meta: {
							title: '千仞云平台',
							requireAuth: true,  
						 },
					},
					{ path: 'InspectionPlan',
						name: 'InspectionPlan', // 巡检管理-巡检计划
						component: InspectionPlan,
						meta: {
							title: '千仞云平台',
							requireAuth: true,  
						 },
					},
	
					{ path: 'MaintenanceRecords',
						name: 'MaintenanceRecords',// 保养管理-保养记录
						component: MaintenanceRecords,
						meta: {
							title: '千仞云平台',
							requireAuth: true, 
						 },
					},
					
					{ path: 'MaintenancePlan',
						name: 'MaintenancePlan',// 保养管理-保养计划
						component: MaintenancePlan,
						meta: {
							title: '千仞云平台',
							requireAuth: true, 
						 },
					},
					{ path: 'MaintenanceStandard',
						name: 'MaintenanceStandard',// 保养管理-保养标准
						component: MaintenanceStandard,
						meta: {
							title: '千仞云平台',
							requireAuth: true, 
						 },
					},
					
					{
						path: 'MeterReadingPoint',
						name:'MeterReadingPoint',
						component: () => import('@/components/TaskManagement/MeterReading/MeterReadingPoint.vue'), //抄表点管理
						meta:{
							title: '千仞云平台',
							requireAuth: true, 
						}
					},
					{
						path: 'MeterReadingLine',
						name:'MeterReadingLine',
						component: () => import('@/components/TaskManagement/MeterReading/MeterReadingLine.vue'), //抄表路线管理
						meta:{
							title: '千仞云平台',
							requireAuth: true, 
						}
					},
					{
						path: 'MeterReadingPlan',
						name:'MeterReadingPlan',
						component: () => import('@/components/TaskManagement/MeterReading/MeterReadingPlan.vue'), //抄表计划管理
						meta:{
							title: '千仞云平台',
							requireAuth: true, 
						}
						
					},
					{ path: 'MeterReadingRecords',
						name: 'MeterReadingRecords',// 抄表管理-抄表记录
						component: () => import('@/components/TaskManagement/MeterReading/MeterReadingRecords.vue'), //抄表计划管理
						meta: {
							title: '千仞云平台',
							requireAuth: true, 
						 },
					}
					
					
					]
				
				
			},
			
			
			
			
			{ path: 'Count',//报表统计
				name: 'Count',
				component: energy,
				redirect: '/home/Count',
				children: [
				    { path: '/',
					name: '',
					component: Count_list,
					 meta: {
					   title: '千仞云平台',
					   requireAuth: true, 
				     }
					},
					 { path: 'DailyStatistics',//日常统计
					   name: 'DailyStatistics',
					   component: DailyStatistics,
					   meta: {
					   title: '千仞云平台',
					   requireAuth: true, 
				       }
					},
					 { path: 'AlarmStatistics2',//告警统计(日常统计子菜单)
					   name: 'AlarmStatistics2',
					   component: AlarmStatistics2,
					   meta: {
					   title: '千仞云平台',
					   requireAuth: true, 
				       }
					},
					 { path: 'EquipmentStatistics2',//设备统计(日常统计子菜单)
					   name: 'EquipmentStatistics2',
					   component: EquipmentStatistics2,
					   meta: {
					   title: '千仞云平台',
					   requireAuth: true, 
				       }
					},
					 { path: 'EnergyStatistics2',//能源统计(日常统计子菜单)
					   name: 'EnergyStatistics2',
					   component: EnergyStatistics2,
					   meta: {
					   title: '千仞云平台',
					   requireAuth: true, 
				       }
					},
					 { path: 'PersonalReports', //个人报表
					   name: 'PersonalReports',
					   component: PersonalReports,
					   meta: {
					   title: '千仞云平台',
					   requireAuth: true, 
				       }
					} 
					 
					
					
					]

			},
			
			{   path: 'SystemManagement',//系统管理
				name: 'SystemManagement',
				component: SystemManagement,
				redirect: '/home/SystemManagement/DeviceChangeManagement',
				meta: {
					title: '千仞云平台',
					requireAuth: true, 
				},
				children: [
					{ path: 'DeviceChangeManagement',
						name: 'DeviceChangeManagement', // 系统管理-设备管理
						component: DeviceChangeManagement,
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						 },
					},
					
					{ path: '/',
						name: 'UserManagement', // 用户管理
						component: UserManagement,
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						 },
					},
					{ path: 'role',
						name: 'role',//角色管理
						component: role,
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						 },
					},
					{   path: 'ProjectManagement', //物联管理
						name: 'ProjectManagement',
						component: ProjectManagement,
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						 },
					},
					
					{   path: 'ConfigurationManagement', //配置管理
						name: 'ConfigurationManagement',
						component: ConfigurationManagement,
						meta: {
							title: '千仞云平台',
							requireAuth: true,
						 },
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
  routes:routers_item
})
