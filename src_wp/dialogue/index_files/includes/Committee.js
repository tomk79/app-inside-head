import Member from "./Member";

class Committee {
	#members;

	constructor() {
	}

	init () {
		this.#members = {
			presenter: new Member({
				template: `次の課題について、最もよいと思われる解決方法を1つだけ提案してください。

■課題
\${mainTheme}
`
			}),
			reviewers: [
				new Member({}),
				new Member({}),
				new Member({}),
			],
		};
	}

	startDiscussion (params) {
		this.#members.presenter.ask({
			mainTheme: params.mainTheme,
		}).then((result)=>{
			console.log(result);
		}).catch((err)=>{
			console.error(err);
		});
		return;
	}
}
export default Committee;
