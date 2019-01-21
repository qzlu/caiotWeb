import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home' 
import login from '@/components/user/login'

import monitoring from '@/components/monitoring' //实时监测
import product from '@/components/monitoring/product' //实时监测详细
import detail_info from '@/components/monitoring/detail_info' //实时监测详
import detail_info_list from '@/components/monitoring/detail_info_list' //实时监测详细-详细页

import foreshow from '@/components/foreshow' //预告警管理
import test from '@/components/foreshow/test'
import foreshow_count from '@/components/foreshow/count'//告警统计
import history_count from '@/components/foreshow/history_count'//告警统计


import energy from '@/components/energy' //能源管理
import energy_list from '@/components/energy/list' //能源管理

import Count from '@/components/Count' //统计报表
import Count_list from '@/components/Count/list' //统计报表

import agreement from '@/components/agreement' //安卓页面

Vue.use(Router)

export default new Router({
	// mode: 'history',
  routes: [  
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
			meta: {
				title: '千仞云平台',
				requireAuth: true, // 判断该路由是否需要登录权限
			},
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
							requireAuth: true, // 判断该路由是否需要登录权限
						},
					 },
					 { path: 'detail_info/:id/:SingleType', //详情页
					 	name: 'detail_info',
					 	component: detail_info,
					 	meta: {
							title: '千仞云平台',
							requireAuth: true, // 判断该路由是否需要登录权限
						},
					 	
					},
					
					{ path: 'detail_info_list/:id/:PossionID/:getalldata/',//详情页-详细列表
					 	name: 'detail_info_list',
					 	component: detail_info_list,
					 	meta: {
							title: '千仞云平台',
							requireAuth: true, // 判断该路由是否需要登录权限
						},
					},
					
					
					
				]
				
			},
			{ path: 'foreshow',//预告警管理
				name: 'foreshow',
				component: foreshow,
				redirect: '/home/foreshow',//子路由设置默认页
				
				children: [
					{ path: '/', //实时告警
					  name: 'test',
					  component: test,
					  meta: {
					    title: '千仞云平台',
					    requireAuth: true, // 判断该路由是否需要登录权限  
				      }
					},
					{ path: 'history_count', //预告警统计
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
					    requireAuth: true, // 判断该路由是否需要登录权限  
				      }
					}
				  ]
				
				
			},
			
			{ path: 'energy',//能源警管理
				name: 'energy',
				component: energy,
				redirect: '/home/energy',//子路由设置默认页
				meta: {
					title: '千仞云平台',
					requireAuth: true, // 判断该路由是否需要登录权限
				},
				children: [
					{ path: '/',
					name: '',
					component: energy_list,
					meta: {
						title: '千仞云平台',
						requireAuth: true, // 判断该路由是否需要登录权限
					 },
					}
					]
				
				
			},
			
			{ path: 'Count',//预告警管理
				name: 'Count',
				component: energy,
				redirect: '/home/Count',//子路由设置默认页
				meta: {
					title: '千仞云平台',
					requireAuth: true, // 判断该路由是否需要登录权限
				},
				children: [
					{ path: '/',
					name: '',
					component: Count_list,
					 meta: {
					   title: '千仞云平台',
					   requireAuth: true, // 判断该路由是否需要登录权限
				     }
					}
					]

			},
			
			
			
			
			]
		},
		
  ]
})
