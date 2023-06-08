<?php
/**
 * Theme
 *
 * @package SECLGroup
 */

namespace SECLGroup;

final class Theme {

    public $i18n;

    use Admin, Updater;

    function __construct() {

        $this->i18n = strtolower(__NAMESPACE__);

        add_filter( 'max_srcset_image_width', '__return_false' );
        add_filter( 'wp_calculate_image_srcset', '__return_false' );

        add_action( 'after_setup_theme', array($this, 'setup') );
        add_action( 'customize_preview_init', array($this, 'enqueue') );
        add_action( 'wp_enqueue_scripts', array($this, 'enqueue') );
        // add_action( 'admin_enqueue_scripts', array($this, 'admin_enqueue') );
        add_action( 'login_header', array($this, 'enqueue') );
        add_action( 'admin_head', array($this, 'enqueue') );
        add_action( 'after_setup_theme', array($this, 'register_menus') );
        add_action( 'widgets_init', array($this, 'register_widgets') );

        $this->check_updates();
        $this->disable_comments();
        $this->avif_support();
        $this->remove_from_admin_bar( array('customize', 'updates', 'comments') );
        $this->page_for_terms_and_conditions();
        $this->can_load_more(array('post', 'job', 'search'));
        $this->can_count_posts(array('job'));
    }

    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which
     * runs before the init hook. The init hook is too late for some features, such
     * as indicating support for post thumbnails.
     */
    public function setup() {

        load_theme_textdomain( $this->i18n, get_template_directory() . '/languages' );

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
    }

    /**
     * Enqueue scripts and styles.
     */
    public function enqueue() {

        $version = wp_get_theme()->get('Version');
        $uri = get_template_directory_uri();

        switch ( current_action() ) {
            case 'customize_preview_init':
                wp_enqueue_script( "{$this->i18n}-customizer", "$uri/js/customizer.js", array( 'customize-preview' ), $version, true );
                    break;
            case 'login_header':
                wp_enqueue_style( 'theme-login-style', "$uri/login-style.css", array(), $version );
                    break;
            case 'admin_head':
                wp_enqueue_style( 'theme-admin-style', "$uri/admin-style.css", array(), $version );
                wp_enqueue_script( 'theme-scripts', "$uri/js/scripts.js", array(), $version );
                //wp_enqueue_script( 'theme-side-image-slider', "$uri/js/side-image-slider.js", array(), $version, true );
                    break;
            default:
                wp_enqueue_style( 'theme-style', get_stylesheet_uri(), array(), $version );
                wp_enqueue_style( 'animate-wow', "$uri/assets/css/animate.min.css", array(), $version );
                wp_style_add_data( 'theme-style', 'rtl', 'replace' );
                wp_enqueue_script( 'theme-dotdotdot', "$uri/js/dotdotdot.js", array(), $version, true );
                wp_enqueue_script( 'wow-script', "$uri/js/wow.min.js", array(), $version );
                wp_enqueue_script( 'theme-scripts', "$uri/js/scripts.js", array(), $version, true );
                wp_enqueue_script( 'theme-side-image-slider', "$uri/js/side-image-slider.js", array(), $version, true );
                wp_add_inline_script( 'theme-scripts', sprintf("window.ajaxurl = window.ajaxurl || '%s';",
                    esc_url(admin_url('admin-ajax.php'))
                ) );
                    break;
        }
    }

    /**
     * Register menus.
     */
    public function register_menus() {

        register_nav_menus( array(
            'menu-1' => esc_html__( 'Header', $this->i18n ),
        ) );

        register_nav_menus( array(
            'menu-2' => esc_html__( 'Footer Column', $this->i18n ) . ' 1',
        ) );

        register_nav_menus( array(
            'menu-3' => esc_html__( 'Footer Column', $this->i18n ) . ' 2',
        ) );

        register_nav_menus( array(
            'menu-4' => esc_html__( 'Footer Column', $this->i18n ) . ' 3',
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
                'name'          => esc_html__( 'Footer Column', $this->i18n ) . ' 4',
                'id'            => "footer-column-4",
                'description'   => esc_html__( 'Add widgets here.', $this->i18n ),
                'before_widget' => '<div id="%1$s" class="widget %2$s">',
                'after_widget'  => '</div>',
                'before_title'  => '<div class="widget-title">',
                'after_title'   => '</div>',
            )
        );

        register_sidebar(
            array(
                'name'          => esc_html__( 'Footer Column', $this->i18n ) . ' 5',
                'id'            => "footer-column-5",
                'description'   => esc_html__( 'Add widgets here.', $this->i18n ),
                'before_widget' => '<div id="%1$s" class="widget %2$s">',
                'after_widget'  => '</div>',
                'before_title'  => '<div class="widget-title">',
                'after_title'   => '</div>',
            )
        );
    }
}
