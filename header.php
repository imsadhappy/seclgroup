<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package SECLGroup
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="preconnect" href="https://www.google.com">
	<link rel="preconnect" href="https://www.gstatic.com" crossorigin>
	<?php wp_head(); ?>
	<?php print(get_field('head', 'options')) ?>
</head>
<body <?php body_class(); ?> itemscope itemtype="http://schema.org/WebPage">

<?php print(get_field('body_start', 'options')) ?>

<?php wp_body_open(); ?>

<script>if (window.location.hash) scroll(0,0);</script>

<div id="page" class="site">

	<header id="masthead" class="site-header">

		<div class="header-content">

			<div class="site-branding">

				<?php the_logo(); ?>

			</div><!-- .site-branding -->

			<?php

				include get_template_directory() . '/trp-language-switcher.php';

				//echo apply_filters('the_content', '[language-switcher]');

				wp_nav_menu( array(
					'theme_location' => 'menu-1',
					'menu_id' => 'primary-menu',
					'container' => 'nav'
				) );

			?>

		</div>

	</header><!-- #masthead -->
