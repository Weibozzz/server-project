/**
 * Created by hj on 2017/6/4.
 */
$(()=>{
    var loading=0;
$("#header").load("tpl/header.html",function(){
    switch (location.pathname){
        case "/hotgame":
            $("#tab").css({left: 1*parseInt($("#tab").css("width"))});
            break;
        default :
            $("#tab").css({left:0});
            break;
    }
    if(sessionStorage['username']!=null){
        $("#header").find(".userlogin").html(`<ul class='user'>
                <li class="uesr-menu"><a class="auser" href=' '>${sessionStorage['username']}</a>
                <ul id="submenu" class="shield">
				<li>我的订单</li>
				<li>购物车</li>
				<li>新消息</li>
				<li>客服服务</li>
				<li>退出登录</li>
			</ul>
                </li>
            </ul>`);

    }
    loading+=1;
    if(loading==3){
        st();
    }
    });
$("#footer").load("tpl/footer.html",function(){
    loading+=1;
    if(loading==3){
        st();
    }
});
$("#drop").load("tpl/drop.html",function(){
    loading+=1;
    if(loading==3){
        st();
    }
});
    function st(){
        var navindex=0;
        var tabindex=[];
        tabindex['/hotgame']=1;
        tabindex['/']=0;
        var $index=0;
        window.onresize=function(){
            $("#tab").css({left: tabindex[location.pathname] * parseInt($("#tab").css("width"))});
        }
        $(".navlist>li:not(#tab)").mouseenter(e=> {
            $("#tab").stop(true);
            if(e.target.nodeName=="LI"){
             $index = $(".navlist>li").index(e.target);
            } else if(e.target.nodeName=="SPAN"){
              $index = $(".navlist span").index(e.target);
            }
            if($index==-1)
               $index=0;
            if($index>navindex)
            $("#tab").animate({left: $index * parseInt($("#tab").css("width"))+10},200)
                .animate({left: $index * parseInt($("#tab").css("width"))},200);
            else if($index<navindex)
            $("#tab").animate({left: $index * parseInt($("#tab").css("width"))-10},200)
            .animate({left: $index * parseInt($("#tab").css("width"))},200);
            navindex=$index;
        });
        $(".navlist").mouseleave(e=> {
            if(navindex!=tabindex[location.pathname]){
                $("#tab").stop(true);
            $("#tab").animate({left: tabindex[location.pathname] * parseInt($("#tab").css("width"))-10},200)
                    .animate({left: tabindex[location.pathname] * parseInt($("#tab").css("width"))},200);
            navindex=tabindex[location.pathname];
            }
            else if(navindex==tabindex[location.pathname]){
                $("#tab").css({left: tabindex[location.pathname] * parseInt($("#tab").css("width"))});
            }

        });
        $('.navlist').on('click','li',e=>{
            var $index=$(e.target);
            switch ($index.attr('title')){
                case '首页':location.href='/';
                    break;
                case '热门游戏':location.href='/hotgame';
                    break;
            }
        })
        //隐藏按钮
        $("#navbar-toggle").on("click",e=>{
            $("#drop").toggleClass("in");
        });
        $(".userlogin a:first").on("click",e=>{
            e.preventDefault();
            $(".modal-login").css("display","block");
        })
        $(".userlogin a:last").on("click",e=>{
            e.preventDefault();
            $(".modal-register").css("display","block");
        })
            //login or register
        $(".userlogin a:not(.auser)").click(e=>{
                var $index=$(".userlogin a").index(e.target);
                var html='';
                if($index==0){
                    html=`<div class="modal-content modal-login">
                <div type="button" class="close">&times;</div>
                <h4>用户登录</h4>
                <div class="lftitle"></div>
                <form id="login-form">
                    <span>用户名：</span><input type="text" placeholder="请输入用户名" name="uname" id="uname" >
                    <br/><span>密码：&nbsp&nbsp&nbsp</span><input type="password" placeholder="请输入密码" name="upwd" id="upwd" >
                    <input type="button" value="登录" id="bt-login" class="btn btn-success">
                </form>
            </div>`;
                }
                else if($index==1){
                    html=`<div class="modal-content modal-register">
                <div type="button" class="close">&times;</div>
                <h4>用户注册</h4>
                <form id="register-form">
                    <span>用户名：</span><input type="text" placeholder="请输入用户名" name="rname" id="rname" >
                    <span>设置密码：</span><input type="password" placeholder="请设置密码" name="rpwd" id="rpwd" >
                    <span>确认密码：</span><input type="password" placeholder="请确认密码" name="rpwd1" id="rpwd1" >
                    <input type="checkbox" id="rcheck"/><span class="rc">阅读并同意 <a href="">《top用户注册协议》</a></span>
                    <input type="button" value="注册" id="bt-register" class="btn btn-success">
                </form>
            </div>`;
                }
                $(".modal-dialog").html(html);
                $(".modal").css("display","block");
        });
        $(".modal").on("click",".close",function(){
            $(".modal").css("display","none");
        });
        var ifrname=false;
         $(".modal").on("focus",'#rname',e=>{
             $(".modal").find("#register-form").find('div.rname').remove();
             var typei=$(e.target);
             typei.after('<div class="rname"><span class="warning">' +
             '</span>支持大小写字母、数字的组合，不能以数字开头，4-6个字符</div>');
         });
        $(".modal").on("blur",'#rname',e=>{
            $(".modal").find("#register-form").find('div.rname').remove();
            var typei=$(e.target);
            var rname=$(".modal").find("#rname").val();
            var regrname =/^[A-Za-z]+[A-Za-z0-9]{3,5}$/i;
            if(rname==''){
            typei.after('<div class="rname"><span class="error"></span>用户名不能为空！</div>');
                return;
            }
            else if(!regrname.test(rname)){
            typei.after('<div class="rname"><span class="error"></span>用户名格式不正确！</div>');
                return;
            }
            $.ajax({
                type:"get",
                url:"/userlogin",
                data:{"uname":rname},
                success:function(data){
                    if(data.length>0){
                        typei.after('<div class="rname"><span class="error"></span>该用户名已存在！</div>');
                    }
                    else{
                        typei.after('<div class="rname"><span class="ok"></span>该用户名可以使用！</div>');
                        ifrname=true;
                    }
                }
            })
        });
         $(".modal").on("focus",'#rpwd',e=>{
             $(".modal").find("#register-form").find('div.rpwd').remove();
             var typei=$(e.target);
             typei.after('<div class="rpwd"><span class="warning"></span>支持小写字母、数字的组合，6-12个字符</div>');
         });
        $(".modal").on("blur",'#rpwd',e=>{
            $(".modal").find("#register-form").find('div.rpwd').remove();
            var rpwd=$(".modal").find("#rpwd").val();
            var regrpwd =/^[a-z0-9]{6,12}$/i;
            var typei=$(e.target);
            if(rpwd==''){
                typei.after('<div class="rpwd"><span class="error"></span>密码不能为空！</div>');
                return;
            }
            else if(!regrpwd.test(rpwd)){
                typei.after('<div class="rpwd"><span class="error"></span>密码格式不正确！</div>');
                return;
            }
            else{
                typei.after('<div class="rpwd"><span class="ok"></span>密码格式正确！</div>');
            }
        })
        $(".modal").on("click","#bt-login",function(){
            var t=null;
            var s=null;
            var i=0;
            var uname=$(".modal").find("#uname").val();
            var upwd=$(".modal").find("#upwd").val();
            $(".modal").find("#login-form").find("div").remove();
            var reguname =/^[A-Za-z]+[A-Za-z0-9]{3,5}$/i;
            var regupwd =/^[a-z0-9]{6,12}$/i;
            if(uname==''){
                $(".modal").find("#upwd").after('<div><span></span>用户名不能为空！</div>');
                return;
            }
            else if(!reguname.test(uname)){
                $(".modal").find("#upwd").after('<div><span></span>用户名格式不正确！</div>');
                return;
            }
            if(upwd==''){
                $(".modal").find("#upwd").after('<div><span></span>密码不能为空！</div>');
                return;
            }
            else if(!regupwd.test(upwd)){
                $(".modal").find("#upwd").after('<div><span></span>密码格式不正确！</div>');
                return;
            }
            $.ajax({
                type:"get",
                url:"/userlogin",
                data:{"uname":uname,"upwd":upwd},
                success:function(data){
                    if(data.length==0){
                        $(".modal").find("#upwd").after('<div><span></span>用户名不存在！</div>');
                    }
                    else if(data[0].upwd!=upwd){
                        $(".modal").find("#upwd").after('<div><span></span>密码错误！</div>');
                    }
                    else{
                        sessionStorage.setItem("username",data[0].uname);
                        $(".modal").find("#upwd").after(`<div>3秒后回到首页</div>`);
                        s=setInterval(function(){
                            i++;
                         $(".modal").find("#login-form").find("div").remove();
                         $(".modal").find("#upwd").after(`<div>${3-i}秒后回到首页</div>`);
                        },1000);
                        t=setTimeout(function(){
                            location.href="/";
                        },3000);
                  }
                }
            })
        });
        $(".modal").on("click","#bt-register",function(){
            $(".modal").find("#register-form").find('div.rpwd1').remove();
            $(".modal").find("#register-form").find('div.rname').remove();
            var rname=$(".modal").find("#rname").val();
            var rpwd=$(".modal").find("#rpwd").val();
            var rpwd1=$(".modal").find("#rpwd1").val();
            if(rname==''){
                $(".modal").find("#rname").after('<div class="rname"><span class="error"></span>用户名不能为空！</div>');
                return;
            }
            else {
                $(".modal").find("#rname").after('<div class="rname"><span class="ok"></span>该用户名可以使用！</div>');
            }
            if(rpwd1==''||rpwd1!=rpwd){
                $(".modal").find("#rpwd1").after('<div class="rpwd1"><span class="error"></span>确认密码不能为空！</div>');
                return;
            }
            else if(rpwd1!=rpwd){
                $(".modal").find("#rpwd1").after('<div class="rpwd1"><span class="error"></span>确认密码不一致！</div>');
                return;
            }
            if($("#rcheck").prop("checked")&&ifrname==true){
                $.ajax({
                    type:"POST",
                    url:"/userregister",
                    data:{"rname":rname,"rpwd":rpwd},
                    success:function(data){
                        if(data.affectedRows==1){
                            $(".modal").find("#bt-register").after(`<div class="success">
                            <span class="ok"></span>注册成功！3秒后回到首页</div>`);
                            var i=0;
                            var t=setInterval(function(){
                                i++;
                            $(".modal").find("div.success").remove();
                            $(".modal").find("#bt-register").after(`<div class="success">
                            <span class="ok"></span>注册成功！${3-i}秒后回到首页</div>`);
                                if(i>2){
                                    clearInterval(t);
                                    location.href="/";
                                }
                            },1000)

                        }
                    }
                })
            }
        });
        $("#submenu").on("click","li",e=>{
            var $index=$("#submenu").find('li').index(e.target);
            if($index==4){
                sessionStorage.clear();
                location.href="/";
            }
        })


    }
});