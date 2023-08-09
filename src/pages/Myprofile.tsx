import Avatar from "@mui/material/Avatar";
import NavigationBar from "../components/NavigationBar.tsx"
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container"


const Myprofile = () => {
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
          sx={{ width: '300px', height: '100px', textAlign: 'left'}}
          >
          안녕
        </Box>
        <Box 
          component = 'div' 
          sx={{ 
            mt: '20px',
            borderTopColor: 'lightgray[100]',
            borderTopStyle: 'solid',
            borderTopWidth: '1px',  
            pt: '20px',
            height: '60px' 
          }}
        >  
          게시물
        </Box>
        
      </Container>  
    </>
  );
};

export default Myprofile;