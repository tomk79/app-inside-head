<?php

header("Content-type: text/json");

$json = (object) array(
	"result" => true,
	"members" => (object) array(
		'presenter' => (object) array(
		),
		'reviewers' => array(
			(object) array(
				'name' => 'Reviewer 1',
			),
			(object) array(
				'name' => 'Reviewer 2',
			),
		),
	),
);
echo json_encode($json);
exit();
