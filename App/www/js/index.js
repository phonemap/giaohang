var id;

function login(){
	doc_taikhoan();
	doc_nv();
	doc_donhang();
}

function doc_taikhoan(){
	$('#idtrong').hide();$('#passsai').hide();$('#idsai').hide();
	var url="http://localhost/php/json.php";
	id=document.getElementById('user').value;
	var pass = document.getElementById('pass').value;
	(jQuery).ajax({
		type: "POST",
		url: url,
		data: {IdTK:id,Password:pass},
		success: function(data){	
			console.log(data);
			if(id == "")
				$('#idtrong').show();
			else {
				if(data == 0){
					$('#one').hide();
					$('#two').show();
					$.mobile.changePage("#two", "slideup");
				}	
				if(data == 1)	$('#passsai').show();	
				if(data == 2)	$('#idsai').show();
			}	
		},
		error: function(error){
			console.log(error);
		}
	});
}

function doc_nv(){
	var url="http://localhost/php/ten_nv.php";
	(jQuery).ajax({
		dataType: 'json',
		type: "POST",
		url: url,
		data: {id},
		success: function(data){
			console.log(data);
			console.log(data.ten);
			console.log(data.giao);
			console.log(data.chua);
			$("#ten_nv").html(data.ten);
			$("#dagiao").html(data.giao);
			$("#conlai").html(data.chua);
		},
		error: function(error){
			console.log(error);
		}
		
	});
}

function doc_donhang(){
	var url="http://localhost/php/donhang.php";
	(jQuery).ajax({
		dataType: 'json',
		type: "POST",
		url: url,
		data: {id},
		success: function(data){
			console.log(data);
			$.each(data, function (i,json) {
				console.log(json);
                var list = "<li><a><form><label><strong>Người nhận: &nbsp;</strong>" + json.ten_nguoi_nhan +"<p> <strong> Vị trí giao: &nbsp;</strong>" + json.vitri + "</p></label></form></a></li>";
                $('#list_donhang').append(list);
				// var list = "<li><a href='#'><strong>Người nhận: &nbsp;</strong>" + json.ten_nguoi_nhan +"<p> <strong> Vị trí giao: &nbsp;</strong>" + json.vitri + "</p></a></li>";
            })
		},
		error: function(error){
			console.log(error);
		},
		complete: function(){
			$('#list_donhang').listview('refresh');
		}
		
	});
}

function create_array(m,n){
	var arr = new array(m);
	for(var i = 0; i<m ; i++){
		arr[i] = new array(n);
	}
	return arr;
}

function chitiet(){
	$.mobile.changePage("#three", "slideup");
}

//map google

function initialize() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    latlon = new google.maps.LatLng(lat, lon)
    var mapProp = {
    center:latlon,
    zoom:5,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("map"),mapProp);
    var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
    }
}

google.maps.event.addDomListener(window, 'load', initialize);

