<?php
/**
 * WPCF7 trait
 *
 * @package SECLGroup
 */

namespace SECLGroup;

trait WPCF7 {

    public function use_wpcf7_popup() {

        add_action( 'wp_ajax_wpcf7_popup', function(){
            $this->wpcf7_popup();
        } );
        add_action( 'wp_ajax_nopriv_wpcf7_popup', function(){
            $this->wpcf7_popup();
        } );
    }

    protected function wpcf7_popup() {

        exit(do_shortcode(sprintf('[contact-form-7 id="%d"]', intval($_REQUEST['form_id']))));
    }
}
