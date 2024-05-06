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
		committee.init();
		committee.startDiscussion({
			mainTheme: inputMainTheme,
		});
	});
});