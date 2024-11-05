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
if ( ! defined( 'ABSPATH' ) ) {
	http_response_code(403);
	exit; // Exit if accessed directly.
}

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="preconnect" href="https://www.google.com">
	<link rel="preconnect" href="https://www.gstatic.com" crossorigin>
	<?php foreach ( array('HalvarBreit-Md','HalvarBreit-Rg') as $fset ) : ?>
	<link rel="preload" as="font" type="font/woff2" crossorigin 
			href="<?php 
				echo get_template_directory_uri();
			?>/assets/fonts/<?php echo $fset ?>.woff2">
	<?php endforeach; 
		unset($fset);
		wp_head();
		code_snippets('head');
	?>
</head>
<body <?php body_class(); ?> itemscope itemtype="http://schema.org/WebPage">
<?php
	code_snippets('body_start');
	wp_body_open();
?>
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
