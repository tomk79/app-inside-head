<?php ob_start(); ?><link rel="stylesheet" href="<?= htmlspecialchars( $px->path_files('/style.css') ) ?>" /><?php $px->bowl()->put( ob_get_clean(), 'head' );?>
<?php ob_start(); ?><script src="<?= htmlspecialchars( $px->path_files('/script.js') ) ?>"></script><?php $px->bowl()->put( ob_get_clean(), 'foot' );?>
<p><button type="button" class="px2-btn px2-btn--primary" id="cont-btn-sendtest">送信テスト</button></p>
