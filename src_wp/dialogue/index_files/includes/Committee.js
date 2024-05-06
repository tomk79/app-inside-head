import Member from "./Member";

class Committee {
	#mainTheme;
	#currentIdea;
	#turnNumber = 0;

	#members;

	/**
	 * Constructor
	 */
	constructor() {
	}

	/**
	 * 初期化する
	 */
	init (params) {
		this.#mainTheme = params.mainTheme;
		this.#currentIdea = '';
		this.#turnNumber = 0;

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
		this.#turnNumber ++;
		if( this.#turnNumber > 10 ){
			console.log('exit');
			return;
		}

		this.#members.presenter.ask({
			mainTheme: this.#mainTheme,
		})
			.then((result)=>{
				console.log('#idation result:', result);
				this.#currentIdea = result.choices[0].message.content;
				this.#review();
			}).catch((err)=>{
				console.error(err);
			});
		return;
	}

	#review () {
		let reviewers = [];
		this.#members.reviewers.forEach((reviewer)=>{
			reviewers.push(reviewer.ask({
				mainTheme: this.#mainTheme,
				currentIdea: this.#currentIdea,
			}));
		});
		return Promise.allSettled(reviewers)
			.then((result)=>{
				console.log('#review result:', result);
				this.#idation();
			})
			.catch((err)=>{
				console.error(err);
			});
	}

	/**
	 * ディスカッションを中止する
	 */
	stopDiscussion () {
	}
}
export default Committee;
