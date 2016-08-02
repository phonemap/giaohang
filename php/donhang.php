<?php 
header('Access-Control-Allow-Origin: *'); 
include("lay.php");

//if (is_ajax()) {
  if (isset($_POST["id"])) { //Checks if action value exists
    $action = $_POST["id"];
	
	$q_dh=mysqli_query($conn,"select ten_nguoi_nhan,vitrigiao from chitietdh where MaDH in (select MaDH from phancong where MaNV in (select MaNV from taikhoan where IdTK = '".$action."'))");
	
	$data=array();
	while($row=mysqli_fetch_row($q_dh)){
		$data[]= array(
			'ten_nguoi_nhan' => $row[0],
			'vitri' => $row[1]
		);
	}
	echo json_encode($data);
	mysqli_free_result($q_dh);
  }
//}

//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

mysqli_close($conn);

?>
