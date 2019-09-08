<?php

    include 'conn.php';

    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $psd = isset($_POST['psd']) ? $_POST['psd'] : '';
 // echo $name,$pwd;

 $sql = "SELECT * FROM user1 WHERE phone ='$phone' AND psd='$psd'";

 //执行语句
 $res = $conn->query($sql);

 //查询到数据就是能登陆
 if($res->num_rows) {
     //查到数据：允许登陆
     echo 'yes';
 }else{
     echo 'no';
 }

 //关闭连接
 $res->close();
 $conn->close();

?>