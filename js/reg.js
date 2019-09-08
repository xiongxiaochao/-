$(function () {

    //清除面子
    $('.inpBtn').click(function () {
        $('.popBoxWrapper').css('display', 'none');
    });

    //清空输入框
    $('#verifyMobileForm').on('click', '.clear_btn', function () {
        // $(this).val('');
        // console.log($('this').prev());
        $(this).prev().val('');
        $(this).parent().next().html('');
    });

    // 手机验证
    $('#tel').blur(function () {
        let phoneval = $(this).val();
        let reg = /([1][358][0-9]{9})|([1][4][37][0-9]{8})|([1][7][01367])/; //手机号码正则

        if (phoneval) { //非空
            let regsure = reg.test(phoneval);
            if (regsure) {
                ajax2({
                    type: 'get',
                    url: '../api/reg.php',
                    data: 'telphone=' + phoneval,
                    success: function (str) {
                        if (str == 'yes') {
                            $('.fieldset1').html('验证通过').css('color', '#58bc58');
                            $
                        } else {
                            $('.fieldset1').html('该用户名太受欢迎啦').css('color', 'red');
                        }
                    }
                })
                // let checkphone = new Promise(function (resolved) {
                //     $.ajax({ //检查数据库是否存在
                //         type: 'get',
                //         url: '../api/reg.php',
                //         data: 'telphone=' + phoneval,
                //         success: function (str) {
                //             resolved(str);
                //         }
                //     });
                // });
                // checkphone.then(function (str) {
                //     if (str == 'yes') {
                //         $('.fieldset1').html('验证通过').css('color', '#58bc58');

                //     } else {
                        
                //     }
                // })
            } else {
                $('.fieldset1').html('手机号码格式错误！').css('color', 'red');
            }
        }else {
            $('.fieldset1').html('请输入手机号码？').css('color', 'red');
        }
    })


})