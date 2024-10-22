<?php
/**
 * Theme entry point
 *
 * @package SECLGroup
 */

namespace SECLGroup;

if ( ! defined( 'ABSPATH' ) ) {
	http_response_code(403);
	exit; // Exit if accessed directly.
}

(function($dir){

/**
 * Template tags.
 */
require_once "$dir/inc/template-tags.php";

/**
 * ACF blocks.
 */
require_once "$dir/inc/blocks.php";

/**
 * Theme.
 */
require_once "$dir/inc/trait-updater.php";
require_once "$dir/inc/trait-admin.php";
require_once "$dir/inc/trait-wpcf7.php";
require_once "$dir/inc/trait-pagination.php";
require_once "$dir/inc/trait-style-to-stylesheet.php";
require_once "$dir/inc/trait-shortcodes.php";
require_once "$dir/inc/trait-enqueue.php";
require_once "$dir/inc/trait-cookie-notice.php";
require_once "$dir/inc/trait-yoast-seo.php";
require_once "$dir/inc/trait-multisite.php";
require_once "$dir/inc/final-class-theme.php";

new Theme;

/**
 * Custom Post Types.
 */
//require_once "$dir/inc/abstract-class-post-type.php";

})(get_template_directory());
