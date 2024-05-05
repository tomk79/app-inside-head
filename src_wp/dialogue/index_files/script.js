import Member from "./includes/Member";

const members = {
    presenter: new Member({}),
    reviewers: [
        new Member({}),
        new Member({}),
        new Member({}),
    ],
};

$('#cont-btn-sendtest').on('click', ()=>{
    const inputMainTheme = $('textarea[name="main-theme"]').val();

    window.getCsrfToken((csrfToken)=>{
        members.presenter.ask({
            mainTheme: inputMainTheme,
        });
    });
});