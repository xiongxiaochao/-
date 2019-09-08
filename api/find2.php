<?php
    //连接数据库
    include 'conn.php';

    //接收前端传过来的参数、
    $name = isset($_POST['name']) ? $_POST['name'] : '';

    $psw = isset($_POST['psw']) ? $_POST['psw'] : '';
    //在navicat写sql语句，检测通过后复制到php再执行
    $sql = "SELECT * FROM user2 WHERE psw='$psw' and name='$name'";
    //  echo $sql;
    // echo $phone;

    //2.执行语句
    $res = $conn->query($sql);//得到结果集
  

    if($res->num_rows) {
		//找到了，已存在，不给注册
		echo 'no';
	}else {
		echo 'yes';
	}
?>