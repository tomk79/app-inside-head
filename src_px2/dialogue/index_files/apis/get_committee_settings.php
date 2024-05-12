<?php

header("Content-type: text/json");

$template_presenter = file_get_contents($paprika->env()->realpath_homedir.'data/committee/templates/presenter.twig');
$template_reviewers = file_get_contents($paprika->env()->realpath_homedir.'data/committee/templates/reviewer.twig');

$json = (object) array(
	"result" => true,
	"members" => (object) array(
		'presenter' => (object) array(
			'template' => $template_presenter,
		),
		'reviewers' => array(
			(object) array(
				'name' => 'Reviewer 1',
				'template' => $template_reviewers,
			),
			(object) array(
				'name' => 'Reviewer 2',
				'template' => $template_reviewers,
			),
		),
	),
);
echo json_encode($json);
exit();
