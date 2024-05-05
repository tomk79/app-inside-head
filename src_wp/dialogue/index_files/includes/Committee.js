import Member from "./Member";
const members = {
    presenter: new Member({}),
    reviewers: [
        new Member({}),
        new Member({}),
        new Member({}),
    ],
};

class Committee {
    #charactor;

    constructor(charactor) {
        this.#charactor = charactor;
    }

    startDiscussion (params) {
        members.presenter.ask({
            mainTheme: params.inputMainTheme,
        });
        return;
    }
}
export default Committee;
