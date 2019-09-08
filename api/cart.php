<?php

    //接收用户名和密码，把注册信息保存在数据库

    $gid = isset($_POST['gid']) ? $_POST['gid'] : '';

    // echo $name,$pwd;
    include 'conn.php';//连接数据库
    $sql = "SELECT * from order1 gid='$gid'";
    $res = $conn->query($sql);
    $content = $res->fetch_all(MYSQLI_ASSOC);
    if($res->num_rows){
        //满足就更新
        $anum = $content[0]['num'] + $num;
        $sql = "UPDATE cart SET num=$anum WHERE gid='$gid' AND username='$name'";
        $res = $conn->query($sql);
    }else{
        //没有就插入表
        $sql = "INSERT INTO cart (username,gid,num) VALUES('$name','$gid','$num')";
        //执行语句
        $res2 = $conn->query($sql);
    };

  
    if($res||$res2){
        echo 'yes';
    }else{
        echo 'no';
    }
    
//    if($res1) {
         
//     }else{
//         echo 'no';//插入失败
//     };
//     //关闭连接
//     if($res2) {
//         echo 'yes';//插入成功
//     }else{
//         echo 'no';//插入失败
//     };
    
?>