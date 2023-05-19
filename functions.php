<?php
/**
 * Theme entry point
 *
 * @package Oceaa
 */

namespace Oceaa;

global $theme_includes, $theme_textdomain;

$theme_includes = get_template_directory() . '/inc';
$theme_textdomain = strtolower(__NAMESPACE__);
$theme_gutenberg_blocks = get_template_directory() . '/gutenberg';

/**
 * Template tags.
 */
require_once "$theme_includes/template-tags.php";

/**
 * ACF blocks.
 */
require_once "$theme_includes/blocks.php";

/**
 * Theme.
 */
require_once "$theme_includes/trait-updater.php";
require_once "$theme_includes/trait-admin.php";
require_once "$theme_includes/final-class-theme.php";

new Theme;

/**
 * Custom Post Types.
 */
require_once "$theme_includes/abstract-class-post-type.php";
require_once "$theme_includes/class-job-post-type.php";

new Job;

/**
 * Extensions.
 */
require_once "$theme_includes/class-gforms-extension.php";

new GForms_Extension;

/**
 * Gutenberg Blocks.
 */
require_once "$theme_gutenberg_blocks/gutenberg-main.php";
