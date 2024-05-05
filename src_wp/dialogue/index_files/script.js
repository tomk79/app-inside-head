import Committee from "./includes/Committee";

const committee = new Committee();

$('#cont-btn-sendtest').on('click', ()=>{
    const inputMainTheme = $('textarea[name="main-theme"]').val();

    window.getCsrfToken((csrfToken)=>{
        committee.startDiscussion({
            mainTheme: inputMainTheme,
        });
    });
});