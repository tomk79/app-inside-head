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

$paprika = new \picklesFramework2\paprikaFramework\fw\paprika(json_decode('{"file_default_permission":"775","dir_default_permission":"775","filesystem_encoding":"UTF-8","session_name":"PXSID","session_expire":1800,"directory_index":["index.html"],"realpath_controot":"../../../","realpath_homedir":"../../../../px-files/paprika/","path_controot":"/","realpath_files":"./get_committee_settings_files/","realpath_files_cache":"../../../common/px_resources/c/dialogue/index_files/apis/get_committee_settings_files/","href":null,"page_info":null,"parent":null,"breadcrumb":null,"bros":null,"children":null}'), false);

ob_start();

$execute_php_content = function($paprika){
?>
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
