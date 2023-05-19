<?php
/**
 * GForms extension
 *
 * @package Oceaa
 */

namespace Oceaa;

class GForms_Extension {

    function __construct() {

        add_filter( 'gform_confirmation_anchor', '__return_true' );
        add_filter( 'gform_notification', array($this, 'notification_automatically_attach_file_from_post'), 10, 3 );
    }

    public function notification_automatically_attach_file_from_post($notification, $form, $entry) {

        $attached_file_id = get_field('attached_file', $entry['post_id']);

        if ( empty($attached_file_id) )
            return $notification;

        $attached_file_path = get_attached_file($attached_file_id);

        if ( ! file_exists($attached_file_path) )
            return $notification;

        if ( ! isset($notification['attachments']) || ! is_array($notification['attachments']) )
            $notification['attachments'] = array();

        $notification['attachments'][] = $attached_file_path;

        return $notification;
    }
}
