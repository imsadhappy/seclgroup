<?php
/**
 * Text Group Block Template.
 *
 * @package SECLGroup
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during backend preview render.
 * @param   int $post_id The post ID the block is rendering content against.
 *          This is either the post ID currently being displayed inside a query loop,
 *          or the post ID of the post hosting this block.
 * @param   array $context The context provided to the block by the post or it's parent block.
 */

$block_name = 'text-group';
$field_heading = get_field('heading');
$field_text = get_field('text');
$field_link_text = get_field('link_text');
$field_link_url = get_field('link_url');
$field_target_blank = get_field('target_blank');

?>
<div <?php block_class($block_name, $block) ?>>

    <?php if ( ! empty($field_heading) ) : ?>
        <h3 class="<?php echo $block_name ?>--heading"><?php
            esc_html_e($field_heading);
        ?></h3>
    <?php endif; ?>

    <?php if ( ! empty($field_text) ) : ?>
        <div class="<?php echo $block_name ?>--text"><?php
            esc_html_e($field_text);
        ?></div>
    <?php endif; ?>

    <?php if ( ! empty($field_link_text) ) : ?>
        <a href="<?php echo esc_url($field_link_url) ?>"
            target="<?php echo $field_target_blank ? '_blank' : '_self' ?>"
            class="<?php echo $block_name ?>--link"><?php
            esc_html_e($field_link_text);
        ?></a>
    <?php endif; ?>

</div>
