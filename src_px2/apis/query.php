<?php
header("Content-type: text/json");
$json = array(
    "foo" => "bar",
    "hello" => "world",
);
echo json_encode($json);
exit();
