<?php
chdir(__DIR__);

$tmp_path_autoload = __DIR__;
while(1){
    if( is_file( $tmp_path_autoload.'/vendor/autoload.php' ) ){
        require_once( $tmp_path_autoload.'/vendor/autoload.php' );
        break;
    }

    if( $tmp_path_autoload == dirname($tmp_path_autoload) ){
        break;
    }
    $tmp_path_autoload = dirname($tmp_path_autoload);
    continue;
}
unset($tmp_path_autoload);

$paprika = new \picklesFramework2\paprikaFramework\fw\paprika(json_decode('{"file_default_permission":"775","dir_default_permission":"775","filesystem_encoding":"UTF-8","session_name":"PXSID","session_expire":1800,"directory_index":["index.html"],"realpath_controot":"../../../","realpath_homedir":"../../../../px-files/paprika/","path_controot":"/","realpath_files":"./query_files/","realpath_files_cache":"../../../common/px_resources/c/dialogue/index_files/apis/query_files/","href":null,"page_info":null,"parent":null,"breadcrumb":null,"bros":null,"children":null}'), false);

ob_start();

$execute_php_content = function($paprika){
?>
<?php

header("Content-type: text/json");

$response = file_get_contents(
    'https://api.openai.com/v1/chat/completions',
    false,
    stream_context_create(array(
        'http' => array(
            'method' => 'POST',
            'header' => implode("\r\n", array(
                'Content-Type: application/json',
                'Authorization: Bearer '.$paprika->conf('extra')->open_ai_secret,
                'OpenAI-Organization: '.$paprika->conf('extra')->open_ai_org_id,
            )),
            'timeout' => 60 * 3,
            'content' => json_encode(array(
                "model" => "gpt-3.5-turbo",
                "messages" => array(
                    array(
                        "role" => "user",
                        "content" => $paprika->req()->get_param('content') ?? '',
                    ),
                ),
                "temperature" => 0,
                "max_tokens" => 1000,
            )),
        )
    ))
);
if( !$response ){
    $json = array(
        "result" => false,
        "output" => null,
    );
    echo json_encode($json);
    exit();
}
$result = json_decode($response ?? '');

$json = array(
    "result" => true,
    "choices" => $result->choices,
);
echo json_encode($json);
exit();
?><?php
};
$execute_php_content($paprika);
$content = ob_get_clean();
if(strlen($content)){
    $paprika->bowl()->put($content);
}
echo $paprika->bowl()->bind_template();
exit;
?>
