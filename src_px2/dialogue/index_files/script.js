$("#cont-btn-sendtest").on("click",(function(){window.getCsrfToken((function(n){$.ajax({url:"/apis/query.php",type:"post",dataType:"json",data:{CSRF_TOKEN:n},async:!0})}))}));
//# sourceMappingURL=script.js.map