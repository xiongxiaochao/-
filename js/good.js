$(function () {
    // console.log('New Life!')

    // 验证用户是否已经登录
    let name_on = getCookie('username');
    // console.log(name_on);
    if (name_on) {
        $('.admin_on').css('display', 'block');
        $('.admin_off').css('display', 'none');
        $('.admin_on .name').html(name_on);
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

    //获取用户id
    var userid = '';
    // console.log(userid);
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
                //console.log(str);
                var arr = JSON.parse(str);
                //console.log(arr);
                userid = arr[0].uid;
                console.log(userid);
                //如果购物车数据库里，没有这个商品，添加信息
                //如果购物车数据库里，有这个商品，数量加一
            }
        });
    }

    //根据传过来的id获取数据并渲染商品盒子
    //修改搜索路径的内容
    // var gid = decodeURI(location.search).slice(1);
//     // console.log(gid)
    var data = decodeURI(location.search);
    console.log(data);
    var str = data.slice(1); //去掉多余的问号
    // console.log(str);
    var gid1 = '';
    //console.log(imgurl1);
    var imgurl1 = '';
    //console.log(imgurl1);
    var title1 = '';
    //console.log(title1);
    var type1 = '';
    //console.log(type1);
    var priceon1 = '';
    //console.log(priceon1);
    var priceoff1 = '';
    //console.log(priceoff1);
    var rest1 = '';
    //console.log(rest1);
    var address1 = '';
    //console.log(address1);

    function init() {
        console.log('666');
        $.ajax({
            type: 'get',
            url: '../api/gooddetail.php',
            async: true,
            data: str,
            success: function (str) {
                // console.log(str);
                //渲染数据
                create(str);
                //获取需要渲染到购物车的数据
                var arr2 = JSON.parse(str);
                // console.log(arr);
                gid1 = arr2[0].gid;
                // console.log(gid1);
                imgurl1 = arr2[0].img_mid;
                // console.log(imgurl1);
                title1 = arr2[0].title_cn;
                // console.log(title1);
                type1 = arr2[0].type;
                //console.log(type1);
                priceon1 = arr2[0].price_on;
                //console.log(priceon1);
                priceoff1 = arr2[0].price_off;
                //console.log(priceoff1);
                rest1 = arr2[0].rest;
                //console.log(rest1);
                address1 = arr2[0].address;
                //console.log(address1);

            }
        });
    };
    init();

    //渲染数据
    // console.log(str);
    function create(str) {
        var arr = JSON.parse(str);
        console.log(arr);
        console.log(arr[0]);

        //渲染数据
        var res = ` <div class="container">
        <div class="deal_main clearfix">
            <div class="deal_lt">

                <div id="MagnifierWrap2">
                    <div class="MagnifierMain">
                        <img class="MagTargetImg" src="../img/${arr[0].img_mid}" data-src="../img/${arr[0].img_mid}"> 
                    </div>
                    <span class="spe_leftBtn">&lt;</span>
                    <span class="spe_rightBtn">&gt;</span>
                    <div class="spec-items"> 
                        <ul>
                            <li class="on"><img src="../img/${arr[0].img_mid}" data-lsrc="../img/${arr[0].img_mid}" data-maxSrc="../img/${arr[0].img_mid}"></li>
                        </ul>
                    </div>
                </div>

                <div class="share">
                    <a href="">分享到 ></a>
                </div>
            </div>
            <div class="deal_rt">
                <div class="pro_title clearfix">
                    <div class="title_value">
                        <p class="chn_title">
                            ${arr[0].title_cn}
                        </p>
                        <p class="for_title">
                            ${arr[0].title_eng}
                        </p>
                    </div>
                    <div class="flag_box_main clearfix">
                        <img class="brand_pic" src="../img/${arr[0].brand_img}" alt="">
                        <ul>
                            
                        </ul>
                    </div>
                </div>
                <div class="in_hd">
                    <p class="introduce_cd">
                        ${arr[0].describe}
                    </p>
                </div>
                <div class="price_module">
                    <ul>
                        <li class="jm_p">
                            <em>￥</em>
                            <span class="jumei_price">${arr[0].price_on}</span>
                        </li>
                        <li class="mk_p">
                            参考价
                            <em>￥</em>
                            <span class="market_price">${arr[0].price_off}</span>
                        </li>
                        <li class="rule_price">
                            <span class="rmb_tax">价格详情 ></span>
                        </li>
                    </ul>
                </div>
                <div class="mail_policy">
                    <dl>
                        <dt>服务政策：</dt>
                        <dd></dd>
                    </dl>
                    <dl>
                        <dt>包邮政策：</dt>
                        <dd>本商品满299元或2件包邮（新疆部分区域除外）</dd>
                    </dl>
                </div>
                <dl class="clearfix shopping_special">
                    <dt class="spacing">
                        <span>型</span>号：
                    </dt>
                    <dd>
                        <a href="javascript:;">${arr[0].type}</a>
                    </dd>
                </dl>
                <div class="mall_btn" id="mall_btn">
                    <div id="shop_cart" href="">
                        <span class="btn">加入购物车</span>
                        <i></i>
                    </div>
                </div>
                <div class="buynum">
                    月销
                    <span class="num_red">${arr[0].sales}</span>
                </div>
            </div>
        </div>
        <div class="deal_prefer clearfix" id="deal_prefer">
            <div class="list rightborder">
                <div class="item_show"></div>
                <div class="item_desp"></div>
            </div>
            <div class="list rightborder">
                <div class="item_show"></div>
                <div class="item_desp"></div>
            </div>
            <div class="list rightborder">
                <div class="item_show"></div>
                <div class="item_desp"></div>
            </div>
            <div class="list last">
                <div class="item_show"></div>
                <div class="item_desp"></div>
            </div>
        </div>
    </div>`;
        $('#goodBox_in').html(res);
        $('.current span').html(arr[0].title_cn);
        //渲染完数据之后，引用放大镜
        MagnifierF("MagnifierWrap2");
    };

    //鼠标点击，加入购物车
    //鼠标点击按钮，加入购物车
    //1，获取商品id，查询相关数据
    //2，将商品相关数据和用户id，写入购物车信息表

    $('#goodsDetails').on('click', '#shop_cart', function () {
        // console.log(str);
        // var str = data.slice(1);
        var dataarra = str.slice(3);
        var dataprice = [str].price_on;
        // console.log(dataaarra);
        // console.log(dataprice);
        $.ajax({
            type: 'get',
            url: '../api/addCart.php',
            data: `goodid=${dataarra}`,
            dataType: 'json',
            success: function (response) {
                
            }
        })

    })
    $('#goodsDetails').on('click', '#shop_cart', function () {
        console.log(111)
        // location.href = 'cart.html?' + str;
        // console.log(str);
        // console.log('123');
        // if (!name_on) {
        //     alert('请您先登录~');
        // } else {
        //     $.ajax({
        //         type: 'post',
        //         url: '../api/goodListCartAdd.php',
        //         async: true,
        //         data: {
        //             uid: userid,
        //             gid: gid1,
        //             img_mid: imgurl1,
        //             title_cn: title1,
        //             type: type1,
        //             price_on: priceon1,
        //             price_off: priceoff1,
        //             rest: rest1,
        //             address: address1
        //         },
        //         success: function (str) {
        //             alert('加入成功~');
        //             console.log(str);
        //             return;
        //         }
        //     });
        // // }

    });
    // console.log('1989');

});