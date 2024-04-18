<?php
/**
 * Enqueue trait
 *
 * @package SECLGroup
 */

namespace SECLGroup;

trait Enqueue {

    private $registered = false;
    private $strategy = null;
    private $theme = null;

    public function enqueue( $strategy = 'enqueue' ) {

        $this->theme = strtolower(wp_get_theme()->get('Name'));
        $this->strategy = get_theme_mod($this->theme.'_enqueue_strategy', $strategy);

        add_action( 'customize_preview_init', array($this, 'select_action') );
        add_action( 'wp_enqueue_scripts', array($this, 'register'), 11 );
        add_action( 'wp_enqueue_scripts', array($this, 'select_action'), 12 );
        add_action( 'login_header', array($this, 'select_action') );
        add_action( 'admin_head', array($this, 'select_action') );
        add_action( 'wp_footer', array($this, 'select_action') );
        add_action( 'customize_register', function ($wp_customize) {
            $this->customize_register($wp_customize);
        } );
    }

    public function register() {

        if ($this->registered) return;

        $this->registered = true;

        $version = wp_get_theme()->get('Version');
        $uri = get_template_directory_uri();
        $dir = get_template_directory();
        $build = include( "$dir/js/build/index.asset.php" );

        wp_register_style( $this->theme.'-style', get_stylesheet_uri(), array(), $version );
        wp_register_style( $this->theme.'-login-style', "$uri/login-style.css", array(), $version );
        wp_register_style( $this->theme.'-admin-style', "$uri/admin-style.css", array(), $version );
        wp_register_script( $this->theme.'-customizer', "$uri/js/customizer.js", array( 'customize-preview' ), $version, array( 'in_footer' => true ) );
        wp_register_script( $this->theme.'-component-loader', "$uri/js/component-loader.js", array(), $version, array( 'in_footer' => false ) );
        wp_register_script( $this->theme.'-component-list', "$uri/js/component-list.js", array($this->theme.'-component-loader'), $version, array( 'in_footer' => true ) );
        wp_register_script( $this->theme.'-build-index', "$uri/js/build/index.js", $build['dependencies'], $build['version'], array( 'in_footer' => true ) );
    }

    public function select_action() {

        switch ( current_action() ) {
            case 'customize_preview_init':
                wp_enqueue_script( $this->theme.'-customizer' );
                    break;
            case 'login_header':
                wp_enqueue_style( $this->theme.'-login-style' );
                    break;
            case 'admin_head':
                wp_enqueue_style( $this->theme.'-admin-style' );
                    break;
            case 'wp_enqueue_scripts':
                if ( $this->strategy == 'inline') {
                    inline_style( '/style.css' );
                    inline_script( '/js/component-loader.js' );
                    $this->inline_scripts();
                } else {
                    wp_enqueue_style( $this->theme.'-style' );
                    wp_style_add_data( $this->theme.'-style', 'rtl', 'replace' );
                    wp_enqueue_script( $this->theme.'-component-loader' );
                    $this->inline_scripts();
                    wp_enqueue_script( $this->theme.'-component-list' );
                    wp_enqueue_script( $this->theme.'-build-index' );
                }
                    break;
            case 'wp_footer':
                if ( $this->strategy == 'inline') {
                    inline_script( '/js/component-list.js' );
                    inline_script( '/js/build/index.js' );
                }
                    break;
        }
    }

    private function inline_scripts() {

        $scripts = array(
            $this->theme.'-component-loader' => sprintf(
                "window.ajaxurl = window.ajaxurl || '%s';
                window.ComponentLoader.themeURL = '%s';
                window.ComponentLoader.themeVer = '%s';",
                esc_url(admin_url('admin-ajax.php')),
                esc_url(get_template_directory_uri()),
                wp_get_theme()->get('Version')
            )
        );

        foreach ( $scripts as $handle => $js ) {
            if ( $this->strategy == 'inline') {
                printf( "\n<script id=\"%s-js-after\">%s</script>\n", $handle, $js );
            } else {
                wp_add_inline_script( $handle, $js );
            }
        }
    }

    private function customize_register( $wp_customize ) {

        $wp_customize->add_setting( $this->theme.'_enqueue_strategy',array(
            'default' => 'enqueue',
        ));

        $wp_customize->add_section($this->theme.'_enqueue_section',array(
            'title' => 'Theme Scripts & Styles'
        ));

        $wp_customize->add_control( $this->theme.'_enqueue_control',array(
            'type' => 'radio',
            'choices'    => array(
                'enqueue' => 'Files',
                'inline' => 'Inline'
            ),
            'label' => __('Enqueue Strategy', $this->theme),
            'section' => $this->theme.'_enqueue_section',
            'settings' => $this->theme.'_enqueue_strategy',
        ));
    }

    /*

    private $enqueued_scripts = [];
    private $enqueued_styles = [];

    private function get_all_scripts_and_styles() {

        add_action( 'wp_print_scripts', function () {
            global $wp_scripts;
            foreach( $wp_scripts->queue as $handle ) {
                $this->enqueued_scripts[] = $wp_scripts->registered[$handle];
            }
        } );

        add_action( 'wp_print_styles', function () {
            global $wp_styles;
            foreach( $wp_styles->queue as $handle ) {
                $this->enqueued_styles[] = $wp_styles->registered[$handle];
            }
        } );
    }

    */
}
