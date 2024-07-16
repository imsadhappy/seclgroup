<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SECLGroup
 */
if ( ! defined( 'ABSPATH' ) ) {
	http_response_code(403);
	exit; // Exit if accessed directly.
}

get_header();

?>

	<main id="primary" class="site-main">

		<?php

		if ( function_exists('yoast_breadcrumb') && ! is_front_page() )
			yoast_breadcrumb( '<p id="breadcrumbs">','</p>' );

		while ( have_posts() ) :

			the_post(); ?>

			<div id="page-<?php the_ID(); ?>" <?php post_class(); ?>>

				<div class="page-content"><?php

					the_content();

				?></div><!-- .page-content -->

			</div><!-- #page-<?php the_ID(); ?> -->

			<?php  endwhile; // End of the loop. ?>

	</main><!-- #main -->

<?php

get_footer();
