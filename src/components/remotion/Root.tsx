'use client';

import React, { useEffect } from 'react';
import { Player } from '@remotion/player';
import { MyComposition } from './Composition';

import useFileStore from '@/zustand/useFileStore';

export const RemotionRoot: React.FC = () => {
    const { currentFile } = useFileStore();

    useEffect(() => {
        console.log(currentFile);
    }, [currentFile]);

    if (!currentFile?.scenes) {
        return <p className="text-white text-center">Loading video...</p>;
    }

    return (
        <Player
            component={MyComposition}
            durationInFrames={currentFile.scenes.length * 90}
            fps={30}
            compositionWidth={720}    // Use these only
            compositionHeight={1280}  // Use these only
            controls
            autoPlay
            loop
            inputProps={{
                scenes: currentFile.scenes,
                title: currentFile.title,
            }}
        />
    );
};
