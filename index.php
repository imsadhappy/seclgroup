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

	<?php if ( ! is_singular() ) : ?><div class="two-columns">

		<aside class="uses-widget--blog-aside"><?php
			dynamic_sidebar('blog-aside')
		?></aside>

	<?php else : ?><div class="one-column"><?php endif; ?>

		<div class="main-column">

			<?php

				get_search_form(array('aria_label' => 'post_type-post'));

				inline_script('/js/components/search.js');

				if ( have_posts() ) : ?>

				<ul class="post-list"><?php

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

				?></ul><!-- .posts-list -->

				<?php do_action("after_loop_$queried_loop_type", $queried_post_ids); ?>

				<?php the_posts_pagination(apply_filters('the_posts_pagination', array())) //see trait-pagination ?>

			<?php else : ?>

				<div class="no-selection">
					<?php esc_html_e( 'No posts found.' ); ?>
					<a href="<?php echo home_url(get_current_request_url()) ?>" rel="nofollow" class="underline"><?php esc_html_e( 'Clear search', 'seclgroup' ); ?></a>
				</div>

			<?php endif; ?>

		</div>

	</div><!-- close one or two columns -->

	<?php if ( ! is_singular() ) blog_content() ?>

</main><!-- #main -->

<?php

get_footer();
