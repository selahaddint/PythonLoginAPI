$(document).ready(function(){            

    $('#registerform').validate({
            rules: {
               password: { 
                 required: true,
                    minlength: 6,
                    maxlength: 10,

               } , 

                   cfmPassword: { 
                    equalTo: "#password",
                     minlength: 6,
                     maxlength: 10
               }
           },
           messages: {
               password: { 
                     required:"the password is required"

               }
           },
           errorPlacement: function(label, element) {               
               label.addClass('arrow');
               label.insertAfter(element);
           }
    });
    $('#loginForm').validate({            
           errorPlacement: function(label, element) {               
               label.addClass('arrow');
               label.insertAfter(element);
           }
    });

	$('#loginbtn').on('click', function() {
      if ($("#loginForm").valid()) {        
		_data = {
             Username : $('#lmail').val(),
             Password : $('#lpassword').val()
        }		                      
        $.ajax({
                async:false,
                type: 'POST',
                url: $SCRIPT_ROOT + '/api/Login',
                //headers: headers,
                data: JSON.stringify(_data),
                dataType: 'json',
                contentType: 'application/json',
                success: function (result, str, xhr) {
                    if(result.status == "OK") {
                        sessionStorage.setItem('Authorization', result.token);
                        sessionStorage.setItem('Login', result.status);
                        $('#loginForm').attr("action", '/');
                    }
                },
                error: function (err, statusText, xhr) {
                }
            });
            //window.location.href='http://localhost:5000/index';
        }
	});

    $('#createUser').on('click', function() {
        if ($("#registerform").valid()) {
        _data = {
                 Name : $('#user_name').val(), 
                 Username : $('#user_email').val(), 
                 Password : $('#password').val(),
                 Phone : $('#user_phone_number').val(),
                 Country : $('#country').val()
                };

        $.ajax({
                async:false,
                type: 'POST',
                url: $SCRIPT_ROOT + '/api/Users/Post',
                //headers: headers,
                data: JSON.stringify(_data),
                dataType: 'json',
                contentType: 'application/json',
                success: function (result, str, xhr) {                     
                   this.submit();                   
                },
                error: function (err, statusText, xhr) { 
                    if(err.status == '400')
                      alert("This User name is active.")
                }
            });
        return false;
       }
    });

    $("#toregisterbtn").on('click', function() {    	
    	$("#loginformdiv").css("display","none")
    	$("#registerformdiv").css("display","")
    });    
        
    $('#user_password').on('change', function() {
        if($(this).val() != $('#user_password_confirm').val()) 
       {
          $('#user_password_confirm').setCustomValidity("Passwords Don't Match");
       } 
       else 
       {
          $('#user_password_confirm').setCustomValidity('');
       }
    });
    $('#user_password_confirm').on('change', function() {
        if($('#user_password').val() != $(this).val()) 
       {
          $(this).setCustomValidity("Passwords Don't Match");
       } 
       else 
       {
          $(this).setCustomValidity('');
       }
    });    
    var option = new Option('Chose...', "", true, true);
    $('#country').append(option);                    
    var option = new Option("Turkey", "TR", true, false);
    $('#country').append(option);
    var option = new Option("ABD", "ABD", true, false);
    $('#country').append(option);

    $('#country').trigger('change');   
});
