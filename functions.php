<?php
/**
 * Theme entry point
 *
 * @package SECLGroup
 */

namespace SECLGroup;

$dir = get_template_directory();

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
require_once "$dir/inc/trait-ajax.php";
require_once "$dir/inc/trait-style-to-stylesheet.php";
require_once "$dir/inc/final-class-theme.php";

new Theme;

/**
 * Custom Post Types.
 */
//require_once "$dir/inc/abstract-class-post-type.php";

/**
 * Gutenberg Blocks.
 */
//require_once "$dir/gutenberg/gutenberg-main.php";
