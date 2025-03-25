import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Avatar() {
  const { scene } = useGLTF('/avatar.glb');
  return <primitive object={scene} scale={1} />;
}

function AvatarScene() {
  return (
    <video
        className="relative top-0 left-0 w-full h-full object-cover"
        src="/robo.mp4"
        autoPlay
        loop
        muted
      />
  );
}

export default AvatarScene;
