<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package SECLGroup
 */

get_header();

?>

	<main id="primary" class="site-main error-404 not-found">

		<div class="page-content">

			<div class="error-code no-selection">404</div>

			<div class="h1 no-selection">
				<?php esc_html_e( 'Page not found' ); ?>
			</div>

			<div class="wp-block-buttons">
				<div class="wp-block-button">
					<a href="<?php echo home_url('/') ?>"
						aria-label="<?php esc_html_e( 'Return to homepage', 'seclgroup' ); ?>"
						class="wp-block-button__link wp-element-button back-to-home">
						<?php esc_html_e( 'Return to homepage', 'seclgroup' ); ?>
					</a>
				</div>
			</div>

		</div><!-- .page-content -->

	</main><!-- #main -->

<?php

get_footer();
