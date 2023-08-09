import NavigationBar from "../components/NavigationBar";
import InfiniteScrollComponent from "../components/InfiniteScroll";
import { styled } from '@mui/system';

const Container = styled('div')({
    display: 'flex',
    height: '100vh'
});


const Feed = () => {
    return (
        <Container>
            <NavigationBar />
            <InfiniteScrollComponent />
        </Container>
    );
};

export default Feed;