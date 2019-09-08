<?php
        header('content-type:text/html;charset=utf-8');
        include 'conn.php';
    
        $uid = isset($_POST['uid']) ? $_POST['uid'] : '1';
        $gid = isset($_POST['gid']) ? $_POST['gid'] : '2';
        $img_mid = isset($_POST['img_mid']) ? $_POST['img_mid'] : '3';
        $title_cn = isset($_POST['title_cn']) ? $_POST['title_cn'] : '4';
        $type = isset($_POST['type']) ? $_POST['type'] : '5';
        $price_on = isset($_POST['price_on']) ? $_POST['price_on'] : '6';
        $price_off = isset($_POST['price_off']) ? $_POST['price_off'] : '7';
        $rest = isset($_POST['rest']) ? $_POST['rest'] : '8';
        $address = isset($_POST['address']) ? $_POST['address'] : '8';
        //插入的数据最好用单引号包裹
        $sql = "INSERT INTO order1 (`uid`, `gid`,`img_mid`, `title_cn`,`type`,`price_on`,`price_off`,`rest`,`buy`,`address`) VALUES ('$uid', '$gid','$img_mid','$title_cn','$type','$price_on','$price_off','$rest',1,'$address')";

        $sql_a = "SELECT * FROM order1 WHERE uid = $uid and gid = $gid";
        
        $res_a = $conn->query($sql_a);
        
        //判断购物车信息表，是否存在这个商品
        //如果存在数量加一。如果不存在，添加信息
        if($res_a->num_rows){
            $count_a = "UPDATE order1 SET `buy`=`buy`+1 WHERE `uid` = $uid and gid = $gid";
            $conn->query($count_a);
            echo 'success!';
        }else{
            $res = $conn->query($sql);
            if($res){
                echo 'yes';
            }else{
                echo 'no';
            }
        }
        
    
?>