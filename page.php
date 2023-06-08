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

get_header();
?>

	<main id="primary" class="site-main">

		<?php while ( have_posts() ) :

			the_post(); ?>

			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

				<section class="page-content"><?php

					the_content();

				?></section><!-- .page-content -->

			</article><!-- #post-<?php the_ID(); ?> -->

			<?php  endwhile; // End of the loop. ?>

	</main><!-- #main -->

<?php

get_footer();
