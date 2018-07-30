var REQUESTER = REQUESTER || (function(url) {
    var _args = {};
    
    return {
        init : function(Args) {
            _args = Args;
        },
        request : function() {
            jQuery('form').submit(function (e) {
                jQuery.ajax({
                    type: "POST",
                    url: _args[0],
                    data: jQuery('form').serialize(), // serializes the form's elements.
                    success: function (data) {
                        console.log(data)  // display the returned data in the console.
                    }
                });
                e.preventDefault(); // block the traditional submission of the form.
            });
            // Inject our CSRF token into our AJAX request.
            jQuery.ajaxSetup({
                beforeSend: function(xhr, settings) {
                    if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                        xhr.setRequestHeader("X-CSRFToken", _args[1])
                    }
                }
            })
        }
    }
}());
