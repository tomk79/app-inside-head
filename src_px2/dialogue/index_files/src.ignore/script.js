import Committee from "./includes/Committee";

const committee = new Committee();
let csrfToken;

const $discussionLog = $('#cont-discussion-log');
const $btnStart = $('#cont-btn-start');
const $btnStop = $('#cont-btn-stop');
$btnStop.attr({'disabled': true});

$btnStart.on('click', ()=>{
	$btnStart.attr({'disabled': true});
	$btnStop.attr({'disabled': false});
	const inputMainTheme = $('textarea[name="main-theme"]').val();

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
			$.ajax({
				'url': './index_files/apis/get_committee_settings.php',
				"type": "get",
				"dataType": "json",
				"async": true,
			}).done((result)=>{
				resolve(result.members);
			}).fail((err)=>{
				console.error(err);
			});
		});

	}).then((committeeInfo)=>{
		$discussionLog.html('');
		committee.init({
			mainTheme: inputMainTheme,
			members: committeeInfo,
			onmessage: (message)=>{
				console.log('=-=-=-=-= message:', message);
			},
			onstop: ()=>{
				$btnStart.attr({'disabled': false});
				$btnStop.attr({'disabled': true});
			},
		});
		committee.startDiscussion();
	});
});

$btnStop.on('click', ()=>{
	committee.stopDiscussion();
});
