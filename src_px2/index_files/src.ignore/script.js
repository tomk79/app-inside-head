import Committee from "./includes/Committee";
import View from "./includes/View";

const committee = new Committee();
const view = new View();
let csrfToken;

const $profile = $('#cont-profile');
const $discussionLog = $('#cont-discussion-log');
const $btnStart = $('#cont-btn-start');
const $btnStop = $('#cont-btn-stop');
$btnStop.attr({'disabled': true});

const $inputCommitteeSettings = $('input[name=committee-settings]');
let committeeSettings = null;

// --------------------------------------
// 初期化
new Promise((resolve, reject)=>{
	if(csrfToken){
		resolve(csrfToken);
		return;
	}
	window.getCsrfToken((result)=>{
		csrfToken = result;
		resolve(csrfToken);
		return;
	});
}).then((csrfToken)=>{
	return new Promise((resolve, reject)=>{
		if(committeeSettings){
			resolve(committeeSettings);
			return;
		}
		$.ajax({
			'url': './index_files/apis/get_committee_settings.php',
			"type": "get",
			"dataType": "json",
			"async": true,
		}).done((result)=>{
			committeeSettings = result.members;
			$profile.html('').append(view.bindTemplate('profile', committeeSettings));
			resolve(committeeSettings);
		}).fail((err)=>{
			console.error(err);
		});
	});
});


// --------------------------------------
// コミッティ設定をロードする
$inputCommitteeSettings.on('change', function(e){
	var fileInfo = e.target.files[0];
	var realpathSelected = $(this).val();

	if( realpathSelected ){
		function readSelectedLocalFile(fileInfo, callback){
			var reader = new FileReader();
			reader.onload = function(evt) {
				callback( evt.target.result );
			}
			reader.readAsText(fileInfo);
		}

		readSelectedLocalFile(fileInfo, function(loadedString){
			committeeSettings = JSON.parse(loadedString);
			$profile.html('').append(view.bindTemplate('profile', committeeSettings));
		});
	}
});

// --------------------------------------
// ディスカッションを開始する
$btnStart.on('click', ()=>{
	$btnStart.attr({'disabled': true});
	$btnStop.attr({'disabled': false});
	const inputMainTheme = $('textarea[name="main-theme"]').val();
	const inputIdeasSeed = $('textarea[name="ideas-seed"]').val();

	if( !committeeSettings ){
		return;
	}

	$discussionLog.html('');
	committee.init({
		mainTheme: inputMainTheme,
		ideasSeed: inputIdeasSeed,
		members: committeeSettings,
		onmessage: (message)=>{
			console.log('=-=-=-=-= message:', message);
			$discussionLog.append(view.bindTemplate(message.phase, message));
		},
		onstop: ()=>{
			$btnStart.attr({'disabled': false});
			$btnStop.attr({'disabled': true});
		},
	});
	committee.startDiscussion();
});

// --------------------------------------
// ディスカッションを中断する
$btnStop.on('click', ()=>{
	committee.stopDiscussion();
});
