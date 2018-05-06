/**
 * Created by hj on 2017/6/5.
 */
//热门
$(()=> {
    $.ajax({
        url: "/bhg",
        success: function (data) {
            var htmlBighot = '';
            var htmlBanner = '';
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                htmlBighot += `
                <li>
                <div class="row">
                <a href="${obj.url}"><img class="col-sm-9 col-xs-12" title="${obj.utitle}" src="${obj.pic}" alt="${obj.uname}"></a>
                <div class="col-sm-3 col-xs-12">
                <div class="rt introduction">
                <h4><a href="${obj.url}" class="big" title="${obj.utitle}">${obj.utitle}</a></h4>
                <p><a href="${obj.url}" class="sma" title="${obj.utitle}">${obj.ucontent}</a></p>
                </div>
                </div>
                </div>
                </li>
                `;
                htmlBanner += `
                <a class="col-sm-3 col-xs-12">
                <img alt="${obj.utitle}" title="${obj.utitle}" src="${obj.pic}">
                <span class="optical_span">${obj.utitle}</span>
                </a>
                `;
            }
            $("#bighot").html(htmlBighot);
            $("#banner_labels").html(htmlBanner);
               $(".bighot").children().first().css({opacity:1,zIndex:5});
            $(".banner_labels>a:first-child").addClass("cur");
        }
    });
    $.ajax({
        url: "/newhg",
        success: function (data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                html+=`
                <li>
                <a href="${obj.url}" title="${obj.utitle}" class="lf">
                <img src="${obj.pic}" alt="${obj.utitle}">
                </a>
                <h3>
                <a href="${obj.url}" title="${obj.utitle}">${obj.uhead}</a>
                </h3>
                <p>
                <a title="${obj.utitle}" href="${obj.url}">${obj.ucontent}</a>
                </p>
                </li>
                `;
            }
            $('.side_new>dd>ul').html(html);
        }
    });
    $.ajax({
        url: "/Gtest",
        success: function (data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                html+=`
                <li><a title="${obj.ucontent}"><img src="${obj.pic}" alt="${obj.ucontent}"><i class="game_score"><em>${obj.score}</em>分</i><p class="game_info">${obj.ucontent}</p></a>
                </li>
                `;
            }
            $('#daySelectList>ul').html(html);
        }
    });
    $.ajax({
        url: "/Bboard",
        success: function (data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                html+=`
                        <li>
                            <i class="red">${i+1}</i>
                            <p class="hot_gname"><span class="lf">${obj.uhead}</span><span class="rt">${obj.score}</span></p>
                            <div class="hot_ginfo">
                                <span class="icon60 lf"><img src="${obj.pic}" alt="${obj.uhead}" class="lazyloader"></span>
                                <div class="hot_infoBox">
                                    <p>${obj.uhead}</p>
                                    <span class="starBox starBox${obj.star}"></span>
                                </div>
                                <a class="btn_down" title="${obj.utitle}">${obj.utitle}</a>
                            </div>
                            <em></em>
                        </li>
                `;
            }
            $('.box>.hot_game').html(html);
            $(".hot_game .hot_gname:first").css("display","none");
            $(".hot_game .hot_ginfo:first").css("display","block");
        }
    });
    $.ajax({
        url: "/BBSforum",
        success: function (data) {
            var html = '';
            html+=`<dt><i></i>游戏论坛</dt>`;
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                html+=`
                <dd class="col-xs-3"><a target="_blank" title="${obj.utitle}"><img src="${obj.pic}" alt="${obj.utitle}"></a><p><b>${obj.utitle}</b><br>${obj.ucontent}<br>${obj.ucount}</p></dd>
                `;
            }
            $('.list-forum').html(html);
        }
    });
    $.ajax({
        url: "/relatedproduct",
        success: function (data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                if(i%4==0){
                    html+=`<div class="col-xs-12 rpframe">`;
                }
                html+=`
                <div class="col-sm-3 col-xs-6">
                    <a href="${obj.url}"><img src="${obj.pic}" alt="${obj.uname}" title="${obj.uname}"/>
                    <p><span>¥${obj.xprice}</span>&nbsp&nbsp<del>¥${obj.uprice}</del><br/>
                        ${obj.uname}
                    </p>
                    </a>
                </div>
                `;
                if(i%4==3){
                    html+=`</div>`;
                }
            }
            $('.relatedproduct').append(html);
            $(".relatedproduct>.rpframe:first").css("display","block");
        }
    });
    var wait=4000;
    var timer=null;
    var i=0;
    $(".bighot").children().first().css({opacity:1,zIndex:0});
    $(".banner_labels>a:first-child").addClass("cur");
    function move(){
        timer=setTimeout(()=>{
        i++;
        if(i==4){
            i=0;
        }
        $(".bighot>li:eq("+i+")").css({opacity:1,zIndex:0}).siblings().css({opacity:0,zIndex:-1});
        $(".banner_labels>a:eq("+i+")").addClass("cur").siblings().removeClass("cur");
        if(canMove)
        move();
        },wait);
    }
    move();
var canMove=true;
var $bl=$(".banner_labels");
    $bl.on("mouseover","img,span",e=>{
        clearTimeout(timer);
        canMove=false;
            i=$bl.children().index(e.target.parentNode);
            $bl.children(":eq(" + i + ")").addClass("cur").siblings().removeClass("cur");
            $(".bighot>li:eq("+i+")").css({opacity:1,zIndex:0}).siblings().css({opacity:0,zIndex:-1});
        });
    $bl.on("mouseout","img,span",()=>{
        canMove=true;
        move();
    });
    $bl.on("click","a",e=>{
        e.preventDefault();
        i=$bl.children().index(e.target.parentNode);
        $bl.children(":eq(" + i + ")").addClass("cur").siblings().removeClass("cur");
        $(".bighot>li:eq("+i+")").css({opacity:1,zIndex:0}).siblings().css({opacity:0,zIndex:-1});
    });

//排行榜
    $(".hot_game .hot_gname:first").css("display","none");
    $(".hot_game .hot_ginfo:first").css("display","block");
    var $hg=$(".hot_game");
    $hg.on("mouseover","li",function(){
        var $li=$(this);
        $li.children(".hot_gname").css("display","none").next().css("display","block");
        $li.siblings().children(".hot_gname").css("display","block").next().css("display","none");
    });
    $hg.mouseleave(function(){
        $(".hot_game .hot_gname:first").css("display","none");
        $(".hot_game .hot_ginfo:first").css("display","block");
        $(".hot_game .hot_gname:not(:first)").css("display","block");
        $(".hot_game .hot_ginfo:not(:first)").css("display","none");
    });
    //手游测评
    var idaySelect=0,iday=0;
    var $ds=$("#daySelectCon");
    var dayWidth=0
    window.onresize=function(){
        if(innerWidth>=1200){
            dayWidth=-198;
            iday=6;
        }
        else if(innerWidth<1200 && innerWidth>=992){
            iday=7;
            dayWidth=-192;
        }
        else if(innerWidth<992 && innerWidth>=768){
            iday=8;
            dayWidth=-185;
        }
        else if(innerWidth<767){
            iday=10;
            dayWidth=-1*(parseFloat($( "#daySelectList li").css("width"))+8) ;
        }
        if(idaySelect<=iday){
            $("#daySelectList").css("left",dayWidth*idaySelect);
        }
        else if(idaySelect>iday){
            $("#daySelectList").css("left",dayWidth*iday);
        }
    }
    $ds.on("mouseover","a:first",e=>{
        var $e=$(e.target);
        if(idaySelect>0){
            $e.css({backgroundPosition:'0px -81px'});
        }
    });
    $ds.on("mouseout","a:first",e=>{
        var $e=$(e.target);
        $e.css({backgroundPosition:'0px -34px'});

    });
    $ds.on("mouseover","a:last",e=>{
        var $e=$(e.target);
        if(idaySelect<=iday){
            $e.css({backgroundPosition:'-33px -81px'});
        }
    });
    $ds.on("mouseout","a:last",e=>{
        var $e=$(e.target);
            $e.css({backgroundPosition:'-33px -34px'});
    });
    $("#daySelect_next").click(e=>{
        if(innerWidth>=1200){
            dayWidth=-198;
            iday=5;
        }
        else if(innerWidth<1200 && innerWidth>=992){
            iday=6;
            dayWidth=-192;
        }
        else if(innerWidth<992 && innerWidth>=768){
            iday=7;
            dayWidth=-185;
        }
        else if(innerWidth<767){
            iday=9;
           dayWidth=-1*(parseFloat($( "#daySelectList li").css("width"))+8) ;
        }
        e.preventDefault();
        if(idaySelect<=iday){
            idaySelect++;
            $("#daySelectList").css("left",dayWidth*idaySelect);
            if(idaySelect>iday){
                $("#daySelect_next").css({backgroundPosition:'-33px -34px'});
            }
        }

    });
    $("#daySelect_prev").click(e=>{
        e.preventDefault();
        if(idaySelect>0){
            idaySelect--;
            $("#daySelectList").css("left",dayWidth*idaySelect);
            if(idaySelect<=0){
                $("#daySelect_prev").css({backgroundPosition:'0px -34px'});
            }
        }
    })
    //周边
    $(".relatedproduct>.rptitle:first").addClass("rphover");
    $(".relatedproduct>.rpframe:first").css("display","block");
    $(".relatedproduct>.rptitle").on("click",e=>{
        var $index=$(".relatedproduct>.rptitle").index(e.target);
        $(".relatedproduct>.rptitle:eq("+$index+")").addClass("rphover").siblings().removeClass("rphover");
        $(".relatedproduct>.rpframe:eq("+$index+")").css("display","block").siblings(".rpframe").css("display","none");
    })

});



