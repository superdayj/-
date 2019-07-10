// 用户增删改查

const router = require('koa-router')(),
DB = require('../../module/db');
const {quillRender} = require('../../module/common')

router.prefix('/news')
router.post('/add',  async (ctx) => {
    const {content} = ctx.request.body
    const delta= await quillRender(content)
    let data = await DB.insert('news',Object.assign(ctx.request.body,{content:delta,addTime:new Date()}))
    ctx.body = data.result
    // try{
    //     if(data.result.ok){
    //         ctx.redirect('/admin/news')
    //     }else{
    
    //     }
    // }catch(err){
    //     ctx.redirect('/admin/news/add')
    // }
})

router.post('/edit', async (ctx) => {
    // console.log(ctx.request.body)
    const {id,title,content,note,status} = ctx.request.body
    const delta= await quillRender(content)
    let data = await DB.update('news',{_id:DB.getObjectID(id)},{
        title,content:delta,note,status
    })
    ctx.body = data.result
   
    // try{
    //     if(data.result.ok){
          
    //     }else{

    //     }
    // }catch(err){
    //     ctx.body = data.result
    // }
})

router.post('/delete',  async (ctx) => {
  ctx.body = 'this is a news response!'
})


module.exports = router.routes()
