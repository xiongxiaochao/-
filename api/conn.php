<?php
	
	//操纵数据库之前，先连接数据库,文件名不能取con，因为这是系统文件，不可用
	
	//1.准备参数
	$severname = 'localhost';
	$username = 'root';
	$password_l3 = '';
	$dbname = 'jumei';//数据库的名字，表格的上一级
	
	//2.创建链接
	$conn = new mysqli($severname,$username,$password_l3,$dbname);
	
	//如果出错提示错误信息
	// 检测连接
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    }
	
//	echo '连接成功';//用于检测数据库是否连接成功

	
	
//	$res->close();//关闭结果集
//	$conn->close();//关闭数据库连接
?>