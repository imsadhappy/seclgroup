<?php

$className = 'mx-' . wp_generate_password(12, false);
$height = 100;

if (!empty($block_attributes['media_default'])) {
    $height = intval($block_attributes['media_default']);
}

?>

<style>
    .<?php echo $className; ?> {
        height: <?php echo $height; ?>px;
    }

    /*1500*/
    <?php if (!empty($block_attributes['media_1500'])) : ?>@media (max-width: 1500px) {
        .<?php echo $className; ?> {
            height: <?php echo intval($block_attributes['media_1500']); ?>px;
        }
    }

    <?php endif; ?>

    /*1220*/
    <?php if (!empty($block_attributes['media_1220'])) : ?>@media (max-width: 1220px) {
        .<?php echo $className; ?> {
            height: <?php echo intval($block_attributes['media_1220']); ?>px;
        }
    }

    <?php endif; ?>

    /*992*/
    <?php if (!empty($block_attributes['media_992'])) : ?>@media (max-width: 992px) {
        .<?php echo $className; ?> {
            height: <?php echo intval($block_attributes['media_992']); ?>px;
        }
    }

    <?php endif; ?>

    /*768*/
    <?php if (!empty($block_attributes['media_768'])) : ?>@media (max-width: 768px) {
        .<?php echo $className; ?> {
            height: <?php echo intval($block_attributes['media_768']); ?>px;
        }
    }

    <?php endif; ?>
</style>
<div class="mx-responsive-block-spacer <?php echo $className; ?>"></div>