<?php
	//连接数据库
	include 'conn.php';

	// $gid = isset($_GET['gid']) ? $_GET['gid'] : '';
	
	//写sql语句（在navicat编写测试无误，复制到php使用
    // $sql = "DELETE FROM order1 WHERE gid =$gid AND uid=$uid";
    $sql = "SELECT * FROM goods1 LIMIT 0,6";
    //echo $sql;
    
	//执行sql语句
	$res = $conn->query($sql);//insert update delete语句都是返回布尔值
	//var_dump($res);//边写边验证

	//获取结果集里面的内容
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
	//var_dump($content);//结果集，想要内容
	echo json_encode($content);
?>