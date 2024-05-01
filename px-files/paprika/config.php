<?php
/**
 * Paprika `config.php`
 */
return call_user_func( function(){

    // initialize

    /** コンフィグオブジェクト */
    $conf = new stdClass;

    // ログ関連

    /** ログ出力先ディレクトリ */
    $conf->realpath_log_dir = __DIR__.'/logs/';

    /** 
     * 出力するログレベル
     * ここに指定したレベル以上の情報がログファイルに出力されます。
     * none, fatal, error, warn, info, debug, trace, all のいずれかを指定できます。
     * デフォルトは all レベルです。
     */
    $conf->log_reporting = 'warn';

    // Plugins
    $conf->prepend = [
        function($paprika){
            // プラグイン処理1
        },
        function($paprika){
            // プラグイン処理2
        },
    ];

    // -------- Project Custom Setting --------
    // プロジェクトが固有に定義する設定を行います。
    $conf->extra = new stdClass;

    return $conf;
} );