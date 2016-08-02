<?php
header('Access-Control-Allow-Origin: *'); 

include("lay.php");

//if (is_ajax()) {
  if (isset($_POST["IdTK"]) && !empty($_POST["IdTK"])) { //Checks if action value exists
    $action = $_POST["IdTK"];
	$actionps = $_POST["Password"];
	$q_id=mysqli_query($conn,"select IdTK from taikhoan where IdTK = '".$action."'");
	$q_pass=mysqli_query($conn,"select Password from taikhoan where IdTK = '".$action."' and Password = '".$actionps."'");
	$id = mysqli_fetch_object($q_id);
	$pass = mysqli_fetch_object($q_pass);
	if (isset($id)){
		if(isset($pass)){
			echo 0;
		}else echo 1;
	}else echo 2;
	mysqli_free_result($q_id);
	mysqli_free_result($q_pass);
  }
//}

//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

mysqli_close($conn);

?>