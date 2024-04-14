<?php
/**
 * Theme
 *
 * @package SECLGroup
 */

namespace SECLGroup;

final class Theme {

    use Admin, WPCF7, Updater, Pagination, StyleToStylesheet, Shortcodes;

    function __construct() {

        add_filter( 'max_srcset_image_width', '__return_false' );
        add_filter( 'wp_calculate_image_srcset', '__return_false' );

        add_action( 'after_setup_theme', array($this, 'setup') );
        add_action( 'customize_preview_init', array($this, 'enqueue') );
        add_action( 'wp_enqueue_scripts', array($this, 'enqueue') );
        add_action( 'login_header', array($this, 'enqueue') );
        add_action( 'admin_head', array($this, 'enqueue') );
        add_action( 'after_setup_theme', array($this, 'register_menus') );
        add_action( 'widgets_init', array($this, 'register_widgets') );
        add_filter( 'the_category', array($this, 'the_category') );
        add_filter( 'get_search_form', array($this, 'get_search_form') );
        add_filter( 'excerpt_more', function($more){ return preg_replace('/\[|\]/', '', $more); });
        add_filter( 'excerpt_length', function(){ return 25; });
        add_filter( 'term_links-project-category', array($this, 'project_category_term_links') );

        $this->check_updates();
        $this->disable_comments();
        $this->avif_support();
        $this->remove_from_admin_bar( array('customize', 'updates', 'comments') );
        $this->page_for_terms_and_conditions();
        $this->use_wpcf7_popup();
        $this->styles_in_wp_footer('core-block-supports');
        $this->setup_pagination();
        $this->use_shortcodes( array('contact', 'menu') );
    }

    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which
     * runs before the init hook. The init hook is too late for some features, such
     * as indicating support for post thumbnails.
     */
    public function setup() {

        load_theme_textdomain( 'seclgroup', get_template_directory() . '/languages' );

        add_theme_support( 'editor-styles' );
        add_editor_style( 'editor-style.css' );

        /*
            * Let WordPress manage the document title.
            * By adding theme support, we declare that this theme does not use a
            * hard-coded <title> tag in the document head, and expect WordPress to
            * provide it for us.
            */
        add_theme_support( 'title-tag' );

        /*
            * Enable support for Post Thumbnails on posts and pages.
            *
            * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
            */
        add_theme_support( 'post-thumbnails' );

        /*
            * Switch default core markup for search form, comment form, and comments
            * to output valid HTML5.
            */
        add_theme_support(
            'html5',
            array(
                'search-form',
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
                'style',
                'script',
            )
        );

        // Add theme support for selective refresh for widgets.
        add_theme_support( 'customize-selective-refresh-widgets' );

        /**
         * Add support for core custom logo.
         *
         * @link https://codex.wordpress.org/Theme_Logo
         */
        add_theme_support(
            'custom-logo',
            array(
                'flex-width'  => true,
                'flex-height' => true,
            )
        );

        remove_action( 'wp_body_open', 'wp_global_styles_render_svg_filters' );
        remove_action( 'in_admin_header', 'wp_global_styles_render_svg_filters' );
    }

    /**
     * Enqueue scripts and styles.
     */
    public function enqueue() {

        $version = wp_get_theme()->get('Version');
        $uri = get_template_directory_uri();
        $dir = get_template_directory();
        $build = include( "$dir/js/build/index.asset.php" );

        wp_enqueue_script( 'theme-component-loader', "$uri/js/component-loader.js", array(), $version );

        wp_add_inline_script( 'theme-component-loader', sprintf(
            "window.ajaxurl = window.ajaxurl || '%s';
             window.ComponentLoader.themeURL = '%s';
             window.ComponentLoader.themeVer = '%s';",
            esc_url(admin_url('admin-ajax.php')),
            esc_url($uri),
            $version
        ) );

        wp_register_script(
            'theme-component-list',
            "$uri/js/component-list.js",
            array('theme-component-loader'),
            $version,
            array( 'in_footer' => true )
        );

        wp_register_script(
            'theme-scripts',
            "$uri/js/build/index.js",
            $build['dependencies'],
            $build['version'],
            array( 'in_footer' => true )
        );

        switch ( current_action() ) {
            case 'customize_preview_init':
                wp_enqueue_script( "seclgroup-customizer", "$uri/js/customizer.js", array( 'customize-preview' ), $version, true );
                    break;
            case 'login_header':
                wp_enqueue_style( 'theme-login-style', "$uri/login-style.css", array(), $version );
                    break;
            case 'admin_head':
                wp_enqueue_style( 'theme-admin-style', "$uri/admin-style.css", array(), $version );
                    break;
            default:
                wp_enqueue_style( 'theme-style', get_stylesheet_uri(), array(), $version );
                wp_style_add_data( 'theme-style', 'rtl', 'replace' );
                wp_enqueue_script( 'theme-component-list' );
                wp_enqueue_script( 'theme-scripts' );
                //wp_enqueue_script( 'wow-script', "$uri/js/wow.min.js", array(), $version );
                //wp_enqueue_style( 'animate-wow', "$uri/assets/css/animate.min.css", array(), $version );
                    break;
        }
    }

    /**
     * Register menus.
     */
    public function register_menus() {

        register_nav_menus( array(
            'menu-1' => esc_html__( 'Header', 'seclgroup' ),
        ) );
    }

    /**
     * Register widget area.
     *
     * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
     */
    public function register_widgets() {

        register_sidebar(
            array(
                'name'          => esc_html__( 'Blog Aside', 'seclgroup' ),
                'id'            => "blog-aside",
                'description'   => esc_html__( 'Add widgets here.', 'seclgroup' ),
                'before_widget' => '<div id="%1$s" class="widget %2$s">',
                'after_widget'  => '</div>',
                'before_title'  => '<div class="widget-title">',
                'after_title'   => '</div>',
            )
        );
    }

    public function the_category( $thelist ) {

        if ( is_category() || is_tag() || is_tax() ) {
            $blog_bath = str_replace(home_url(), '', get_permalink( get_option( 'page_for_posts' ) ) );
            $thelist = \str_replace($_SERVER['REQUEST_URI'].'" rel="',
                                    $blog_bath.'" rel="current ', $thelist);
        }

        return $thelist;
    }

    public function get_search_form( $form ) {

        $location = single_post_title( '', false );
        $path = preg_replace("/\/page\/(\d+)/", '', get_current_request_url() );

        if ( empty($location) )
            $location = post_type_archive_title( '', false );

        if ( empty($location) )
            $location = single_term_title( '', false );

        $old_action = esc_url( home_url( '/' ) );
        $new_action = esc_url( home_url( $path ) );
        $old_placeholder = sprintf('placeholder="%s"', esc_attr_x( 'Search &hellip;', 'placeholder' ));
        $new_placeholder = sprintf('placeholder="%s %s"',
                                    esc_attr_x( 'Search in', 'seclgroup' ),
                                    esc_attr($location));

        $form = str_replace($old_action, $new_action, $form);

        if ( ! empty($location) )
            $form = str_replace($old_placeholder, $new_placeholder, $form);

        return $form;
    }

    public function project_category_term_links ( $links ) {

        return array_map( function($link){
            $link = str_replace('<a href="', '<a href="#" data-exhref="', $link);
            $link = str_replace('rel="tag"', 'rel="nofollow noindex"', $link);
            return $link;
        }, $links );
    }
}
