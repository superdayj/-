

1、原生node在koa中的post
```
# moudle/common.js
exports.getPostData = function(ctx){
    //获取数据 异步
    return new Promise(function(resolve,reject){
        try{
            let str = '';
            ctx.req.on("data",function(chunk){
                str+=chunk;
            })
            ctx.req.on("end",function(chunk){
                resolve(str)
            })
        }catch(err){
            reject(err)
        }
    })
}

# views/login.ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%=siteTitle%></title>
</head>
<body>
    <form action="/login" method="post">
        用户名：<input type="text" name="username" value="">
        密码：<input type="password" name="password" value="">
        <button type="submit">提交</button>
    </form>
</body>
</html>

# app.js
router.get('/login',async(ctx)=>{
    //接受数据
    await ctx.render('login',{title:"登录"})
})

//接受post
router.post('/login',async(ctx)=>{
    //原生nodejs 在koa中获取表单提交的数据
    var data = await common.getPostData(ctx);
    ctx.body = data;
})
```

2、koa-bodyparser获取表单数据
```
const bodyparser = require("koa-bodyparser");
app.use(bodyparser())
router.post('/login',async(ctx)=>{
    ctx.body=ctx.request.body //获取表单数据
})
```

