import Twig from "twig";
import templateProfile from "-!text-loader!./templates/views/profile.twig";
import templateConclusion from "-!text-loader!./templates/views/conclusion.twig";
import templateIdeation from "-!text-loader!./templates/views/ideation.twig";
import templateJudgement from "-!text-loader!./templates/views/judgement.twig";
import templateReview from "-!text-loader!./templates/views/review.twig";
import {marked} from 'marked';

const templates = {
	profile: templateProfile,
	conclusion: templateConclusion,
	ideation: templateIdeation,
	judgement: templateJudgement,
	review: templateReview,
};

// カスタム関数の登録
Twig.extendFunction('answer_to_html', function(value) {
	value = marked(value);
	return value;
});

class View {

	/**
	 * Constructor
	 */
	constructor() {
	}

	/**
	 * テンプレートに値をバインドする
	 */
	bindTemplate( templateId, data ) {
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
export default View;
