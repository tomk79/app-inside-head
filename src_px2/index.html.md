<?php ob_start(); ?><link rel="stylesheet" href="<?= htmlspecialchars( $px->path_files('/style.css') ) ?>" /><?php $px->bowl()->put( ob_get_clean(), 'head' );?>
<?php ob_start(); ?><script src="<?= htmlspecialchars( $px->path_files('/script.js') ) ?>"></script><?php $px->bowl()->put( ob_get_clean(), 'foot' );?>
<div>
<h2>コミッティ</h2>
<p>
    <input type="file" name="committee-settings" value="" class="px2-input" />
</p>
<div id="cont-profile"></div>

<h2>課題</h2>
<p><textarea name="main-theme" class="px2-input px2-input--block">今夜のディーナーの献立を何にするか？
カレーとうどんとハンバーグの中から1つを選択する。</textarea></p>
</div>
<p>
    <button type="button" class="px2-btn px2-btn--primary" id="cont-btn-start">送信</button>
    <button type="button" class="px2-btn px2-btn--second" id="cont-btn-stop">中断</button>
</p>

<div id="cont-discussion-log"></div>
