class Member {
	#template = '';

	/**
	 * Constructor
	 */
	constructor(options) {
		this.#template = options.template || '';
	}

	/**
	 * 質問を送信する
	 * @param {*} params 
	 * @returns 
	 */
	ask (params) {

		return new Promise((resolve, reject)=>{
			$.ajax({
				'url': './index_files/apis/query.php',
				"type": "post",
				"dataType": "json",
				"contentType": "application/json",
				"data": JSON.stringify({
					"messages": params,
				}),
				"headers": {
					"X-CSRF-TOKEN": $('meta[name=csrf-token]').attr('content'),
				},
				"async": true,
			}).done((result)=>{
				resolve(result);
			}).fail((err)=>{
				reject(err);
			});
		});
	}

	/**
	 * テンプレートに値をバインドする
	 */
	bindTemplate (contents) {
		let template = this.#template;
		if(!template){
			template = '${mainTheme}';
		}
		template = template.split('${mainTheme}').join(contents.mainTheme);
		template = template.split('${currentIdea}').join(contents.currentIdea);
		return template;
	}
}
export default Member;
