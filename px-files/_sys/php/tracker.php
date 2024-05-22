<?php
namespace appInsideHead;

/**
 * ログ取得関連クラス
 */
class tracker {

    private $px;

    /**
     * Constructor
     */
    public function __construct( $px ){
        $this->px = $px;
    }

	/**
	 * Google Analytics トラッキングコードを出力する
	 */
	public function get_ga_tracker(){
		static $is_done = false;
		if( $is_done ){
			// 1クエリに対して1回まで実行できる。
			return '';
		}

		$ga_id = $_ENV['GOOGLE_ANALYTICS_ID'] ?? '';
		if( !strlen($ga_id ?? '') ){
			return '';
		}

		$src = '';

		if( $this->px->is_publish_tool() ) {
			ob_start(); ?>
<!-- Google Analytics -->
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=<?= htmlspecialchars(urlencode($ga_id)) ?>"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', <?= json_encode($ga_id) ?>);
</script>
<?php
			$src = ob_get_clean();
		}

		$is_done = true;
		return $src;
	}
}