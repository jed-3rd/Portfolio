import React from 'react';
import './App.scss';

import { Divider, Box, Popover, Typography, Grid, createTheme, ThemeProvider, CssBaseline } from '@mui/material';

import SkillGroup from './components/skillGroup/skillGroup';
import ProjectWrapper from './components/projectWrapper/projectWrapper';

import { programmingLanguages, frameworkPack, devTools, softSkills, toolsProg } from './data/skills';
import projectData from './data/projects';

function App() {

  const [infoAnchor, setInfoAnchor] = React.useState<HTMLButtonElement | null>(null);

  const handleInfoClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setInfoAnchor(event.currentTarget);
  }

  const handleInfoClose = () => {
    setInfoAnchor(null);
  }

  const [skillList, updateSkillList] = React.useState<string[]>([]);

  const handleSkillClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (skillList.indexOf(event.currentTarget.id) === -1) {
      updateSkillList(skillList.concat([event.currentTarget.id]));
    } else {
      updateSkillList(skillList.filter(skill => skill !== event.currentTarget.id))
    }
  }

  const skillCheck = (skill: string) => {
    return skillList.indexOf(skill) === -1 ? false : true
  }

  const open = Boolean(infoAnchor)

  const id = open ? 'info' : undefined;

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2'
      },
      secondary: {
        main: '#08D665'
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='AppBody'>
        <Box className="AppWrapper" sx={{ display: 'flex'}}>
          <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: '100%' } }}>
            <section>
              <h1 className='Title'>Jed Codes</h1>
              {/*
              <Button
                variant="contained"
                onClick={()=> window.open(require('./images/JamesDenbowResume2023.pdf'), '_blank')}
                sx={{
                  float: 'right',
                  position: 'relative',
                  left: 0,
                  bottom: 50,
                }}
              >
                My Resume
              </Button>
              */}
              <h2 className="SubTitle">Software Engineer</h2>
              <p className="Description">Hi, my name is Jed and I'm a self-motivated Software Engineer with a large amount of experience and passion for Leadership. I have a wide array of knowledge and excitement for computer science and a background working with and managing small teams for effective, streamlined performance. Welcome to my personal portfolio.</p>
            </section>
            <Divider color="gray" />
            <section style={{marginBottom: "20px"}}>
              <h5 className='SectionTitle'>
                My Skills 
                <sup aria-describedby={id} onClick={handleInfoClick} className="InfoSymb">
                  &#128712;
                </sup>
              </h5>
              <Popover
                id={id}
                open={open}
                anchorEl={infoAnchor}
                onClose={handleInfoClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Typography sx={{ p: 2 }}>Select / Deselect skills to see related projects.</Typography>
              </Popover>
              <SkillGroup title="Programming Languages" list={programmingLanguages} onClick={handleSkillClick} onHandle={skillCheck} />
              <SkillGroup title="Frameworks, Libraries & Packages" list={frameworkPack} onClick={handleSkillClick} onHandle={skillCheck} />
              <SkillGroup title="Development Tools & Services" list={devTools} onClick={handleSkillClick} onHandle={skillCheck} />
              <SkillGroup title="Soft Skills" list={softSkills} onClick={handleSkillClick} onHandle={skillCheck} />
              <SkillGroup title="Tools & Programs" list={toolsProg} onClick={handleSkillClick} onHandle={skillCheck} />
            </section>
            <Divider color="grey" />
            <section>
              <h5 className='SectionTitle'>Personal Projects</h5>
              <div className="ProjectGrid">
                <Grid container spacing={5} direction="row" justifyContent="center" alignItems="center">
                  {skillList.length === 0 ?
                    projectData.map(project => {
                      return (
                        <ProjectWrapper 
                          id={project.id} 
                          title={project.title} 
                          desc={project.desc} 
                          imgURL={project.imgURL} 
                          keywords={project.keywords}
                          date={project.date}
                          gitLink={project.gitLink}
                          content={project.content}
                        />
                    )})
                  :
                    projectData.filter(project => skillList.some(skill => project.keywords.includes(skill))).length !== 0 ?
                      projectData.filter(project => skillList.every(skill => project.keywords.includes(skill)))
                      .map(project => {
                        return (
                          <ProjectWrapper 
                            id={project.id} 
                            title={project.title} 
                            desc={project.desc} 
                            imgURL={project.imgURL} 
                            keywords={project.keywords}
                            date={project.date}
                            gitLink={project.gitLink}
                            content={project.content}
                          />
                        )})
                    :
                    <p className="NoProject">No projects match the selected skills.</p>
                  }
                </Grid>
              </div>
            </section>
            <footer className="Footer">
              <p>Copyright &#169; {new Date().getFullYear()} Jed Codes</p>
            </footer>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
