<?php
/**
 * WPCF7
 *
 * @package SECLGroup
 */

namespace SECLGroup;

include 'exit.php';

class WPCF7 extends Factory {

    private $defered_scripts = array(
        'google-recaptcha', 
        'contact-form-7', 
        'wpcf7-recaptcha',
        'swv'
    );

    protected function defer_scripts() {

        add_filter( 'script_loader_tag', function ( $tag, $handle ) {

            $matches = array_filter($this->defered_scripts, fn($x) => false !== strpos($handle, $x));

            return empty($matches) ? $tag : str_replace( ' src=', ' async defer src=', $tag );
        }, 10, 2 );
    }

    protected function setup_popup() {

        add_action( 'wp_ajax_wpcf7_popup', function(){
            $this->popup_shortcode();
        } );

        add_action( 'wp_ajax_nopriv_wpcf7_popup', function(){
            $this->popup_shortcode();
        } );
    }

    private function popup_shortcode() {

        exit(do_shortcode(sprintf('[contact-form-7 id="%d"]', intval($_REQUEST['form_id']))));
    }
}
