import Lottie from 'react-lottie';
import LoaderLottie from './Korensi Logo Loader.json';

function LoaderIcon({ width = 80, height = 80 }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoaderLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return <Lottie options={defaultOptions} height={height} width={width} />;
}

export default LoaderIcon;
