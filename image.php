<?php
/**
 * The template to redirect attachment
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SECLGroup
 */
if ( ! defined( 'ABSPATH' ) ) {
    http_response_code(403);
	exit; // Exit if accessed directly.
}

if ( $post->post_parent ) {
    wp_redirect( get_permalink($post->post_parent) );
} else {
    wp_redirect( home_url() );
}

exit;
