$('#cont-btn-sendtest').on('click', ()=>{
    $.ajax({
        'url': '/apis/query.php',
        'type': 'post',
    })
});