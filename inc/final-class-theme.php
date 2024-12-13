<?php
/**
 * Theme
 *
 * @package SECLGroup
 */

namespace SECLGroup;

include 'exit.php';

final class Theme {

    function __construct() {

        $this->add_upload_mimes( array( 'avif' => 'image/avif',
                                        'avifs' => 'image/avif-sequence',
                                        'heic' => 'image/heic',
                                        'heif' => 'image/heif',
                                        'heics' => 'image/heic-sequence',
                                        'heifs' => 'image/heif-sequence' ) );

        $this->remove_from_admin_bar( array('customize', 'updates', 'comments') );

        add_action( 'wp_head', array($this, 'preload_fonts'), -1 );
        add_action( 'after_setup_theme', array($this, 'setup') );
        add_action( 'widgets_init', array($this, 'register_widgets') );
        add_action( 'after_setup_theme', array($this, 'register_menus') );
        add_action( 'after_setup_theme', function() {
            load_theme_textdomain( 'seclgroup', get_template_directory() . '/languages' );
        } );
        add_action( 'after_setup_theme', function() {
            remove_action( 'wp_body_open', 'wp_global_styles_render_svg_filters' );
            remove_action( 'in_admin_header', 'wp_global_styles_render_svg_filters' );
        } );
        add_filter( 'excerpt_length', fn() => 25 );
        add_filter( 'excerpt_more', fn($more) => preg_replace('/\[|\]/', '', $more));
        add_filter( 'max_srcset_image_width', '__return_false' );
        add_filter( 'wp_calculate_image_srcset', '__return_false' );
        add_filter( 'the_category', array($this, 'the_category_filter') );
        add_filter( 'get_search_form', array($this, 'get_search_form_filter') );
        add_filter( 'term_links-project-category', array($this, 'project_category_term_links') );
        add_filter( 'render_block', array($this, 'social_link_svg_path_filter'), 999, 2 );
        add_filter( 'render_block', array($this, 'block_img_loading_lazy_filter'), 999, 2 );
        add_filter( 'post_thumbnail_html', array($this, 'img_loading_lazy_filter'), 999 );
        add_filter( 'nav_menu_link_attributes', array($this, 'localize_rel_atts') );
    }

    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which
     * runs before the init hook. The init hook is too late for some features, such
     * as indicating support for post thumbnails.
     */
    public function setup() {

        add_theme_support( 'editor-styles' );
        add_editor_style( 'editor-style.css' );

        add_theme_support( 'title-tag' );
        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'customize-selective-refresh-widgets' );
        add_theme_support( 'html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        ) );
        add_theme_support( 'custom-logo', array(
            'flex-width'  => true,
            'flex-height' => true,
        ) );
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

    private function add_upload_mimes( $additional_mime_types = array() ) {

        add_filter( 'upload_mimes', function($mime_types) use ($additional_mime_types ) {

            foreach ($additional_mime_types  as $key => $value)
                $mime_types[$key] = $value;

            return $mime_types;
        } );
    }

    private function remove_from_admin_bar( $nodes = array() ) {

        add_action( 'wp_before_admin_bar_render', function () use ($nodes) {

            /** @var \WP_Admin_Bar $wp_admin_bar */
            global $wp_admin_bar;

            foreach ( $nodes as $node )
                $wp_admin_bar->remove_node($node);
        } );
    }

    public function preload_fonts() {

        foreach ( array('HalvarBreit-Md','HalvarBreit-Rg') as $fset ) {
            printf('<link rel="preload" as="font" type="font/woff2" crossorigin href="%s/assets/fonts/%s.woff2">'."\n",
                    get_template_directory_uri(),
                    $fset);
        }
    }
    
    /**
     * Replace URL for cat|tag|tax (if is current)
     * to blog URL - making it a x link (i.e. return to blog)
     *
     * @param string $thelist
     *
     * @return string
     */
    public function the_category_filter( $thelist ) {

        if (!is_category() && !is_tag() && !is_tax())
            return $thelist;
        
        $blog_id = get_option('page_for_posts');
        
        if (!$blog_id) return $thelist;
        
        $blog_path = str_replace( home_url(), '', get_permalink( $blog_id ) );

        return str_replace( get_request_uri().'" rel="', 
                            $blog_path.'" rel="current ', 
                            $thelist );
    }

    public function get_search_form_filter( $form ) {

        $location = single_post_title( '', false );

        if ( empty($location) )
            $location = post_type_archive_title( '', false );

        if ( empty($location) )
            $location = single_term_title( '', false );

        $old_action = esc_url( home_url( '/' ) );
        $new_action = esc_url( get_post_type_archive_link( 'post' ) );
        //$old_placeholder = sprintf('placeholder="%s"', esc_attr_x( 'Search &hellip;', 'placeholder' ));
        //$new_placeholder = sprintf('placeholder="%s %s"', esc_attr_x( 'Search in', 'seclgroup' ), esc_attr($location));

        $form = str_replace($old_action, $new_action, $form);

        //if ( ! empty($location) )
            //$form = str_replace($old_placeholder, $new_placeholder, $form);

        return $form;
    }

    public function project_category_term_links( $links ) {

        return array_map( function($link){
            $link = str_replace('<a href="', '<a href="#" data-exhref="', $link);
            $link = str_replace('rel="tag"', 'rel="nofollow noindex"', $link);
            return $link;
        }, $links );
    }

    public function social_link_svg_path_filter( $block_content, $block ) {

        if ( isset($block['blockName']) && "core/social-link" === $block['blockName'] ) {
            $block_content = str_replace('/></svg>', '></path></svg>', $block_content);
        }

        return $block_content;
    }

    public function block_img_loading_lazy_filter( $block_content, $block ) {

        $image_blocks = array('core/image', 'core/cover', 'core/post-featured-image');

        if ( isset($block['blockName']) && in_array($block['blockName'], $image_blocks) ) {
            $block_content = $this->img_loading_lazy_filter($block_content);
        }

        return $block_content;
    }

    public function img_loading_lazy_filter( $html ) {

        return strpos($html, 'loading=') === false && strpos($html, 'fetchpriority=') === false ?
                str_replace('<img ', '<img loading="lazy" ', $html) :
                $html;
    }

    public function localize_rel_atts ( $atts ) {

        /** for composer.json make-pot script */
        $localize = [
            __('Back to menu', 'seclgroup')
        ];

        if (isset($atts['rel']) && !empty($atts['rel'])) {
            $atts['rel'] = esc_attr__($atts['rel'], 'seclgroup');
        }

        return $atts;
    }
}
