"use client"

import { useEffect, useRef } from 'react';

const VideoFeed = () => {
    const videoRef = useRef<null | HTMLVideoElement>(null);
    const canvasRef = useRef<null | HTMLCanvasElement>(null);

    useEffect(() => {
        const getVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (stream) {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.onplay = () => {
                            const canvas = canvasRef.current;
                            const context = canvas?.getContext('2d');

                            const frameRate = 30;
                            // setInterval(() => {
                            //     if (videoRef.current && videoRef.current.videoWidth && canvas) {
                            //         canvas.width = videoRef.current.videoWidth;
                            //         canvas.height = videoRef.current.videoHeight;
                            //         context?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                            //     }
                            // }, 1000 / frameRate);
                        }
                        videoRef.current.play();
                    }
                }
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        };
        getVideo();
    }, []);

    return (
        <div>
            <video ref={videoRef} />
            {/* <canvas ref={canvasRef} /> */}
        </div>
    );
};

export default VideoFeed;