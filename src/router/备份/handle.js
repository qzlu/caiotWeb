
import router from './index'

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
//console.log(to)
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  	//  console.log(to.meta.requireAuth)
 if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限, 定义用户中心需要登录权限
   var user=localStorage.getItem("iuserName");
	 var token=localStorage.getItem("Token");
			if(!user||!token){
	 		 // alert("请先登录！")
	 	  next({ 
	     // name: 'login'    //强制跳转指定页面       
	     })
	 	 }else{
	 	 	next()
	 	 }
		 
	 next()

 }else{
 	 next()
 }
})