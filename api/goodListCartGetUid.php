<?php
	//后端：接收参数，查询第一页的数据，给前端
	$phone = isset($_GET['phone']) ? $_GET['phone'] : '18812123434';
	//连接数据库
	include 'conn.php';
	
	//写查询语句 
    //在navicat写语句查询
	$sql = "SELECT * FROM user1 where phone=$phone";
    
	//执行语句
	$res = $conn->query($sql);//结果集

	//需求：要数据
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
	//传给前端
	echo json_encode($content);
	
?>