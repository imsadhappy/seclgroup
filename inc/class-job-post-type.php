<?php
/**
 * Job Custom Post Type
 *
 * @package SECLGroup
 */

namespace SECLGroup;

class Job extends Post_Type {

    public $post_type = 'job';
    public $skey = 'page_for_jobs';
    public $slabel = 'Jobs Page';
    public $features = array('page_for_posts', 'archive_redirect');

    public function register() {

        $i18n = self::i18n();
        $slug = 'jobs';

        register_post_type(
            $this->post_type,
            array(
                'label'                 => __( 'Job', $i18n ),
                'description'           => __( 'Job Description', $i18n ),
                'labels'                => array(
                    'name'                  => __( 'Jobs', $i18n ),
                    'singular_name'         => __( 'Job', $i18n ),
                    'menu_name'             => __( 'Jobs', $i18n ),
                    'name_admin_bar'        => __( 'Jobs', $i18n ),
                    'archives'              => __( 'Job Archives', $i18n ),
                    'attributes'            => __( 'Display', $i18n ),
                    'all_items'             => __( 'All Jobs', $i18n ),
                    'add_new_item'          => __( 'Add New Job', $i18n ),
                    'add_new'               => __( 'Add New', $i18n ),
                    'new_item'              => __( 'New Job', $i18n ),
                    'edit_item'             => __( 'Edit Job', $i18n ),
                    'update_item'           => __( 'Update Job', $i18n ),
                    'view_item'             => __( 'View Job', $i18n ),
                    'view_items'            => __( 'View Job', $i18n ),
                    'search_items'          => __( 'Search Job', $i18n ),
                    'not_found'             => __( 'Not found', $i18n ),
                    'not_found_in_trash'    => __( 'Not found in Trash', $i18n ),
                    'insert_into_item'      => __( 'Insert into job', $i18n ),
                    'uploaded_to_this_item' => __( 'Uploaded to this job', $i18n ),
                    'items_list'            => __( 'Job list', $i18n ),
                    'items_list_navigation' => __( 'Job list navigation', $i18n ),
                    'filter_items_list'     => __( 'Filter jobs list', $i18n ),
                ),
                'menu_icon'             => 'dashicons-id-alt',
                'menu_position'         => 5,
                'supports'              => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
                'taxonomies'            => array( $this->post_type.'-tag' ),
                'show_in_rest'          => true,
                'hierarchical'          => false,
                'public'                => true,
                'show_ui'               => true,
                'show_in_menu'          => true,
                'show_in_rest'          => true,
                'show_in_admin_bar'     => true,
                'show_in_nav_menus'     => true,
                'can_export'            => true,
                'has_archive'           => true,
                'exclude_from_search'   => false,
                'publicly_queryable'    => true,
                'capability_type'       => 'page',
                'rewrite'               => array(
                    'slug' => $slug,
                    'with_front' => false
                )
            )
        );

        register_taxonomy(
            $this->post_type.'-tag',
            $this->post_type,
            array(
                'hierarchical' => false,
                'labels' => array(
                    'name' => __( 'Tags' ),
                    'singular_name' => __( 'Tag' ),
                    'search_items' =>  __( 'Search Tags' ),
                    'popular_items' => __( 'Popular Tags' ),
                    'all_items' => __( 'All Tags' ),
                    'parent_item' => null,
                    'parent_item_colon' => null,
                    'edit_item' => __( 'Edit Tag' ),
                    'update_item' => __( 'Update Tag' ),
                    'add_new_item' => __( 'Add New Tag' ),
                    'new_item_name' => __( 'New Tag Name' ),
                    'separate_items_with_commas' => __( 'Separate tags with commas' ),
                    'add_or_remove_items' => __( 'Add or remove tags' ),
                    'choose_from_most_used' => __( 'Choose from the most used tags' ),
                    'menu_name' => __( 'Tags' ),
                ),
                'show_ui' => true,
                'show_in_rest' => true,
                'update_count_callback' => '_update_post_term_count',
                'query_var' => true,
                'rewrite' => array( 'slug' => $this->post_type.'-tags' ),
            )
        );
    }
}
