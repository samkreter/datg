import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import type { FC } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import type { Theme } from 'src/theme';
import Page from 'src/components/Page';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import type { Salsa } from 'src/types/salsa';
import Header from './Header';
import Filter from './Filter';
import Results from './Results';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const SalsaBrowseView: FC = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [projects, setProjects] = useState<Salsa[]>([]);

  const getSalsas = useCallback(async () => {
    try {
      const response = await axios.get<{ projects: Salsa[]; }>('/api/salsas/salsas');

      if (isMountedRef.current) {
        setProjects(response.data.projects);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getSalsas();
  }, [getSalsas]);

  return (
    <Page
      className={classes.root}
      title="Project List"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Filter />
        </Box>
        <Box mt={6}>
          <Results projects={projects} />
        </Box>
      </Container>
    </Page>
  );
}

export default SalsaBrowseView;
