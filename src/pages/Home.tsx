import { Button, DatePicker } from 'antd';

const Home = () => {
    return (<>
        <h1>Home Page</h1>
        <Button type="primary">PRESS ME</Button>
        <DatePicker placeholder="select date" />
    </>);
};

export default Home;