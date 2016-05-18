$(document).ready(function(){	
    if (sessionStorage.getItem('Login') == "OK")
    {
    	$('#loginpagebtn').css("display", "none");
    }
    $('#loginbtn').on('click', function() {
		_data = {username:'admin', password:'password'}
		//var token = sessionStorage.getItem('accessToken')
           // var headers = {}
          //  if (token) {
            //    headers.Authorization = 'Bearer ' + token
            //}                                
            $.ajax({
                async:false,
                type: 'POST',
                url: $SCRIPT_ROOT + '/Login',
                //headers: headers,
                data: JSON.stringify(_data),
                dataType: 'json',
                contentType: 'application/json',
                success: function (result, str, xhr) {                                        
                    if(result.status == "OK") {
                        sessionStorage.setItem('Authorization', result.token);
                        sessionStorage.setItem('Login', result.status);                        
                    }
                },
                error: function (err, statusText, xhr) {                    
                    
                }
            });   
	});
});
