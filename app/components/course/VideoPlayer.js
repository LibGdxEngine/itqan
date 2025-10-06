import ReactPlayer from 'react-player'

export default function VideoPlayer({url}) {
    return (
        <div
            className="aspect-video w-full rounded-xl overflow-hidden shadow-lg mb-6 bg-black"
            onContextMenu={(e) => e.preventDefault()}
        >
            <ReactPlayer
                src={url}
                width="100%"
                height="100%"
                controls
                config={{
                    youtube: {
                        color: 'white',
                    },
                    file: {
                        attributes: {
                            controlsList: "nodownload",
                            disablePictureInPicture: true,
                        },
                    },
                }}
            />
        </div>
    );
}
