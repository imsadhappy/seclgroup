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

	// BG image
	const imageBGData = useSelect((select) => {
		if (attributes.mediaBGId) {
			return select('core').getEntityRecord('postType', 'attachment', attributes.mediaBGId);

		} else {
			return false
		}
	}, [attributes]);

	useEffect(() => {
		if (imageBGData?.media_details) {
			setAttributes({
				mediaBGUrl: imageBGData.media_details.sizes.full.source_url
			})
		}
	}, [imageBGData]);

	// circle image
	const imageCircleData = useSelect((select) => {
		if (attributes.mediaCircleId) {
			return select('core').getEntityRecord('postType', 'attachment', attributes.mediaCircleId);

		} else {
			return false
		}
	}, [attributes]);

	useEffect(() => {
		if (imageCircleData?.media_details) {
			setAttributes({
				mediaCircleUrl: imageCircleData.media_details.sizes.full.source_url
			})
		}
	}, [imageCircleData]);

	// move down image
	const imageMoveDownData = useSelect((select) => {
		if (attributes.mediaMoveDownId) {
			return select('core').getEntityRecord('postType', 'attachment', attributes.mediaMoveDownId);

		} else {
			return false
		}
	}, [attributes]);

	useEffect(() => {
		if (imageMoveDownData?.media_details) {
			setAttributes({
				mediaMoveDownUrl: imageMoveDownData.source_url
			})
		}
	}, [imageMoveDownData]);

	// style
	const style = () => {

		let styleObj = {}

		if (attributes?.mediaBGUrl) {
			
			styleObj.backgroundImage = 'url("' + attributes.mediaBGUrl + '")'
			
		}

		return styleObj

	}

	const css = `
		.mxltcs-main-banner-title em {
			background-image: url("${attributes?.mediaCircleUrl}");
		}
		.wp-block-mxltcs-main-move-down a {
			background-image: url("${attributes?.mediaMoveDownUrl}");
		}
	`;

	return [
		<InspectorControls key="mx-settings">

			<PanelBody title={__('Background Image', 'oceaa')} initialOpen={false}>
				
				<PanelRow>
					<MediaUploadCheck>

						<div className='mx-media-button-wrapper'>

							{
								attributes?.mediaBGUrl ?
								(<div><img src={attributes.mediaBGUrl} /></div>) :
								(<></>)
							}
							<MediaUpload
								onSelect={(mediaBG) => setAttributes({
									mediaBGId: mediaBG.id
								})}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								value={attributes.mediaBGId}
								render={({ open }) => (
									<Button
										icon="upload"
										text={attributes.mediaBGId ? 'Change Background Image' : 'Upload Background Image'}
										variant="secondary"
										onClick={open}
									/>
								)}
							/>

						</div>

					</MediaUploadCheck>
				</PanelRow>

			</PanelBody>

			<PanelBody title={__('Circle Image', 'oceaa')} initialOpen={false}>
				<PanelRow>
					<MediaUploadCheck>

						<div className='mx-media-button-wrapper'>

							{
								attributes?.mediaCircleUrl ?
								(<div><img src={attributes.mediaCircleUrl} /></div>) :
								(<></>)
							}

							<MediaUpload
								onSelect={(media) => setAttributes({
									mediaCircleId: media.id
								})}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								value={attributes.mediaCircleId}
								render={({ open }) => (
									<Button
										icon="upload"
										text={attributes.mediaCircleId ? 'Change Circle Image' : 'Upload Circle Image'}
										variant="secondary"
										onClick={open}
									/>
								)}
							/>

						</div>

					</MediaUploadCheck>
				</PanelRow>

			</PanelBody>

			<PanelBody title={__('Move Down Image', 'oceaa')} initialOpen={false}>
				<PanelRow>
					<MediaUploadCheck>

						<div className='mx-media-button-wrapper'>

							{
								attributes?.mediaMoveDownUrl ?
								(<div><img src={attributes.mediaMoveDownUrl} /></div>) :
								(<></>)
							}

							<MediaUpload
								onSelect={(media) => setAttributes({
									mediaMoveDownId: media.id
								})}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								value={attributes.mediaMoveDownId}
								render={({ open }) => (
									<Button
										icon="upload"
										text={attributes.mediaMoveDownId ? 'Change Move Down Image' : 'Upload Move Down Image'}
										variant="secondary"
										onClick={open}
									/>
								)}
							/>

						</div>

					</MediaUploadCheck>
				</PanelRow>
			</PanelBody>

		</InspectorControls>,
		<div 
			key="mx-main-content"
			{...blockProps}
			data-image-id={attributes.mediaBGId}
			data-image-url={attributes.mediaBGUrl}
			data-image-circle-url={attributes.mediaCircleUrl}
			data-image-circle-id={attributes.mediaCircleId}
			data-image-move-down-id={attributes.mediaMoveDownId}
			data-image-move-down-url={attributes.mediaMoveDownUrl}
			style={style()}
			className="mxltcs-main-banner-wrapper"
		>
			<style>
				{css}
			</style>
			<InnerBlocks />
		</div>
	];
}
