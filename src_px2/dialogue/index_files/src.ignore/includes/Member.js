const Twig = require('twig');
// import Twig from 'twig';

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
	bindTemplate( data ) {
		var rtn = '';
		var twig;
		try{
			twig = Twig.twig;

			rtn = new twig({
				'data': this.#template,
			}).render(data);
		}catch(e){
			var errorMessage = 'TemplateEngine "Twig" Rendering ERROR.';
			console.error( errorMessage );
			rtn = errorMessage;
		}
		return rtn;
	}
}
export default Member;
