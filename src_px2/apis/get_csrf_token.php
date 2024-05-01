<?php

header('Content-type: text/json');
echo json_encode(array(
    "csrf_token" => $paprika->get_csrf_token(),
));
exit();
