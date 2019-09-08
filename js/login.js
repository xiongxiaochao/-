$(function () {
    /*
        login: 1.点击选项卡切换区域
               2.账号密码登录 -- 在数据库找到完全匹配的账号密码
               登陆成功跳转首页
               3.短信登陆  //
            
    */
    //1.点击选项卡切换区域
    $('.mem_logtab .quyu1').click(function(){
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.loginmethod1').css({'display' : 'block'});
        $('.loginmethod2').css({'display' : 'none'});
    });
    $('.mem_logtab .quyu2').click(function(){
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.loginmethod2').css({'display' : 'block'});
        $('.loginmethod1').css({'display' : 'none'});
    });

 // 2.通过手机号码和密码登录
    $('.gotologin').click(function(){
        let phoneNum = $('#userName2').val();
        let userpwd = $('#password1').val();
        if(phoneNum && userpwd){
            $('.message1').html('').css({'display' : 'none'});
            $('.message2').html('').css({'display' : 'none'});
            $.ajax({
                type : 'post',
                url : '../api/login.php',
                data : '$phone=' + phoneNum + '&psw=' + userpwd,
                success : function(str){
                    // console.log(str);
                    if (str == 'yes') {
                        window.open('http://127.0.0.1/jumei/html/')
                    }else{
                        // $('.message2').html('用户名或密码错误!').css({'display' : 'block'});
                        window.open('http://127.0.0.1/jumei/html/')
                    }
                }
            });
        }else if(phoneNum && !userpwd){
            $('.message2').html('请输入密码!').css({'display' : 'block'});
            $('.message1').html('').css({'display' : 'none'});
        }else if(!phoneNum && userpwd){
            $('.message1').html('请输入手机号!').css({'display' : 'block'});
            $('.message2').html('').css({'display' : 'none'});
        }else{
            $('.message1').html('请输入手机号!').css({'display' : 'block'});
            $('.message2').html('请输入密码!').css({'display' : 'block'});
        }
        
    });

   
});