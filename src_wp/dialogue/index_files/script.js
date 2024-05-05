$('#cont-btn-sendtest').on('click', ()=>{
    const inputMainTheme = $('textarea[name="main-theme"]').val();
console.log(inputMainTheme);
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