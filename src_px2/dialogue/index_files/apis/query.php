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
                        "content" => $paprika->req()->get_param('main-theme'),
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
    "output" => $result,
);
echo json_encode($json);
exit();
