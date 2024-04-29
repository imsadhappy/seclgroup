<?php
/**
 * Template part for displaying search result in loop
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SECLGroup
 */
if ( ! defined( 'ABSPATH' ) ) {
	http_response_code(403);
	exit; // Exit if accessed directly.
}

get_template_part( 'template-parts/loop', 'post' );
