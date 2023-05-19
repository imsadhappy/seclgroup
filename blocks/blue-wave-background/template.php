<?php
/**
 * Graph Background Block Template.
 *
 * @package Oceaa
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during backend preview render.
 * @param   int $post_id The post ID the block is rendering content against.
 *          This is either the post ID currently being displayed inside a query loop,
 *          or the post ID of the post hosting this block.
 * @param   array $context The context provided to the block by the post or it's parent block.
 */

extract(get_fields());
$offset = empty($offset) ? 0 : intval($offset);
$style = empty($style) ? 2 : intval($style);

?>
<div <?php block_class(array('blue-wave-background', 'alignfull'), $block) ?> style="transform:translateY(<?php echo $offset ?>%)">
    <div class="blue-wave-background--wrapper">
        <img src="<?php echo get_template_directory_uri() . "/assets/blue-wave-$style.svg" ?>">
    </div>
</div>
