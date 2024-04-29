<?php
/**
 * Pagination Block Template.
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

if ( ! defined( 'ABSPATH' ) ) {
    http_response_code(403);
	exit; // Exit if accessed directly.
}

if ($is_preview) {
    ?><div style="text-align:center; font-size: 20px; padding: 20px 0; line-height: 60px;">
        Pagination <span class="dashicons dashicons-image-flip-horizontal" style="font-size: 60px"></span>
    </div><?php
} else {
    the_posts_pagination(apply_filters('the_blocks_pagination', array()));
}
