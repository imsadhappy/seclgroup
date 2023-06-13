<?php
/**
 * Template part for displaying a message that posts cannot be found
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SECLGroup
 */

?>

<div class="page-content">

	<?php if ( is_404() ) : ?>

		<div class="error-code color-white no-selection">404</div>

		<h1 class="weight-normal color-white no-selection">
			<?php esc_html_e( 'Page not found' ); ?>
		</h1>

	<?php else : ?>

		<div class="error-code color-white no-selection">204</div>

		<h1 class="weight-normal color-white no-selection">
			<?php esc_html_e( 'No posts found.' ); ?>
		</h1>

	<?php endif; ?>

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
