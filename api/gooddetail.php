<?php
	
	// $gid = isset($_GET['gid']) ? $_GET['gid'] : '';
	// //连接数据库
	// include 'conn.php';
	
	// //写查询语句 
	// //在navicat写语句查询
	// // $sql = "SELECT * FROM hecha WHERE gid = $gid";
	// $sql = "SELECT * FROM goods1 WHERE gid = $gid";
	// // echo $sql;
    
	// //执行语句
	// $res = $conn->query($sql);//结果集
	// // var_dump($sql);
    
    
	// //需求：要数据
	// $content = $res->fetch_all(MYSQLI_ASSOC);
	// // var_dump($content);
	// // echo $content;

	// $data = array(
	// 	'data' => $content,
	// );
	// //传给前端
	// echo json_encode($content);

	// // 关闭连接
    // $res->close();//关闭结果集
	// $conn->close();//关闭数据库
	
	//后端：接收参数，查询第一页的数据，给前端
	$id = isset($_GET['id']) ? $_GET['id'] : '2';
	//连接数据库
	include 'conn.php';
	
	//写查询语句 
    //在navicat写语句查询
	$sql = "SELECT * FROM goods1 where gid=$id";
    
	//执行语句
	$res = $conn->query($sql);//结果集
    
    
	//需求：要数据
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
	//传给前端
	echo json_encode($content);
	
?>