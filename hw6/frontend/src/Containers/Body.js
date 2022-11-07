import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const columns = [
  { field: 'name', headerName: 'Name', width: 240 },
  { field: 'subject', headerName: 'Subject', width: 240 },
  { field: 'score', headerName: 'Score', width: 240 },
];


const Body = () => {
  const [value, setValue] = useState(0);


  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  // const handleTable = () => {
  //   let i = 0;
  //   for (let row of rows) {
  //     setRowTable(cur => cur = [...cur, {id: i, Name: row['name'], Subject: row['subject'], Score: row['score']}]);
  //   }
  // }
  

  const classes = useStyles();

  const { messages, rowTable, queryTable, addCardMessage, addRegularMessage, addErrorMessage, setRowTable, setQueryTable } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    console.log("name: ", name);
    console.log("sub: ", subject);
    console.log("score: ", score);
    const {
      data: { message, card, rows },
    } = await axios.post('/card', {
      name,
      subject,
      score,
    });
    console.log(rows)
    if (!card) addErrorMessage(message, "add");
    else {
      addCardMessage(message, "add");
      const cur = [];
      await rows.map((row, i) => {
        return cur.push({id: i, name: row['name'], subject: row['subject'], score: row['score']});
      })
      setRowTable(tmp => tmp = cur);
    }
  };

  const handleQuery = async () => {
    const {
      data: { messages, message, queryRow },
    } = await axios.get('/cards', {
      params: {
        type: queryType,
        queryString,
      },
    });

    if (!messages) addErrorMessage(message, "query");
    else {
      addRegularMessage(...messages);
      const cur = [];
      await queryRow.map((row, i) => {
        return cur.push({id: i, name: row['name'], subject: row['subject'], score: row['score']});
      })
      setQueryTable(tmp => tmp = cur);
    }
  };

  return (
    <Wrapper>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
            <Tab label="ADD" {...a11yProps(0)} />
            <Tab label="QUERY" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Row>
            {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
            <TextField
              className={classes.input}
              placeholder="Name"
              value={name}
              onChange={handleChange(setName)}
            />
            <TextField
              className={classes.input}
              placeholder="Subject"
              style={{ width: 240 }}
              value={subject}
              onChange={handleChange(setSubject)}
            />
            <TextField
              className={classes.input}
              placeholder="Score"
              value={score}
              onChange={handleChange(setScore)}
              type="number"
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={!name || !subject}
              onClick={handleAdd}
            >
              Add
            </Button>
          </Row>

          <ContentPaper variant="outlined">
            {console.log(messages)}
            {messages.filter((m) => (m.tag === "all" || m.tag === "add")).map((m, i) => (
              <Typography variant="body2" key={m + i} style={{ color: m.color }}>
                {m.message}
              </Typography>
            ))}
          </ContentPaper>

          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rowTable}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>

        </TabPanel>

        <TabPanel value={value} index={1}>
          <Row>
            <StyledFormControl>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={queryType}
                  onChange={handleChange(setQueryType)}
                >
                  <FormControlLabel
                    value="name"
                    control={<Radio color="primary" />}
                    label="Name"
                  />
                  <FormControlLabel
                    value="subject"
                    control={<Radio color="primary" />}
                    label="Subject"
                  />
                </RadioGroup>
              </FormControl>
            </StyledFormControl>
            <TextField
              placeholder="Query string..."
              value={queryString}
              onChange={handleChange(setQueryString)}
              style={{ flex: 1, width: 400 }}
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={!queryString}
              onClick={handleQuery}
            >
              Query
            </Button>
          </Row>

          <ContentPaper variant="outlined">
            {messages.filter((m) => (m.tag === "all" || m.tag === "query")).map((m, i) => (
              <Typography variant="body2" key={m + i} style={{ color: m.color }}>
                {m.message}
              </Typography>
            ))}
          </ContentPaper>

          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={queryTable}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </TabPanel>
      </Box>


      

    </Wrapper>
  );
};

export default Body;
