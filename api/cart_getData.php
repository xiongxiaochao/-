<?php
	//连接数据库
	include 'conn.php';
	
	//接收参数
	$uid = isset($_GET['uid']) ? $_GET['uid'] : '1';
	$address = isset($_GET['address']) ? $_GET['address'] : '聚美优品发货';
	
	//1.写sql语句
	$sql = "SELECT * FROM order1 WHERE uid=$uid and address='$address'";
	// $sql = "SELECT * FROM order1 WHERE uid=$uid";
	// $sql = "SELECT * FROM order1 WHERE address='$address'";

	//2.执行语句
	$res = $conn->query($sql);
	
	//var_dump($res);//结果集，想要内容
	
	//3.获取结果集里面的内容
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
	//var_dump($content);//结果集，想要内容
	echo json_encode($content);


?>