class Member {
    #charactor;

    constructor(charactor) {
        this.#charactor = charactor;
    }

    ask (params) {
        $.ajax({
            'url': './index_files/apis/query.php',
            "type": "post",
            "dataType": "json",
            "data": {
                "main-theme": params.mainTheme,
                "CSRF_TOKEN": $('meta[name=csrf-token]').attr('content'),
            },
            "async": true,
        });
        return;
    }
}
export default Member;
