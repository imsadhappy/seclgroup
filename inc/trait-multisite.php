<?php
/**
 * Multisite trait
 *
 * @package SECLGroup
 */

namespace SECLGroup;

if ( ! defined( 'ABSPATH' ) ) {
    http_response_code(403);
	exit; // Exit if accessed directly.
}

trait Multisite {

    public function setup_multisite() {

        $this->use_shared_uploads();
    }

    private function use_shared_uploads() {

        /**
         * Force all network uploads to reside in "wp-content/uploads", and by-pass
         * "files" URL rewrite for site-specific directories.
         * 
         * @link    http://wordpress.stackexchange.com/q/147750/1685
         * 
         * @param   array   $dirs
         * @return  array
         */
        add_filter( 'upload_dir', function ( $dirs ) {

            $dirs['baseurl'] = network_site_url( '/wp-content/uploads' );
            $dirs['basedir'] = ABSPATH . 'wp-content/uploads';
            $dirs['path'] = $dirs['basedir'] . $dirs['subdir'];
            $dirs['url'] = $dirs['baseurl'] . $dirs['subdir'];

            return $dirs;
        } );
    }
}
