class Member {
	#template = '';

	constructor(options) {
		this.#template = options.template || '';
	}

	ask (params) {
		const message = this.#bindTemplate(params);

		return new Promise((resolve, reject)=>{
			$.ajax({
				'url': './index_files/apis/query.php',
				"type": "post",
				"dataType": "json",
				"contentType": "application/json",
				"data": JSON.stringify({
					"messages": [
						{
							"role": "user",
							"content": message,
						},
					],
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

	#bindTemplate (contents) {
		let template = this.#template;
		if(!template){
			template = '${mainTheme}';
		}
		template = template.split('${mainTheme}').join(contents.mainTheme);
		return template;
	}
}
export default Member;
