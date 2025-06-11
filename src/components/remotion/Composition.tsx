import { Sequence, AbsoluteFill, Img, useVideoConfig, useCurrentFrame, interpolate } from 'remotion';
import React from 'react';

type Scene = {
	image: string;
	text: string;
	sceneNumber: number;
};

type Props = {
	scenes: Scene[];
	title: string;
};

export const MyComposition: React.FC<Props> = ({ scenes, title }) => {
	const { fps } = useVideoConfig();

	return (
		<>
			{scenes.map((scene, index) => (
				<Sequence
					key={scene.sceneNumber}
					from={index * 90}
					durationInFrames={90}
				>
					<SceneComponent image={scene.image} text={scene.text} />
				</Sequence>
			))}
		</>
	);
};

const SceneComponent: React.FC<{ image: string; text: string }> = ({ image, text }) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

	return (
		<AbsoluteFill style={{ backgroundColor: 'black' }}>
			<Img
				src={image}
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					bottom: 100,
					left: 40,
					right: 40,
					color: 'white',
					fontSize: 36,
					lineHeight: 1.5,
					opacity,
					textShadow: '2px 2px 10px rgba(0,0,0,0.8)',
				}}
			>
				{text}
			</div>
		</AbsoluteFill>
	);
};
