//Submit data when enter key is pressed
        /*$('#user_name').keydown(function(e) {
        	var name = $('#user_name').val();
            if (e.which == 13 && name.length > 0) { //catch Enter key
                $('#nameInput').hide();
           		$('#response').html("loading...");
            	//POST request to API to create a new visitor entry in the database
                $.ajax({
				  method: "POST",
				  url: "./api/visitors",
				  contentType: "application/json",
				  data: JSON.stringify({name: name })
				})
                .done(function(data) {
                    $('#response').html(AntiXSS.sanitizeInput(data));
                    getNames();
                });
            }
        });*/

        //Retreive all the visitors from the database
        function getNames(){
          $.get("api/visitors")
              .done(function(data) {
                  if(data.length > 0) {
                    data.forEach(function(element, index) {
                      data[index] = AntiXSS.sanitizeInput(element)
                    });
                    $('#databaseNames').html("Database contents: " + JSON.stringify(data));
                  }
              });
          }

          //Call getNames on page load.
          getNames();

