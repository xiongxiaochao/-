<?php

    $telphone = isset($_POST['telphone']) ? $_POST['telphone'] : '';
    // 18812123434
	include 'conn.php';
	//在navicat写sql语句，检测通过后复制到php再执行
	$sql = "SELECT * FROM user1 WHERE phone='$telphone'";
	// echo $sql;//边写边验证

	// echo $sql;
	//2.执行语句
	$res = $conn->query($sql);//得到结果集
	
	//var_dump($res);
	//3.查找得到，就是可以登陆
	if($res->num_rows) {
		//找到了，存在就可以登陆
		echo 'no';
	}else {
		echo 'yes';
	}

?>