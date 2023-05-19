<?php
$displayPostsNumber = 40;
if (isset($block_attributes['postsNumber'])) {
    $displayPostsNumber = $block_attributes['postsNumber'];
} ?>

<div class="mx-ssr-block-wrapper" style="width:<?php echo $displayPostsNumber; ?>px;height:<?php echo $displayPostsNumber; ?>px;"></div>