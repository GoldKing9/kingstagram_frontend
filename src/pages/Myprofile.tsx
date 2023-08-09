import Avatar from "@mui/material/Avatar";
import NavigationBar from "../components/NavigationBar.tsx"
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container"


const Myprofile = () => {
  
  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
    },
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
    },
  ];
  
  return (
    <>
      <NavigationBar></NavigationBar>
      <Container 
        sx = {{ display: 'grid', 
        height: '100vh', 
        width: '800px',
        marginLeft: '200px'
        }}
        fixed
      >
        <Grid 
          container
        >
          <Grid item xs = {4}>
            <Avatar
              alt = "myProfilePhoto"
              sx={{ 
                width: '200px', 
                height: '200px', 
                bgcolor: 'gray[100]' 
              }}
            >
              ME
            </Avatar>
          </Grid>
          <Grid item xs = {8}>
            <Box sx={{ fontWeight: 'bold', ml: '100px' }}>
              <Grid container>
                <Grid item xs = {4}>
                  <Box component = 'div' fontSize = '20px' lineHeight = '40px' >hchunkim</Box>
                </Grid>
                <Grid item xs = {4}>
                  <Box component= 'button'>프로필 편집</Box>
                </Grid>
                <Grid item xs = {4}>
                  <Box component= 'button'>로그아웃</Box>
                </Grid>
                <Grid item xs = {4}>
                  <Box component = 'div' sx={{ mt: '15px' }}>게시물 0</Box>
                </Grid>
                <Grid item xs = {4}>
                  <Box component = 'div' sx={{ mt: '15px' }}>팔로워 163</Box>
                </Grid>
                <Grid item xs = {4}>
                  <Box component = 'div' sx={{ mt: '15px' }}>팔로우 161</Box>
                </Grid>
                <Grid item xs = {4}> 
                  <Box component = 'div' sx={{ mt: '20px' }}>김형준</Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>  
        </Grid>
        <Box 
          component = 'div' 
          sx={{ width: '300px', height: '100px', textAlign: 'left',  mt: '50px'}}
          >
          안녕
        </Box>
        <Box 
          component = 'div' 
          sx={{ 
            mt: '20px',
            borderTopStyle: 'solid',
            borderTopWidth: '1px',  
            pt: '20px',
            height: '60px',
            BorderColor: 'gray[100]'
          }}
        >  
          게시물
        </Box>
        <Grid container 
          sx = {{display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)',
          columnGap: '5px'
          }}
        >
          {itemData.map((item) => (
            <Grid item key={item.img}>
              <img
                src={`${item.img}?w=250&h=250&fit=crop&auto=format`}
                srcSet={`${item.img}?w=250&h=250&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </Grid>
          ))}
        </Grid>
      </Container>  
    </>
  );
};

export default Myprofile;