<?php

namespace SECLGroup;

if ( ! defined( 'ABSPATH' ) ) {
	http_response_code(403);
	exit; // Exit if accessed directly.
}

(function($dir, $theme_name, $theme_version){

require_once "$dir/inc/abstract-class-factory.php";

require_once "$dir/inc/template-tags.php";

require_once "$dir/inc/blocks.php";

require_once "$dir/inc/final-class-theme.php";
new Theme();

require_once "$dir/inc/class-enqueue.php";
new Enqueue();

require_once "$dir/inc/class-no-comments.php";
new NoComments();

require_once "$dir/inc/class-pagination.php";
new Pagination();

require_once "$dir/inc/class-shortcodes.php";
new Shortcodes( array('contact', 'menu') );

require_once "$dir/inc/class-style-to-stylesheet.php";
new StyleToStylesheet( array('core-block-supports', 'block-style-variation-styles') );

if (function_exists('YoastSEO')) {
	require_once "$dir/inc/class-yoast-seo.php";
	new YoastSEO();
}

if (function_exists('Cookie_Notice')) {
	require_once "$dir/inc/class-cookie-notice.php";
	new CookieNotice();
}

if (function_exists('wpcf7')) {
	require_once "$dir/inc/class-wpcf7.php";
	new WPCF7( array('setup_popup') );
}

if (is_multisite()) {
	require_once "$dir/inc/class-multisite.php";
	new Multisite( array('setup_shared_uploads') );
}

if (!get_option('page_for_posts')) {
	require_once "$dir/inc/class-no-blog.php";
	new NoBlog();
}

require_once "$dir/inc/class-page-for.php";

if (function_exists('get_the_projects_link')) {
	new PageFor('projects', 'Projects Page');
}

if (function_exists('get_the_cookie_policy_link')) {
	new PageFor('cookie_policy', 'Cookie Policy Page');
}

if (function_exists('get_the_terms_and_conditions_link')) {
	new PageFor('terms_and_conditions', 'Terms & Conditions Page');
}

if (isset($GLOBALS['current_theme_github']) && !empty($GLOBALS['current_theme_github'])) {
	require_once "$dir/inc/class-github-update-service.php";
	new \GitHubUpdateService($theme_name, $theme_version, $GLOBALS['current_theme_github']);
}

})(
	get_template_directory(), 
	get_stylesheet(), 
	wp_get_theme()->get('Version')
);
