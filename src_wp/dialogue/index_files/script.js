import Committee from "./includes/Committee";

const committee = new Committee();
let csrfToken;

$('#cont-btn-sendtest').on('click', ()=>{
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
		committee.init({
			mainTheme: inputMainTheme,
			members: committeeInfo,
		});
		committee.startDiscussion();
	});
});