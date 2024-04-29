<?php
/**
 * Template part for displaying single ?
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SECLGroup
 */
if ( ! defined( 'ABSPATH' ) ) {
	http_response_code(403);
	exit; // Exit if accessed directly.
}

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<section class="entry-content"><?php

		the_content();

	?></section><!-- .entry-content -->

</article><!-- #post-<?php the_ID(); ?> -->
