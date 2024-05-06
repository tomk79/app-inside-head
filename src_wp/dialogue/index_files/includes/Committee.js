import Member from "./Member";

class Committee {
	#mainTheme;
	#currentIdea;
	#turnNumber = 0;
	#talkLog = [];

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
		this.#talkLog = [];

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
				const score = this.#scoreingReviews(result);
				if( score.total <= score.agree ){
					this.stopDiscussion();
				}else{
					this.#idation();
				}
			})
			.catch((err)=>{
				console.error(err);
			});
	}

	/**
	 * レビューを評価する
	 */
	#scoreingReviews (reviews) {
		const scores = [];
		const counter = {
			"agree": 0, // 賛成
			"opposition": 0, // 反対
			"unknown": 0,
			"total": 0,
		};
		reviews.forEach((review, index)=>{
			const message = review.value.choices[0].message;
			message.content.match(/^[\s\S]*?(賛成|反対)/);
			const matched = RegExp.$1;
			counter.total ++;
			if( matched=='賛成' ){
				counter.agree ++;
				scores.push(true);
			}else if( matched=='反対' ){
				counter.opposition ++;
				scores.push(false);
			}else{
				counter.unknown ++;
				scores.push(null);
			}
		});
		console.log(counter);
		return counter;
	}

	/**
	 * ディスカッションを中止する
	 */
	stopDiscussion () {
	}
}
export default Committee;
