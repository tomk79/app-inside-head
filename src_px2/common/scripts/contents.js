(function(){
<?php
print (new \tomk79\pickles2\px2dthelper\main($px))->document_modules()->build_js();
?>
})();

window.getCsrfToken = function(callback){
    $.ajax({
        url: "/apis/get_csrf_token.php",
        success: function(data){
			callback(data.csrf_token);
        },
    });
}
