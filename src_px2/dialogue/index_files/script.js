$('#cont-btn-sendtest').on('click', ()=>{
    window.getCsrfToken((csrfToken)=>{
        $.ajax({
            'url': '/apis/query.php',
            "type": "post",
            "dataType": "json",
            "data": {
                "CSRF_TOKEN": csrfToken,
            },
            "async": true,
        });
    });
});