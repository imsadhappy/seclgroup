<?php
/**
 * Project Logo Block Template.
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

if ( ! defined( 'ABSPATH' ) ) {
    http_response_code(403);
	exit; // Exit if accessed directly.
}

$logo = get_field('project_logo', $post_id);

if (empty($logo)) :

    $is_preview ? esc_html_e('Please add logo', 'seclgroup') : '';

else :

    project_logo($logo, $block);

endif;
