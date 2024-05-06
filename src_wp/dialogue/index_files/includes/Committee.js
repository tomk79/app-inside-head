import Member from "./Member";

class Committee {
	#mainTheme;
	#currentIdea;
	#members;

	constructor() {
	}

	init (params) {
		this.#mainTheme = params.mainTheme;
		this.#currentIdea = '';
		this.#members = {
			presenter: new Member({
				template: params.members.presenter.template || '',
			}),
			reviewers: [],
		};
		params.members.reviewers.forEach((member)=>{
			this.#members.reviewers.push(new Member({
				template: member.template || '',
			}));
		});
	}

	/**
	 * ディスカッションを開始する
	 */
	startDiscussion () {
		this.#idation();
	}

	#idation () {
		this.#members.presenter.ask({
			mainTheme: this.#mainTheme,
		}).then((result)=>{
			console.log(result);
		}).catch((err)=>{
			console.error(err);
		});
		return;
	}

	#review () {}

	/**
	 * ディスカッションを中止する
	 */
	stopDiscussion () {
	}
}
export default Committee;
