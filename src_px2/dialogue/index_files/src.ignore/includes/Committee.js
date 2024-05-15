import Twig from "twig";
import Member from "./Member";
import templateIdeation from "-!text-loader!./templates/prompts/ideation.twig";
import templateRetake from "-!text-loader!./templates/prompts/retake.twig";
import templateReview from "-!text-loader!./templates/prompts/review.twig";

const templates = {
	ideation: templateIdeation,
	retake: templateRetake,
	review: templateReview,
};

class Committee {
	#status = 'stop';
	#mainTheme;
	#currentIdea;
	#turnNumber = 0;
	#ideationMessageLog = [];

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
		this.#ideationMessageLog = [];

		this.#callback_onmessage = params.onmessage || function(){};
		this.#callback_onstop = params.onstop || function(){};

		this.#members = {
			presenter: new Member(params.members.presenter),
			reviewers: [],
		};
		params.members.reviewers.forEach((member)=>{
			this.#members.reviewers.push(new Member(member));
		});
	}

	/**
	 * ディスカッションを開始する
	 */
	startDiscussion () {
		this.#status = 'playing';
		this.#ideation();
	}

	/**
	 * アイデアを提案する
	 */
	#ideation () {
		this.#turnNumber ++;
		if( this.#turnNumber > 10 || this.#status == 'stop' ){
			return;
		}

		if(!this.#ideationMessageLog.length){
			this.#ideationMessageLog.push({
				role: "user",
				content: this.#bindTemplate("ideation", {
					mainTheme: this.#mainTheme,
				}),
			});
		}

		this.#members.presenter.ask(this.#ideationMessageLog)
			.then((result)=>{
				this.#ideationMessageLog.push(result.choices[0].message);
				this.#currentIdea = result.choices[0].message.content;
				this.#callback_onmessage({
					phase: 'ideation',
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
		let reviewersDialogs = [];
		this.#members.reviewers.forEach((reviewer)=>{
			const reviewMessage = [{
				role: "user",
				content: this.#bindTemplate("review", {
					mainTheme: this.#mainTheme,
					currentIdea: this.#currentIdea,
					profile: reviewer.getProfile(),
				}),
			}];

			reviewersDialogs.push(reviewer.ask(reviewMessage));
		});

		return Promise.allSettled(reviewersDialogs)
			.then((result)=>{
				const score = this.#scoreingReviews(result);

				let messages = [];
				result.forEach((review, index)=>{
					const message = review.value.choices[0].message;
					message.stance = score.scores[index];
					message.reviewer = this.#members.reviewers[index].getProfile();
					messages.push(message);
				});
				this.#callback_onmessage({
					phase: 'review',
					reviews: messages,
				});

				if( score.total <= score.agree ){
					this.#callback_onmessage({
						phase: 'conclusion',
						currentIdea: this.#currentIdea,
					});
					this.stopDiscussion();
				}else{
					this.#ideationMessageLog.push({
						role: "user",
						content: this.#bindTemplate("retake", {
							mainTheme: this.#mainTheme,
							currentIdea: this.#currentIdea,
							reviews: messages,
							score: score,
						}),
					});

					this.#ideation();
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
			"disagree": 0, // 反対
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
				counter.disagree ++;
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

	/**
	 * テンプレートに値をバインドする
	 */
	#bindTemplate( templateId, data ) {
		var rtn = '';
		var twig = Twig.twig;
		try{
			rtn = new twig({
				'data': templates[templateId],
			}).render(data);
		}catch(e){
			var errorMessage = 'TemplateEngine "Twig" Rendering ERROR.';
			console.error( errorMessage );
			rtn = errorMessage;
		}
		return rtn;
	}
}
export default Committee;
