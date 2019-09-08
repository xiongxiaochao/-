<?php 
    
    // $page = isset($_GET['page']) ? $_GET['page'] : '';
    // $num = isset($_GET['num']) ? $_GET['num'] : '15';
    // $paixu = isset($_GET['rank']) ? $_GET['rank'] : '';
    // $pagesMax = isset($_GET['pagesMax']) ? $_GET['pagesMax'] : '0';
    // $index = null;
    
    // include 'conn.php';

  

    // $index = ($page - 1) * $num;
    // $sql = "SELECT * FROM goods1 LIMIT $page,$num";

    // $res = $conn->query($sql);

    // $content = $res->fetch_all(MYSQLI_ASSOC);


    // $sql2 = 'SELECT * FROM goods1';

    // $res2 = $conn->query($sql2);


    // $data = array(
    //     'data' => $content,
    //     'pages' => $res2->num_rows,
    //     'page' => $page,
    //     'num' => $num
    // );

    // echo json_encode($data);

    //后端：接收参数，查询第一页的数据，给前端
	$page = isset($_GET['page']) ? $_GET['page'] : '';
	$num = isset($_GET['num']) ? $_GET['num'] : '';
	$rank = isset($_GET['rank']) ? $_GET['rank'] : '';
	$priceVal01 = isset($_GET['priceVal01']) ? $_GET['priceVal01'] : '';
	$priceVal02 = isset($_GET['priceVal02']) ? $_GET['priceVal02'] : '';
	$searchVal01 = isset($_GET['searchVal01']) ? $_GET['searchVal01'] : '';
	//连接数据库
	include 'conn.php';
	
	//写查询语句 
    /*
	 	SELECT * FROM datalist LIMIT 0,15;
	 	
	 	page   num   index    求的量：起始下标
	 	1      16     0-15      0 
	 	2      16     16-31    16
	 	3      16     32-47    32
	 	
	 	公式：index = (page-1) * num
    */
    
    $index = ($page - 1) * $num;
	//查询所有的数据，为了得到总条数
	$sql2 = 'SELECT * FROM goods1';
	
	//执行语句
	$res2 = $conn->query($sql2);
	$num_rows = $res2->num_rows;
	//先排序后取数据
	if($rank == 'price') {
		$sql = "SELECT * FROM goods1 ORDER BY price_on desc LIMIT $index,$num";
	}else if($rank == 'price2') {
		$sql = "SELECT * FROM goods1 ORDER BY price_on LIMIT $index,$num";
	}
	else if($rank == 'sales') {
		$sql = "SELECT * FROM goods1 ORDER BY sales desc LIMIT $index,$num";
	}else if($rank == 'popular') {
		$sql = "SELECT * FROM goods1 ORDER BY popular desc LIMIT $index,$num";
	}else if($rank == 'add_time') {
		$sql = "SELECT * FROM goods1 ORDER BY add_time desc LIMIT $index,$num";
	}else if($rank == 'special') {
		$sql = "SELECT * FROM goods1 where special = 'yes'";
	}else if($rank == 'price3') {
		// $sql = "SELECT * FROM books02 WHERE price BETWEEN $priceVal01 and $priceVal02 ORDER BY price LIMIT $index,$num";
		$sql = "SELECT * FROM goods1 WHERE price BETWEEN $priceVal01 and $priceVal02 ORDER BY price";
	}else if($rank == 'search') {
		//$sql = "SELECT * FROM books02 WHERE title like '%$searchVal01%'";
		$sql = "SELECT * FROM goods1 WHERE title like '%$searchVal01%'";
	}
	else if($num !== ''){
		$sql = "SELECT * FROM goods1 LIMIT $index,$num";
	}
	
	//执行语句
	$res = $conn->query($sql);//结果集
	
	//需求：要数据
	$content = $res->fetch_all(MYSQLI_ASSOC);
	if($rank == 'price3') {
		// echo $sql;
		$num_rows = $res->num_rows;
		$content = array_slice($content,$index,$num);
	}
	if($rank == 'search') {
		// echo $sql;
		$num_rows = $res->num_rows;
		$content = array_slice($content,$index,$num);
	}
	if($rank == 'special') {
		// echo $sql;
		$num_rows = $res->num_rows;
		$content = array_slice($content,$index,$num);
	}
	//传给前端
	//echo json_encode($content,JSON_UNESCAPED_UNICODE);
	
	
	
	//获取结果集的总条数即可
	//echo $res2->num_rows;
	
	//如果要传输多个数据，可以做成关联数组
	$datalist = array(
		'data' => $content,
		'total' => $num_rows,
		'total2' => $res->num_rows,
		'page' => $page,
		'num' => $num
	);
	
	echo json_encode($datalist);
?>




