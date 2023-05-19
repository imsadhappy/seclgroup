<?php

// Exit if accessed directly
if (!defined('ABSPATH')) exit;

class MXLTCSGutenberg
{

    public function registerBlocks()
    {

        // responsive spacer
        add_action( 'init', [$this, 'responsiveSpacer'] );

        // nested blocks
        add_action( 'init', [$this, 'nestedBlocks'] );

        // server side rendering
        add_action('init', [$this, 'serverSideRendering']);

    }

    // responsive spacer
    public function responsiveSpacer()
    {

        $asset_file = include('build/responsive-spacer/index.asset.php');

        // script for block
        wp_register_script(
            'mx_responsive_spacer_script',
            get_template_directory_uri() . '/gutenberg/build/responsive-spacer/index.js',
            $asset_file['dependencies'],
            $asset_file['version'],
            true
        );
        
        // handler
        // wp_enqueue_script(
        //     'mx_rsb_block_script',
        //     get_template_directory_uri() . '/gutenberg/src/responsive-spacer/handler.js',
        //     [],
        //     $asset_file['version'],
        //     true
        // );

        register_block_type(
            __DIR__ . '/build/responsive-spacer',
            [
                'api_version'       => 2,
                'category'          => 'design',
                'attributes'        => [
                    'media_default'   => [
                        'type' => 'string',
                        'default' => 100
                    ],
                    'media_768'   => [
                        'type' => 'string',
                        'default' => NULL
                    ],
                    'media_992'   => [
                        'type' => 'string',
                        'default' => NULL
                    ],
                    'media_1220'   => [
                        'type' => 'string',
                        'default' => NULL
                    ],
                    'media_1500'   => [
                        'type' => 'string',
                        'default' => NULL
                    ]
                ],
                'editor_script' => 'mx_responsive_spacer_script',
                'render_callback'   => [$this, 'responsive_spacer_dynamic_render_callback'],
                'skip_inner_blocks' => true,
            ]
        );

    }

    public function responsive_spacer_dynamic_render_callback($block_attributes)
    {
        ob_start();

        include  __DIR__ . '/src/responsive-spacer/callback.php';        

        return ob_get_clean();
    }

    // nested blocks
    public function nestedBlocks()
    {
        register_block_type( __DIR__ . '/build/nested-blocks' );

        // children blocks
        // block one
        register_block_type( __DIR__ . '/build/nested-blocks/child-blocks/block-one' );
    }

    // server side rendering
    public function serverSideRendering()
    {

        $asset_file = include('build/server-side-rendering/index.asset.php');

        // script for block
        wp_register_script(
            'mx_server_side_rendering_script',
            get_template_directory_uri() . '/gutenberg/build/server-side-rendering/index.js',
            $asset_file['dependencies'],
            $asset_file['version'],
            true
        );
        
        // handler
        wp_enqueue_script(
            'mx_ssr_block_script',
            get_template_directory_uri() . '/gutenberg/src/server-side-rendering/handler.js',
            [],
            $asset_file['version'],
            true
        );

        register_block_type(
            __DIR__ . '/build/server-side-rendering',
            [
                'api_version'       => 2,
                'category'          => 'design',
                'attributes'        => [
                    'postsNumber'   => [
                        'type' => 'string',
                        'default' => 40
                    ]
                ],
                'editor_script' => 'mx_server_side_rendering_script',
                'render_callback'   => [$this, 'server_side_rendering_dynamic_render_callback'],
                'skip_inner_blocks' => true,
            ]
        );
    }

    public function server_side_rendering_dynamic_render_callback($block_attributes)
    {
        ob_start();

        include  __DIR__ . '/src/server-side-rendering/callback.php';        

        return ob_get_clean();
    }

}

( new MXLTCSGutenberg() )->registerBlocks();