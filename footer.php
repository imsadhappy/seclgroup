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

		<div class="footer-content">

			<div class="col col-1"><?php
				printf('<div class="widget_title">%s</div>', wp_get_nav_menu_name('menu-2'));
				wp_nav_menu(array('theme_location' => 'menu-2', 'container' => 'nav'));
			?></div>

			<div class="col col-2"><?php
				printf('<div class="widget_title">%s</div>', wp_get_nav_menu_name('menu-3'));
				wp_nav_menu(array('theme_location' => 'menu-3', 'container' => 'nav'));
			?></div>

			<div class="col col-3"><?php
				printf('<div class="widget_title">%s</div>', wp_get_nav_menu_name('menu-4'));
				wp_nav_menu(array('theme_location' => 'menu-4', 'container' => 'nav'));
			?></div>

			<div class="col col-4"><?php
				//printf('<div class="widget_title">%s</div>', wp_get_sidebar("footer-column-4")['name']);
				dynamic_sidebar("footer-column-4");
			?></div>

			<div class="col col-5"><?php
				//printf('<div class="widget_title">%s</div>', wp_get_sidebar("footer-column-5")['name']);
				dynamic_sidebar("footer-column-5");
			?></div>

		</div>

		<div id="copyright">
			<span>&copy;</span>
			<span itemprop="copyrightYear"><?php echo date('Y'); ?></span>
			<span class="divider">|</span>
			<span itemprop="copyrightHolder"><?php bloginfo( 'name' ); ?></span>
			<?php the_terms_and_conditions_link() ?>
			<span class="divider">|</span>
			<?php the_privacy_policy_link() ?>
		</div>

	</footer><!-- #colophon -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>

</html>
