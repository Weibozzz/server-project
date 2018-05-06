/**
 * Created by hj on 2017/7/10.
 */
$(()=>{
    var istype=0;
    var type=function(data,cla){
        var html='';
        html+=`<ul class="col-sm-10 col-xs-8 type">`;
        for(var i=0;i<data.length;i++){
            html+=`<li>${data[i].uname}</li>`;
        }
        html+=`</ul>`;
        $(cla).after(html);
        $(cla).next().children('li:first').addClass("ligametype");
        $(cla).next().on('click','li',e=>{
            var $index=$(cla).next().children('li').index(e.target);
            $(cla).next().children(`li:eq(${$index})`).addClass("ligametype").siblings().removeClass("ligametype");
            var $gametype=$('.gametype').next().children('[class=ligametype]').text();
            var $gameterrace=$('.gameterrace').next().children('[class=ligametype]').text();
            var $gameplay=$('.gameplay').next().children('[class=ligametype]').text();
            var $gamesubject=$('.gamesubject').next().children('[class=ligametype]').text();
            $.ajax({
                type:'GET',
                url:'/pagetype',
                data:{gametype:$gametype,gameterrace:$gameterrace,gameplay:$gameplay,gamesubject:$gamesubject},
                success:function(data){
                    pagecount(data);
                    istype=1;
                    if(data.length>0){
                        $.ajax({
                            type:'GET',
                            url:'/gameAll',
                            data:{ucount:0,gametype:$gametype,gameterrace:$gameterrace,gameplay:$gameplay,gamesubject:$gamesubject},
                            success:function(data){
                                mediaList(data);
                                th(data);
                            }
                        });
                    }
                    else{
                        $('.media-list').html('没有找到此类型游戏');
                        $('.th').html('没有找到此类型游戏');
                    }
                }
            })
        })
    };
    var mediaList=function(data){
        var html='';
        for(var i=0;i<data.length;i++){
            html+=`
                                    <li class="media" title="${data[i].uname}">
                        <div class="media-left">
                            <a href="">
                                <img class="media-object" src="${data[i].pic}" title="${data[i].uname}" alt="${data[i].uname}">
                            </a>
                        </div>
                        <div class="media-body">
                            <h5 class="media-heading">${data[i].uname}</h5>
                            <strong>分类：</strong>${data[i].utype}
                            <br/>
                            <strong>大小：</strong>${data[i].usize}&nbsp;<strong>评分：</strong>${data[i].score}
                            <br/>
                            <span title="${data[i].uname}" class="display767">${data[i].content}</span>
                        </div>
                    </li>
                `;
        }
        $('.media-list').html(html);
    };
    var th=function(data){
        var html='';
        for(var i=0;i<data.length;i++){
            html+=`
                <div class="col-md-2 col-sm-3 col-xs-4">
                    <div class="thumbnail">
                        <img src="${data[i].pic}" alt="${data[i].uname}">
                        <div class="caption">
                            <h5>${data[i].uname}</h5>
                            <p>${data[i].utype}</p>
                        </div>
                    </div>
                </div>
                `;
        }
        $('.th').html(html);
    };
    $.ajax({
        type:'GET',
        url:'/gametype',
        success:function(data){
            var cla='.gametype';
            type(data,cla);
        }
    });
    $.ajax({
        type:'GET',
        url:'/gameterrace',
        success:function(data){
            var cla='.gameterrace';
            type(data,cla);
        }
    });
    $.ajax({
        type:'GET',
        url:'/gameplay',
        success:function(data){
            var cla='.gameplay';
            type(data,cla);
        }
    });
    $.ajax({
        type:'GET',
        url:'/gamesubject',
        success:function(data){
            var cla='.gamesubject';
            type(data,cla);
        }
    });
    $.ajax({
        type:'GET',
        url:'/game',
        data:{ucount:0},
        success:function(data){
            mediaList(data);
            th(data);
        }
    });
    $.ajax({
        type:'GET',
        url:'/page',
        success:function(data){
            pagecount(data);
        }
    });
    var pagecount=function(data){ //分页函数
        var i=Math.ceil(data.length/30);
        var html='';
        if(i!=0){
         html=`<li>
            <a aria-label="Previous">
            &laquo;
            </a>
            </li>`;
            if(i>6){
                html+=`<li><a>1</a></li>`;
                html+=`<li><a>2</a></li>`;
                html+=`<li><a>...</a></li>`;
                html+=`<li><a>${i-2}</a></li>`;
                html+=`<li><a>${i-1}</a></li>`;
            }
            else{
                for(var j=1;j<=i;j++){
                    html+=`<li><a>${j}</a></li>`;
                }
            }

        html+=`<li>
            <a aria-label="Next">
            &raquo;
            </a>
            </li>`;
        }
        $('.pagination').html(html);
        var jc=1;
            $('.pagination a').on('click',e=>{
                var $index=$(e.target);
                var icount=$('.pagination a').index($index);
                if($index.attr('aria-label')=='Previous')
                {
                    jc--;
                    if(jc<=1){
                        jc=1;
                    }
                }
                else if($index.attr('aria-label')=='Next')
                {
                    jc++;
                    if(jc>i){
                        jc=i;
                    }
                }
                else{
                    jc=icount;
                }
                if(istype==0){
                    if(i-jc>6){
                        pagechange1(i,jc);
                    }
                    else if(i-jc<=6&&6<i-jc){
                        pagechange2(i);
                    }
                $.ajax({
                    type:'GET',
                    url:'/game',
                    data:{ucount:(jc-1)*30},
                    success:function(data){
                        mediaList(data);
                        th(data);
                    }
                });
                }
                else if(istype==1){
                    if(i-jc>6){
                        pagechange1(i,jc);
                    }
                    else if(i-jc<=6&&6<i-jc){
                        pagechange2(i);
                    }
                    var $gametype=$('.gametype').next().children('[class=ligametype]').text();
                    var $gameterrace=$('.gameterrace').next().children('[class=ligametype]').text();
                    var $gameplay=$('.gameplay').next().children('[class=ligametype]').text();
                    var $gamesubject=$('.gamesubject').next().children('[class=ligametype]').text();
                    $.ajax({
                        type:'GET',
                        url:'/gameAll',
                        data:{ucount:(jc-1)*30,gametype:$gametype,gameterrace:$gameterrace,gameplay:$gameplay,gamesubject:$gamesubject},
                        success:function(data){
                            mediaList(data);
                            th(data);
                        }
                    });
                }
                else if(istype==2){
                    return;
                }
            })
    }
    var pagechange1=function(i,jc){
        html=`<li>
              <a aria-label="Previous">
              &laquo;
              </a>
              </li>`;
        html+=`<li><a>${jc}</a></li>`;
        html+=`<li><a>${jc+1}</a></li>`;
        html+=`<li><a>...</a></li>`;
        html+=`<li><a>${i-1}</a></li>`;
        html+=`<li><a>${i}</a></li>`;
        html+=`<li>
               <a aria-label="Next">
               &raquo;
               </a>
               </li>`;
        $('.pagination').html(html);
    };
    var pagechange2=function(i){
        html=`<li>
              <a aria-label="Previous">
              &laquo;
              </a>
              </li>`;
        for(var j=i-5;j<i;j++){
            html+=`<li><a>${j}</a></li>`;
        }
        html+=`<li>
               <a aria-label="Next">
               &raquo;
               </a>
               </li>`;
        $('.pagination').html(html);
    };
    $(".ithlist").css('color','#179ee4');
    $(".ith").on('click',e=>{
        $(".th").css("display","block");
        $(".th-list").css("display","none");
        $(".ithlist").css('color','#d6d6d6');
        $(".ith").css('color','#179ee4');

    });
    $(".ithlist").on('click',e=>{
        $(".th").css("display","none");
        $(".th-list").css("display","block");
        $(".ithlist").css('color','#179ee4');
        $(".ith").css('color','#d6d6d6');

    });
    $(window).scroll(()=>{
        var scrollTop= $("body").scrollTop();
        if(scrollTop>innerHeight){
            $('#elevator').css('display','block');
        }
        else{
            $('#elevator').css('display','none');
        }
    })
    $("#searchIn").keyup(function(){
        var input = this.value;
        if(input!='') {
            $.ajax({
                type: 'GET',
                url: '/search',
                data: {input: input},
                success: function (data) {
                    if (data.length > 0) {
                        var html = '';
                        for (var i = 0; i < data.length; i++) {
                            html += `<li>${data[i].uname}</li>`;
                        }
                        $('#suggest').html(html);
                        $('#suggest').css('display', 'block');
                    }
                }
            })
        }
        else{
            $('#suggest').css('display', 'none');
        }
    });
    $('#search').click(function(){
        var input=$("#searchIn").val();
        $('#suggest').css('display', 'none');
        if(input!=''){
            $.ajax({
                type: 'GET',
                url: '/search',
                data:{input: input},
                success:function(data){
                    istype=2;
                    mediaList(data);
                    th(data);
                    pagecount(data);
                    $("#searchIn").val('');
                    $('.gameplay').next().children('li:first').addClass("ligametype").siblings().removeClass("ligametype");
                    $('.gamesubject').next().children('li:first').addClass("ligametype").siblings().removeClass("ligametype");
                    $('.gameterrace').next().children('li:first').addClass("ligametype").siblings().removeClass("ligametype");
                    $('.gametype').next().children('li:first').addClass("ligametype").siblings().removeClass("ligametype");
                }
            })
        }

    });
    $('#suggest').on('click','li',e=>{
        var $index=$(e.target);
        var uname=$index.text();
        $('#suggest').css('display', 'none');
        $.ajax({
            type: 'GET',
            url: '/searchresult',
            data:{un:uname},
            success:function(data){
                mediaList(data);
                th(data);
                $('#suggest').css('display', 'none');
                $('.pagination').html('');
                $("#searchIn").val('');
                $('.gameplay').next().children('li:first').addClass("ligametype").siblings().removeClass("ligametype");
                $('.gamesubject').next().children('li:first').addClass("ligametype").siblings().removeClass("ligametype");
                $('.gameterrace').next().children('li:first').addClass("ligametype").siblings().removeClass("ligametype");
                $('.gametype').next().children('li:first').addClass("ligametype").siblings().removeClass("ligametype");
            }
        })
    })
});