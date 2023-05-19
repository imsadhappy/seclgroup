import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import { useBlockProps, InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { TextControl, Panel, PanelBody, PanelRow, Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import './editor.scss';

export default function edit( {attributes, setAttributes} ) {
	const blockProps = useBlockProps()

	const ALLOWED_MEDIA_TYPES = ['image']

	const imageData = useSelect((select) => {
		if (attributes.mediaId) {
			return select('core').getEntityRecord('postType', 'attachment', attributes.mediaId);

		} else {
			return false
		}
	}, [attributes]);

	useEffect(() => {
		if (imageData?.media_details) {
			setAttributes({
				mediaUrl: imageData.media_details.sizes.full.source_url
			})
		}
	}, [imageData])

	const style = () => {

		let styleObj = {}

		if (attributes?.mediaUrl) {
			
			styleObj.backgroundImage = 'url("' + attributes.mediaUrl + '")'
			
		}

		return styleObj

	}

	return [
		<InspectorControls key="mx-settings">
			<PanelBody title={__('Background Image', 'oceaa')} initialOpen={false}>
				<PanelRow>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({
								mediaId: media.id
							})}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							value={attributes.mediaId}
							render={({ open }) => (
								<Button
									icon="upload"
									text={attributes.mediaId ? 'Change Image' : 'Upload Image'}
									variant="secondary"
									onClick={open}
								/>
							)}
						/>
					</MediaUploadCheck>
				</PanelRow>
			</PanelBody>
		</InspectorControls>,
		<div 
			key="mx-main-content"
			{...blockProps}
		>
			<div
				className='mxltcs-main-banner-wrapper'
				data-image-id={attributes.mediaId}
				data-image-url={attributes.mediaUrl}
				style={style()}
			>
				<InnerBlocks />
			</div>
		</div>
	];
}
