import Member from "./Member";

class Committee {
	#status = 'stop';
	#mainTheme;
	#currentIdea;
	#turnNumber = 0;
	#idationMessageLog = [];

	#callback_onmessage;
	#callback_onstop;

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
		this.#status = 'stop';
		this.#mainTheme = params.mainTheme;
		this.#currentIdea = '';
		this.#turnNumber = 0;
		this.#idationMessageLog = [];

		this.#callback_onmessage = params.onmessage || function(){};
		this.#callback_onstop = params.onstop || function(){};

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
		this.#status = 'playing';
		this.#idation();
	}

	/**
	 * アイデアを提案する
	 */
	#idation () {
		this.#turnNumber ++;
		if( this.#turnNumber > 10 || this.#status == 'stop' ){
			return;
		}

		if(!this.#idationMessageLog.length){
			this.#idationMessageLog.push({
				role: "user",
				content: this.#members.presenter.bindTemplate({
					mainTheme: this.#mainTheme,
				}),
			});
		}

		this.#members.presenter.ask(this.#idationMessageLog)
			.then((result)=>{
				this.#idationMessageLog.push(result.choices[0].message);
				this.#currentIdea = result.choices[0].message.content;
				this.#callback_onmessage({
					phase: 'idation',
					currentIdea: this.#currentIdea,
				});
				this.#review();
			}).catch((err)=>{
				console.error(err);
			});
		return;
	}

	/**
	 * アイデアをレビューする
	 */
	#review () {
		let reviewers = [];
		this.#members.reviewers.forEach((reviewer)=>{
			const reviewMessage = [{
				role: "user",
				content: reviewer.bindTemplate({
					mainTheme: this.#mainTheme,
					currentIdea: this.#currentIdea,
				}),
			}];

			reviewers.push(reviewer.ask(reviewMessage));
		});

		return Promise.allSettled(reviewers)
			.then((result)=>{
				const score = this.#scoreingReviews(result);

				let messages = [];
				result.forEach((review, index)=>{
					const message = review.value.choices[0].message;
					message.stance = score.scores[index];
					messages.push(message);
				});
				this.#callback_onmessage({
					phase: 'review',
					reviews: messages,
				});

				if( score.total <= score.agree ){
					this.stopDiscussion();
				}else{
					this.#idationMessageLog.push({
						role: "user",
						content: `可決しませんでした。修正案を提案してください。`, // TODO: 修正案生成のプロンプトを作成する
					});

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
		const counter = {
			"agree": 0, // 賛成
			"opposition": 0, // 反対
			"unknown": 0,
			"total": 0,
			"scores": [],
		};
		reviews.forEach((review, index)=>{
			const message = review.value.choices[0].message;
			message.content.match(/^[\s\S]*?(賛成|反対)/);
			const matched = RegExp.$1;
			counter.total ++;
			if( matched=='賛成' ){
				counter.agree ++;
				counter.scores.push(true);
			}else if( matched=='反対' ){
				counter.opposition ++;
				counter.scores.push(false);
			}else{
				counter.unknown ++;
				counter.scores.push(null);
			}
		});
		return counter;
	}

	/**
	 * ディスカッションを中止する
	 */
	stopDiscussion () {
		this.#status = 'stop';
		this.#callback_onstop();
	}
}
export default Committee;
