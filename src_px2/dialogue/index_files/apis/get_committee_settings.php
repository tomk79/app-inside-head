<?php

header("Content-type: text/json");

$json = (object) array(
	"result" => true,
	"members" => (object) array(
		'presenter' => (object) array(
			'template' => file_get_contents($paprika->env()->realpath_homedir.'data/committee/templates/presenter.txt'),
		),
		'reviewers' => array(
			(object) array(
				'template' => '',
			),
		),
	),
);
echo json_encode($json);
exit();
