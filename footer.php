<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package SECLGroup
 */

?>

	<footer id="colophon" class="site-footer">

		<div id="copyright">
			<span><?php esc_html_e('Copyright', 'seclgroup') ?></span>
			<span>&copy;</span>
			<span>2005</span>
			<span>&mdash;</span>
			<span itemprop="copyrightYear"><?php echo date('Y'); ?></span>,
			<span itemprop="copyrightHolder"><?php bloginfo( 'description' ); ?></span>
			<?php the_terms_and_conditions_link() ?>
			<?php the_privacy_policy_link() ?>
		</div>

	</footer><!-- #colophon -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>

</html>
