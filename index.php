<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SECLGroup
 */

get_header();
?>

	<main id="primary" class="site-main <?php echo have_posts() ? 'has' : 'no' ?>-posts">

		<?php if ( have_posts() ) : ?>

			<header class="page-header">

				<h1 class="page-title"><span><?php

					if ( is_home() || is_singular() ) {
						single_post_title();
					} elseif ( is_post_type_archive() ) {
						post_type_archive_title();
					} elseif ( is_category() || is_tag() || is_tax() ) {
						single_term_title();
					} elseif ( is_search() ) {
						printf( __( 'Search Results for &#8220;%s&#8221;' ), get_search_query() );
					} elseif ( is_author() ) {
						echo str_replace('span>', 'b>', get_the_archive_title() );
					}

				?></span></h1>

				<?php if ( is_home() || is_category() ) category_list(); ?>

				<?php if ( is_tax() || is_post_type_archive() ) term_list(); ?>

			</header>

			<section class="page-content">

				<ul class="post-list">

				<?php

					$queried_loop_type = ''; //loop type, not post type - search loop has various post types
					$queried_post_ids = array();

					while ( have_posts() ) :

						the_post();

						$queried_post_ids[] = get_the_ID();
						$queried_loop_type = is_search() ? 'search' : get_post_type();

						/*
						* Include the Post-Type-specific template for the content.
						* If you want to override this in a child theme, then include a file
						* called loop-___.php (where ___ is the Post Type name) and that will be used instead.
						*/
						get_template_part( 'template-parts/loop', $queried_loop_type );

					endwhile;

				?>

				</ul><!-- .posts-list -->

				<?php do_action("after_loop_$queried_loop_type", $queried_post_ids);

					/*the_posts_navigation( array(
						'prev_text' => __("Previous"),
						'next_text' => __("Next")
					) );*/

				?>

			</section>

		<?php else :

			get_template_part( 'template-parts/content', 'none' );

		endif; ?>

	</main><!-- #main -->

<?php
get_footer();
