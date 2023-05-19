import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { __experimentalNumberControl as NumberControl, Panel, PanelBody, PanelRow } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import './editor.scss';
import metadata from './block.json';

export default function Edit({ attributes, setAttributes }) {

	const blockProps = useBlockProps();

	return [
		<InspectorControls key="mx-settings">

			{/* Default */}
			<Panel header="Default height">
				<PanelBody title="Default height" initialOpen={true}>
					<PanelRow>
						<NumberControl
							label={__('Default Height', 'oceaa')}
							value={parseInt(attributes.media_default)}
							onChange={(media_default) => setAttributes({ media_default })}
						/>
					</PanelRow>
				</PanelBody>
			</Panel>

			{/* <768 */}
			<Panel header="Media breakpoints">
				<PanelBody title="Set Height for devices" initialOpen={false}>

					<PanelRow>
						<NumberControl
							label={__('@media <768px', 'oceaa')}
							value={attributes.media_768}
							onChange={(media_768) => setAttributes({ media_768 })}
						/>
					</PanelRow>

					<PanelRow>
						<NumberControl
							label={__('@media <992px', 'oceaa')}
							value={attributes.media_992}
							onChange={(media_992) => setAttributes({ media_992 })}
						/>
					</PanelRow>

					<PanelRow>
						<NumberControl
							label={__('@media <1220px', 'oceaa')}
							value={attributes.media_1220}
							onChange={(media_1220) => setAttributes({ media_1220 })}
						/>
					</PanelRow>

					<PanelRow>
						<NumberControl
							label={__('@media <1500px', 'oceaa')}
							value={attributes.media_1500}
							onChange={(media_1500) => setAttributes({ media_1500 })}
						/>
					</PanelRow>

				</PanelBody>
			</Panel>

		</InspectorControls>,
		<div
			{...blockProps}
			key="mx-main-content"			
		>
			<ServerSideRender
				block={metadata.name}
				attributes={attributes}
			/>	
		</div>
	];
}
