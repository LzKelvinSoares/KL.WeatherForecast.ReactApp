import { GetStaticProps } from 'next';
import HomeScreen from '../src/screens/HomeScreen';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  };
};

export default HomeScreen;
