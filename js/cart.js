$(function () {


    var gid = decodeURI(location.search).slice(1);
    console.log(gid)
    function init() {
        $.ajax({
            type: 'get',
            url: '../api/cart.php',
            data: '&gid=' + gid,
            success: function (str) {
                let html = `<ul class="order_lists">
                <li class="list_chk">
                    <input type="checkbox" id="checkbox_1" class="son_check">
                    <label for="checkbox_1"></label>
                </li>
                <li class="list_con">
                    <div class="list_img"><a href="javascript:;"><img src="../img/${arr[0].img_mid}" alt=""></a></div>
                    <div class="list_text"><a href="javascript:;">${arr[0].title_cn}</a></div>
                </li>
                <li class="list_info">
                    <p>规格：${arr[0].type}克</p>
                    <p>尺寸：16*16*3(cm)</p>
                </li>
                <li class="list_price">
                    <p class="price">￥${arr[0].price_on}</p>
                </li>
                <li class="list_amount">
                    <div class="amount_box">
                        <a href="javascript:;" class="reduce reSty" title="${arr[0].gid}">-</a>
                        <input type="text" value="${takenum}" class="sum">
                        <a href="javascript:;" class="plus" title="${arr[0].gid}">+</a>
                    </div>
                </li>
                <li class="list_sum">
                    <p class="sum_price">￥${arr[0].price_off}</p>
                </li>
                <li class="list_op">
                    <p class="del"><a href="javascript:;" class="delBtn" title="${arr[0].gid}">移除商品</a></p>
                </li>
            </ul>`;
            }
        })
        var order_content = document.getElementsByClassName("order_content")[0];
        order_content.innerHTML = order_content.innerHTML + html;

    //     var $allCheckbox = $('input[type="checkbox"]'), //全局的全部checkbox
    //         $wholeChexbox = $('.whole_check'),
    //         $cartBox = $('.cartBox'), //每个商铺盒子
    //         $shopCheckbox = $('.shopChoice'), //每个商铺的checkbox
    //         $sonCheckBox = $('.son_check'); //每个商铺下的商品的checkbox
    //     $allCheckbox.on("click", function () {
    //         if ($(this).is(':checked')) {
    //             $(this).next('label').addClass('mark');
    //         } else {
    //             $(this).next('label').removeClass('mark')
    //         }
    //     });


    //     $wholeChexbox.on("click", function () {
    //         var $checkboxs = $cartBox.find('input[type="checkbox"]');
    //         if ($(this).is(':checked')) {
    //             $checkboxs.prop("checked", true);
    //             $checkboxs.next('label').addClass('mark');
    //         } else {
    //             $checkboxs.prop("checked", false);
    //             $checkboxs.next('label').removeClass('mark');
    //         }
    //         totalMoney();
    //     });


    //     $sonCheckBox.each(function () {
    //         $(this).on("click", function () {
    //             if ($(this).is(':checked')) {
    //                 //判断：所有单个商品是否勾选
    //                 var len = $sonCheckBox.length;
    //                 var num = 0;
    //                 $sonCheckBox.each(function () {
    //                     if ($(this).is(':checked')) {
    //                         num++;
    //                     }
    //                 });
    //                 if (num == len) {
    //                     $wholeChexbox.prop("checked", true);
    //                     $wholeChexbox.next('label').addClass('mark');
    //                 }
    //             } else {
    //                 //单个商品取消勾选，全局全选取消勾选
    //                 $wholeChexbox.prop("checked", false);
    //                 $wholeChexbox.next('label').removeClass('mark');
    //             }
    //         })
    //     })


    //     $shopCheckbox.each(function () {
    //         $(this).on("click", function () {
    //             if ($(this).is(':checked')) {
    //                 //判断：店铺全选中，则全局全选按钮打对勾。
    //                 var len = $shopCheckbox.length;
    //                 var num = 0;
    //                 $shopCheckbox.each(function () {
    //                     if ($(this).is(':checked')) {
    //                         num++;
    //                     }
    //                 });
    //                 if (num == len) {
    //                     $wholeChexbox.prop("checked", true);
    //                     $wholeChexbox.next('label').addClass('mark');
    //                 }

    //                 //店铺下的checkbox选中状态
    //                 $(this).parents('.cartBox').find('.son_check').prop("checked", true);
    //                 $(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
    //             } else {
    //                 //否则，全局全选按钮取消对勾
    //                 $wholeChexbox.prop("checked", false);
    //                 $wholeChexbox.next('label').removeClass('mark');

    //                 //店铺下的checkbox选中状态
    //                 $(this).parents('.cartBox').find('.son_check').prop("checked", false);
    //                 $(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
    //             }
    //             totalMoney();
    //         });
    //     });

    //     //店铺$sonChecks有一个未选中，店铺全选按钮取消选中，若全都选中，则全选打对勾
    //     $cartBox.each(function () {
    //         var $this = $(this);
    //         var $sonChecks = $this.find('.son_check');
    //         $sonChecks.each(function () {
    //             $(this).on("click", function () {
    //                 if ($(this).is(':checked')) {
    //                     //判断：如果所有的$sonChecks都选中则店铺全选打对勾！
    //                     var len = $sonChecks.length;
    //                     var num = 0;
    //                     $sonChecks.each(function () {
    //                         if ($(this).is(':checked')) {
    //                             num++;
    //                         }
    //                     });
    //                     if (num == len) {
    //                         $(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
    //                         $(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
    //                     }

    //                 } else {
    //                     //否则，店铺全选取消
    //                     $(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
    //                     $(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
    //                 }
    //                 totalMoney();
    //             });
    //         });
    //     });


    //     var $plus = $('.plus'),
    //         $reduce = $('.reduce'),
    //         $all_sum = $('.sum');
    //     $plus.on("click", function () {
    //         var $inputVal = $(this).prev('input'),
    //             $count = parseInt($inputVal.val()) + 1,
    //             $obj = $(this).parents('.amount_box').find('.reduce'),
    //             $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
    //             $price = $(this).parents('.order_lists').find('.price').html(), //单价
    //             $priceTotal = $count * parseInt($price.substring(1));
    //         $inputVal.val($count);
    //         $priceTotalObj.html('￥' + $priceTotal);
    //         if ($inputVal.val() > 1 && $obj.hasClass('reSty')) {
    //             $obj.removeClass('reSty');
    //             $(this).parents('.order_lists').find('.son_check').next('label').addClass('mark');
    //             $(this).parents('.order_lists').find('.son_check').prop("checked", true);
    //         }
    //         totalMoney();
    //     });

    //     $reduce.on("click", function () {
    //         var $inputVal = $(this).next('input'),
    //             $count = parseInt($inputVal.val()) - 1,
    //             $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
    //             $price = $(this).parents('.order_lists').find('.price').html(), //单价
    //             $priceTotal = $count * parseInt($price.substring(1));
    //         if ($inputVal.val() > 1) {
    //             $inputVal.val($count);
    //             $priceTotalObj.html('￥' + $priceTotal);
    //         }
    //         if ($inputVal.val() == 1 && !$(this).hasClass('reSty')) {
    //             $(this).addClass('reSty');
    //             $(this).parents('.order_lists').find('.son_check').next('label').addClass('mark');
    //         }
    //         totalMoney();
    //     });

    //     $all_sum.blur(function () {
    //         var $count = 0,
    //             $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
    //             $price = $(this).parents('.order_lists').find('.price').html(), //单价
    //             $priceTotal = 0;

    //         if ($(this).val() == '' || $(this).val() == '0') {
    //             $(this).val('1');
    //         }
    //         $(this).val($(this).val().replace(/\D|^0/g, ''));
    //         $count = $(this).val();
    //         $priceTotal = $count * parseInt($price.substring(1));
    //         $(this).attr('value', $count);
    //         $priceTotalObj.html('￥' + $priceTotal);
    //         $(this).parents('.order_lists').find('.son_check').next('label').addClass('mark');
    //         $(this).parents('.cartBox').find('.son_check').prop("checked", true);
    //         totalMoney();
    //     })


    //     var $order_lists = null;
    //     var $order_content = '';
    //     $('.delBtn').on("click", function () {
    //         $order_lists = $(this).parents('.order_lists');
    //         $order_content = $order_lists.parents('.order_content');
    //         $('.model_bg').fadeIn(300);
    //         $('.my_model').fadeIn(300);
    //     });

    //     //关闭模态框
    //     $('.closeModel').on("click", function () {
    //         closeM();
    //     });
    //     $('.dialog-close').click(function () {
    //         closeM();
    //     });

    //     function closeM() {
    //         $('.model_bg').fadeOut(300);
    //         $('.my_model').fadeOut(300);
    //     }
    //     //确定按钮，移除商品
    //     $('.dialog-sure').on("click", function () {
    //         console.log(this)
    //         $order_lists.remove();
    //         if ($order_content.html().trim() == null || $order_content.html().trim().length == 0) {
    //             $order_content.parents('.cartBox').remove();
    //         }
    //         closeM();
    //         $sonCheckBox = $('.son_check');
    //         totalMoney();
    //     })


    //     function totalMoney() {
    //         var total_money = 0;
    //         var total_count = 0;
    //         var calBtn = $('.calBtn a');
    //         $sonCheckBox.each(function () {
    //             if ($(this).is(':checked')) {
    //                 var goods = parseInt($(this).parents('.order_lists').find('.sum_price').html().substring(1));
    //                 var num = parseInt($(this).parents('.order_lists').find('.sum').val());
    //                 total_money += goods;
    //                 total_count += num;
    //             }
    //         });
    //         $('.total_text').html('￥' + total_money);
    //         $('.piece_num').html(total_count);

    //         // console.log(total_money,total_count);

    //         if (total_money != 0 && total_count != 0) {
    //             if (!calBtn.hasClass('btn_sty')) {
    //                 calBtn.addClass('btn_sty');
    //             }
    //         } else {
    //             if (calBtn.hasClass('btn_sty')) {
    //                 calBtn.removeClass('btn_sty');
    //             }
    //         }
    //     }
    //     $(".order_lists").on("click", ".reduce", function () {

    //         var carnum = $(this).next().val()

    //         var gidcarnum = $(this).attr("title")
    //         // console.log(gidcarnum)         
    //         $.ajax({
    //             type: 'GET',
    //             url: '../api/changecarnum.php',
    //             data: "&name=" + name + "&num=" + carnum + "&gid=" + gidcarnum,

    //             success: function (str) {
    //                 // console.log(str)        

    //             }
    //         })
    //     })

    //     $(".order_content").on("click", ".plus", function () {

    //         var carnum = $(this).prev().val();
    //         var gidcarnum = $(this).attr("title")
    //         console.log(carnum)
    //         console.log(gidcarnum)
    //         $.ajax({
    //             type: 'GET',
    //             url: '../api/changecarnum.php',
    //             data: "&name=" + name + "&num=" + carnum + "&gid=" + gidcarnum,

    //             success: function (str) {
    //                 // console.log(str)        

    //             }
    //         })
    //     })

    //     $(".order_content").on("click", ".delBtn", function () {
    //         var gidcarnum = $(this).attr("title")
    //         $.ajax({
    //             type: 'GET',
    //             url: '../api/delcargid.php',
    //             data: "&name=" + name + "&gid=" + gidcarnum,

    //             success: function (str) {
    //                 // console.log(str)        

    //             }
    //         })


    //     })
    //     //全局的checkbox选中和未选中的样式
    // }

})