<?php
/**
 * WPCF7 trait
 *
 * @package SECLGroup
 */

namespace SECLGroup;

if ( ! defined( 'ABSPATH' ) ) {
    http_response_code(403);
	exit; // Exit if accessed directly.
}

trait WPCF7 {

    public function use_wpcf7_popup() {

        add_action( 'wp_ajax_wpcf7_popup', function(){
            $this->wpcf7_popup();
        } );
        add_action( 'wp_ajax_nopriv_wpcf7_popup', function(){
            $this->wpcf7_popup();
        } );
    }

    public function defer_wpcf7_scripts() {

        add_filter( 'script_loader_tag', function ( $tag, $handle ) {

            $matches = array_filter(['google-recaptcha', 'contact-form-7', 'wpcf7-recaptcha'],
                                    fn($x) => false !== strpos($handle, $x));

            return empty($matches) ? $tag : str_replace( ' src', ' defer="defer" src', $tag );
        }, 10, 2 );
    }

    protected function wpcf7_popup() {

        exit(do_shortcode(sprintf('[contact-form-7 id="%d"]', intval($_REQUEST['form_id']))));
    }
}
