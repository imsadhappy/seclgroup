<?php
/**
 * Updater trait
 *
 * @package SECLGroup
 */

namespace SECLGroup;

if ( ! defined( 'ABSPATH' ) ) {
    http_response_code(403);
	exit; // Exit if accessed directly.
}

trait Updater {

    public function check_updates() {

        global $current_theme_github;

        if ( empty($current_theme_github) )
            return;

        $this->{'theme'} = get_stylesheet();
        $this->{'current_version'} = wp_get_theme()->get('Version');

        foreach ( $current_theme_github as $key => $value )
            $this->{$key} = $value;

        add_filter( 'pre_set_site_transient_update_themes', array($this, 'get_updates'), 100, 1);
        add_filter( 'upgrader_pre_download', array( $this, 'pre_download' ) );
        add_filter( 'upgrader_install_package_result', array( $this, 'install' ), 1, 2 );
    }

    public function get_updates( $updates ) {

        $release_url = "https://api.github.com/repos/{$this->author_name}/{$this->repository_name}/releases/latest";
        $request = wp_remote_get( $release_url, $this->add_authorization_header() );
        $response_body = wp_remote_retrieve_body($request);
        $response_code = wp_remote_retrieve_response_code($request);

        if ( intval($response_code) != 200 || empty($response_body) )
            return $updates;

        $package = @json_decode($response_body);

        if ( ! is_object($package) || ! property_exists($package, 'tag_name') )
            return $updates;

        $latest_version = filter_var($package->tag_name, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

        if ( version_compare($latest_version, $this->current_version, '>') )
            $updates->response[$this->theme] = array(
                'theme'       => $this->theme,
                'new_version' => $latest_version,
                'url'         => "https://github.com/{$this->author_name}/{$this->repository_name}",
                'package'     => $package->zipball_url,
            );

        return $updates;
    }

    public function pre_download( $reply ) {

        add_filter( 'http_request_args', array( $this, 'with_authorization_header' ), 15, 2 );

        return $reply;
    }

    public function install( $result, $hook_extra ) {

        if ( ! is_array($result) ||
             ! is_array($hook_extra) ||
             ! isset($hook_extra['theme']) ||
             $hook_extra['theme'] !== $this->theme )
                return $result;

         $dir = $result['local_destination'] . '/' . $this->theme;

        if ( isset($result['destination']) && $result['destination'] != $dir ) {

            global $wp_filesystem;

            $wp_filesystem->move( $result['destination'], $dir );
        }

        // Ensure stylesheet name hasn't changed after the upgrade:
        if ( $this->theme !== $result['destination_name'] ) {

            wp_clean_themes_cache();

            switch_theme( $this->theme );
        }

        $result['destination'] = $dir;
        $result['destination_name'] = $this->theme;

        return $result;
    }

    public function with_authorization_header ( $args, $url ) {

         if ( strpos($url, "https://api.github.com/repos/{$this->author_name}/{$this->repository_name}") === false )
            return $args;

        $args = $this->add_authorization_header($args);

        if ( ! empty($args['filename']) )
            remove_filter( 'http_request_args', array( $this, 'with_authorization_header' ) );

        return $args;
    }

    private function add_authorization_header ( $args = array() ) {

        if ( ! isset($args['headers']) || ! is_array($args['headers']) )
            $args['headers'] = array();

        if (!empty($this->repository_token)) //if public repository
            $args['headers']['Authorization'] = "token {$this->repository_token}";

        return $args;
    }
}
