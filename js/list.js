$(function () {
    //验证用户是否已经登录
    let name_on = getCookie('username');
    console.log(name_on);
    if (name_on) {
        $('.admin_on').css('display', 'block');
        $('.admin_off').css('display', 'none');
        $('.admin_on .username').html(name_on);
    } else if (!name_on) {
        $('.admin_on').css('display', 'none');
        $('.admin_off').css('display', 'block');
    }
    //退出登录
    $('.admin_on .exit').click(function () {
        removeCookie('username');
        $('.admin_on').css('display', 'none');
        $('.admin_off').css('display', 'block');
    });


    // 分页部分
    console.log('666');
    var ipage = 1; //第几页
    var num = 16; //每页16条数据
    var pageNow = 1;//当前页
    var rank = ''//排行
    var pagesMax = 0;//最大页数

    //渲染列表页的函数，init()用来请求数据， init(1)是渲染第一页
    function init(ipage) {
        console.log('666');
        $.ajax({
            type: 'get',
            url: '../api/listdata.php',
            async: true,
            data: {
                page: ipage,
                num: num,
                rank: rank
            },
            success: function (str) {
                // console.log(str);
                create(str);
            }
        });
    };
    init(1);

    //渲染数据
    function create(str) {
        //渲染商品
        var arr = JSON.parse(str);
        console.log(arr);
        //动态改变 排行栏右边 商品总数和页码数
        $('.head_pagecount span').html(arr.total);
        pagesMax = Math.ceil(arr.total / arr.num);
        $('.head_pageInfo em').html(pagesMax);
        //onsole.log(pagesMax);
        //渲染商品图文数据
        var res = arr.data.map(function (item) {
            return `
                <li data-id="${item.gid}">
                    <div class="item_wrap">
                        <div class="prod_pic">
                            <span>【${item.support}】</span>
                            <i class="lis">
                                <img src="../img/${item.img_mid}" alt="">
                            </i>

                        </div>
                        <div class="prod_name">
                            <i class="text lis">${item.title_cn}</i>
                        </div>
                        <div class="prod_price">
                            <div class="prices">
                                <em>￥</em>
                                <span>${item.price_on}</span>
                                <del>￥${item.price_off}</del>
                                <div class="saleinfos"></div>
                            </div>
                            <div class="icon_wrap">

                            </div>
                        </div>
                        <div class="prod_sales">
                            <div class="sales">
                                月销${item.sales}
                            </div>
                            <div class="rating">

                            </div>
                        </div>
                        <div class="prod_btns">
                            <div class="btn_cart"></div>
                            <div class="btn_coll"></div>
                        </div>
                        <p class="prod_tags">
                            <span>${item.effect}</span>
                        </p>
                    </div>
                </li>`;
        }).join('');
        $('#goods_box_in').html(res); //渲染到list里面

        var html = '';

        //复杂版
        if (pageNow == 1) {
            for (var i = 0; i < 5; i++) {
                html += '<span>' + (i + 1) + '</span>';
            }
            html = html + `...` + '<span>' + (pagesMax - 1) + '</span>' + '<span>' + pagesMax + '</span>';
            html = html + `<a href="javascript:;" id="nextPage">下一页</a>`;
            $('#pages_box .pages').html(html); //插入节点
            console.log(ipage);
            var index = pageNow - 1;
            $('#pages_box .pages span').eq(index).attr('class', 'active'); //页码点亮效果
        } else if (pageNow > 1 && pageNow <= 5) {
            for (var i = 0; i < 5; i++) {
                html += '<span>' + (i + 1) + '</span>';
            }
            html = `<a href="javascript:;" id="prePage">上一页</a>` + html;
            html = html + `...` + '<span>' + (pagesMax - 1) + '</span>' + '<span>' + pagesMax + '</span>';
            html = html + `<a href="javascript:;" id="nextPage">下一页</a>`;
            $('#pages_box .pages').html(html); //插入节点
            console.log(ipage);
            var index = pageNow - 1;
            $('#pages_box .pages span').eq(index).attr('class', 'active'); //页码点亮效果
        } else if (pageNow > 5 && pageNow < (pagesMax - 4)) {
            for (var i = 0; i < 2; i++) {
                html += '<span>' + (i + 1) + '</span>';
            }
            html = `<a href="javascript:;" id="prePage">上一页</a>` + html;
            html = html + `...`;
            for (var i = 0; i < 5; i++) {
                html += '<span>' + (pageNow - 2 + i) + '</span>';
            }
            html = html + `...` + '<span>' + (pagesMax - 1) + '</span>' + '<span>' + pagesMax + '</span>';
            html = html + `<a href="javascript:;" id="nextPage">下一页</a>`;
            $('#pages_box .pages').html(html); //插入节点
            console.log(ipage);
            var index = pageNow - 1;
            $('#pages_box .pages span').eq(4).attr('class', 'active'); //页码点亮效果
        } else if (pageNow >= (pagesMax - 4)) {
            for (var i = 0; i < 2; i++) {
                html += '<span>' + (i + 1) + '</span>';
            }
            html = `<a href="javascript:;" id="prePage">上一页</a>` + html;
            html = html + `...`;
            for (var i = 0; i < 5; i++) {
                html += '<span>' + (pagesMax - 4 + i) + '</span>';
            }
            html = html + `<a href="javascript:;" id="nextPage">下一页</a>`;
            $('#pages_box .pages').html(html); //插入节点
            console.log(ipage);
            var index = pageNow - 7;
            $('#pages_box .pages span').eq(index).attr('class', 'active'); //页码点亮效果
        }
        //改变 排行栏右边的页码
        $('.head_pageInfo span').html(pageNow);
    }

    //页码部分
    //鼠标点击 数字页码
    $('#pages_box .pages').on('click', 'span', function () {
        console.log($(this).html());
        pageNow = $(this).html();
        init(pageNow);
    });
    // 鼠标点击 上一页 下一页
    $('#pages_box .pages').on('click', 'a', function () {
        console.log($(this).html());
        if ($(this).html() == '上一页') {
            pageNow--;
            if (pageNow <= 1) {
                pageNow = 1;
                init(pageNow);
            } else {
                init(pageNow);
            }
        } else if ($(this).html() == '下一页') {
            pageNow++;
            if (pageNow > pagesMax) {
                pageNow = pagesMax;
            } else {
                init(pageNow);
            }
        }
    });
    //排行栏 右边
    $('.head_pagebtn').on('click', 'span', function () {
        console.log($(this).html());
        if ($(this).html() == '上一页') {
            pageNow--;
            if (pageNow <= 1) {
                pageNow = 1;
                init(pageNow);
            } else {
                init(pageNow);
            }
        } else if ($(this).html() == '下一页') {
            pageNow++;
            if (pageNow > pagesMax) {
                pageNow = pagesMax;
            } else {
                init(pageNow);
            }
        }
    });

    //清除其他按键的点亮样式
    function nan_clean() {
        $('.rank_default span').css('backgroundImage', 'url(../img/icon_rank_desc_1_.png)').css('color', '#727272;');
        $('.rank_sales span').css('backgroundImage', 'url(../img/icon_rank_desc_1_.png)').css('color', '#727272;');
        $('.rank_pop span').css('backgroundImage', 'url(../img/icon_rank_desc_1_.png)').css('color', '#727272;');
        $('.rank_date span').css('backgroundImage', 'url(../img/icon_rank_desc_1_.png)').css('color', '#727272;');
        $('.rank_check span').css('backgroundImage', 'url(../img/icon_rank_check.jpg)');
        $('.rank_price span').css('backgroundImage', 'url(../img/icon_rank_two_default.png)').css('color', '#727272;');
    }

    //筛选/排行 默认 价格 销量 人气 上架时间 只看特卖
    // 默认
    $('#rank_nav .rank_default').on('click', function () {
        nan_clean();
        $('.rank_default span').css('backgroundImage', 'url(../img/icon_rank_desc_1_hover.png)').css('color', '#ed145b');
        rank = '';
        init(1);
    });
    // 销量
    $('#rank_nav .rank_sales').on('click', function () {
        nan_clean();
        $('.rank_sales span').css('backgroundImage', 'url(../img/icon_rank_desc_1_hover.png)').css('color', '#ed145b');
        rank = 'sales';
        init(1);
    });
    //人气
    $('#rank_nav .rank_pop').on('click', function () {
        nan_clean();
        $('.rank_pop span').css('backgroundImage', 'url(../img/icon_rank_desc_1_hover.png)').css('color', '#ed145b');
        rank = 'popular';
        init(1);
    });
    //上架时间
    $('#rank_nav .rank_date').on('click', function () {
        nan_clean();
        $('.rank_date span').css('backgroundImage', 'url(../img/icon_rank_desc_1_hover.png)').css('color', '#ed145b');
        rank = 'add_time';
        init(1);
    });
    //只看特卖  1，切换勾选框的背景图。2，从数据库筛选数据并渲染
    var rank_check_ok = false;
    $('#rank_nav .rank_check').on('click', function () {
        nan_clean();
        if (rank_check_ok == false) {
            $('.rank_check span').css('backgroundImage', 'url(../img/icon_rank_checked.jpg)');
            rank_check_ok = true;
            console.log('1');
            rank = 'special';
            init(1);
        } else if (rank_check_ok == true) {
            $('.rank_check span').css('backgroundImage', 'url(../img/icon_rank_check.jpg)');
            rank_check_ok = false;
            console.log('2');
            rank = '';
            init(1);
        }
    });
    //价格排序
    // var rank_price_ok = false;
    // var rank_price_up = false;
    // $('#rank_nav .rank_price').on('click', function () {
    //     nan_clean();
    //     if (rank_price_up == false) {
    //         $('.rank_price span').css('backgroundImage', 'url(../img/icon_rank_two_up.png)').css('color', '#ed145b');
    //         rank_price_up = true;
    //         console.log('3');
    //         rank = 'price2';
    //         init(1);
    //     } else if (rank_price_up == true) {
    //         $('.rank_price span').css('backgroundImage', 'url(../img/icon_rank_two_down.jpg)').css('color', '#ed145b');
    //         rank_price_up = false;
    //         console.log('4');
    //         rank = 'price';
    //         init(1);
    //     }

    // });


    //获取用户id
    var userid = '';
    if (name_on) {
        console.log(name_on);
        $.ajax({
            type: 'get',
            url: '../api/goodListCartGetUid.php',
            async: true,
            data: {
                phone: name_on
            },
            success: function (str) {
                console.log(str);
                var arr = JSON.parse(str);
                console.log(arr);
                userid = arr[0].uid;
                console.log(userid);
                //如果购物车数据库里，没有这个商品，添加信息
                //如果购物车数据库里，有这个商品，数量加一
            }
        });
    }

    //鼠标点击按钮，加入购物车
    //1，获取商品id，查询相关数据
    //2，将商品相关数据和用户id，写入购物车信息表
    $('#goods_box_in').on('click', '.btn_cart', function () {
        // var id0 = ev.target.parentNode.getAttribute("data-id");
        var id = $(this).parents('li').attr('data-id');
        console.log(id);
        console.log('toCart');
        var p = new Promise(function (sucfn) { //写异步请求的代码
            $.ajax({
                type: "get",
                url: "../api/goodListCartGet.php",
                async: true,
                data: {
                    gid: id,
                },
                success: function (str) {
                    sucfn(str); //拿到数据就返回到then那里做处理：防止嵌套太多出现回调地狱
                }
            });
        });

        p.then(function (data) { //数据渲染写在then里面
            var arr = JSON.parse(data);
            //console.log(arr);
            var imgurl1 = arr[0].img_mid;
            //console.log(imgurl1);
            var title1 = arr[0].title_cn;
            //console.log(title1);
            var type1 = arr[0].type;
            //console.log(type1);
            var priceon1 = arr[0].price_on;
            //console.log(priceon1);
            var priceoff1 = arr[0].price_off;
            //console.log(priceoff1);
            var rest1 = arr[0].rest;
            //console.log(rest1);
            var address1 = arr[0].address;
            //console.log(address1);
            $.ajax({
                type: 'post',
                url: '../api/goodListCartAdd.php',
                async: true,
                data: {
                    uid: userid,
                    gid: id,
                    img_mid: imgurl1,
                    title_cn: title1,
                    type: type1,
                    price_on: priceon1,
                    price_off: priceoff1,
                    rest: rest1,
                    address: address1
                },
                success: function (str) {
                    if (!name_on) {
                        alert('请您先登录');
                    } else {
                        alert('加入成功~');
                    }
                    console.log(str);
                    return;
                }
            });
        });
    });



    // 鼠标点击商品，跳转到详情页
    //方案1：给需要跳转的图片、文字或者按钮分别设置自定义属性
    //方案2：给需要跳转的图片、文字或者按钮添加className，用parent()找li的自定义属性
    $('#goods_box_in').on('click', '.lis', function () {
        var id = $(this).parents('li').attr('data-id');
        // var id0 = ev.target.parentNode.getAttribute("data-id");
        console.log(id);
        var str = 'id=' + id;
        console.log(str);
        location.href = 'gooddetail.html?' + str;
    });

    //排行栏 吸顶效果
    // var top0 = $('#rank_nav').scrollTop();
    // console.log(top0);
    window.onscroll = function () {
        var scrollTop = window.scrollY;
        console.log(scrollTop);
        if (scrollTop >= 465) {
            $('#rank_nav').addClass('fix');
        } else {
            $('#rank_nav').removeClass('fix');
        }
    }


});