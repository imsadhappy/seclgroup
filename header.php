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
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?> itemscope itemtype="http://schema.org/WebPage">

<?php wp_body_open(); ?>

<div id="page" class="site">

	<header id="masthead" class="site-header">

		<div class="header-content">

			<div class="site-branding">

				<?php the_logo(); ?>

			</div><!-- .site-branding -->

			<?php

				//include get_template_directory() . '/trp-language-switcher.php';

				//echo apply_filters('the_content', '[language-switcher]');

				wp_nav_menu( array(
					'theme_location' => 'menu-1',
					'menu_id' => 'primary-menu',
					'container' => 'nav'
				) );

				inline_script('/js/navigation.js');

			?>

		</div>

	</header><!-- #masthead -->
