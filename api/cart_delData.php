<?php
	//连接数据库
	include 'conn.php';

	//收到前端传过来的uid，gid，匹配到相应数据，用 修改这条数据的buy
	$uid = isset($_GET['uid']) ? $_GET['uid'] : '';
	$gid = isset($_GET['gid']) ? $_GET['gid'] : '';
	//$buy = isset($_GET['buy']) ? $_GET['buy'] : '';
	
	//写sql语句（在navicat编写测试无误，复制到php使用
	$sql = "DELETE FROM order1 WHERE gid =$gid AND uid=$uid";
	//$sql = "UPDATE orders SET buy=$buy WHERE gid =$gid AND uid=$uid";
    //echo $sql;
    
	//执行sql语句
	$res = $conn->query($sql);//insert update delete语句都是返回布尔值
	//var_dump($res);//边写边验证

	//返回执行状态
	if($res) {
		//成功
		echo 'yes';
	}else{
		//失败
		echo 'no';
	}
?>