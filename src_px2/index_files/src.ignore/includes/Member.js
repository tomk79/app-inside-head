class Member {
	#profile;

	/**
	 * Constructor
	 */
	constructor(profile) {
		this.#profile = profile;
	}

	getProfile () {
		return this.#profile;
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
					"type": this.#profile.type,
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
}
export default Member;
