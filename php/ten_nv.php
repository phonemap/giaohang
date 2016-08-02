<?php
	header('Access-Control-Allow-Origin: *'); 
	include("lay.php");
	
	//if (is_ajax()) {
	if (isset($_POST["id"])) { //Checks if action value exists

	$action = $_POST["id"];
	
    $q_id=mysqli_query($conn,"select TenNV from nhanvien where MaNV in (select MaNV from taikhoan where IdTK = '".$action."')");
	
	$q_nv=mysqli_query($conn,"select giao_chua from donhang where MaDH in (select MaDH from phancong where MaNV in (select MaNV from taikhoan where IdTK = '".$action."'))");
	
	$ten = mysqli_fetch_row($q_id);// xuất tên
	mysqli_free_result($q_id);
	
	$count = 0; //xuất số đơn hàng đã giao
	while($row=mysqli_fetch_row($q_nv)){
		if($row == 1) $count++;
	}
	$chua = mysqli_num_rows($q_nv)-$count;//xuất số đơn hàng còn lại
	mysqli_free_result($q_nv);
	$data = array(
	'ten' => $ten[0],
	'giao' => $count,
	'chua' => $chua
	);
	echo json_encode($data);
  }
//}

//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

mysqli_close($conn);


?>