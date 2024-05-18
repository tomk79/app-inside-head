<?php

header("Content-type: text/json");

$realpath_committee_member_settings_base_dir = $paprika->fs()->get_realpath($paprika->env()->realpath_homedir.'data/committee/');

$json = (object) array(
	"result" => true,
	"members" => json_decode(file_get_contents($realpath_committee_member_settings_base_dir.'members/alpha.json')),
);
echo json_encode($json);
exit();
