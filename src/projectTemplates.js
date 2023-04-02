import { topicsCollection, updateOrCreateDocument } from "./db";

const defaultTemplate = [
    {
      title: 'Introduction',
      project: '',
      description: '',
      topics: [],
      type: 'single',
    },
    {
      title: 'Objectives',
      project: '',
      description: '',
      topics: [],
      type: 'single'
    },
  ];



const startupbusinessideaTemplate = [
    {
      title: 'Introduction',
      project: '',
      description: '',
      topics: [],
      type: 'single'
    },
     {
       title: 'Proof of Concept',
       project: '',
       description: '',
       topics: [],
       type: 'single'
     },
     {
      title: 'Technical Documentation',
      project: '',
      description: '',
      topics: [],
      type: 'collection'
    },
    {
      title: 'Marketing',
      project: '',
      description: '',
      topics: [],
      type: 'single'
   },
     {
       title: 'Customer Feedback',
       project: '',
       description: '',
       topics: [],
       type: 'single'
    }
  ];


const writeabookTemplate = [
    {
        title: 'Introduction',
        project: '',
        description: '',
        topics: [],
        type: 'single'
    },
    {
        title: 'Preface',
        project: '',
        description: '',
        topics: [],
        type: 'single'
    },
    {
        title: 'Chapters',
        project: '',
        description: '',
        topics: [],
        type: 'collection'
    },
    {
        title: 'Glossary',
        project: '',
        description: '',
        topics: [],
        type: 'single'
    },
    {
        title: 'References',
        project: '',
        description: '',
        topics: [],
        type: 'single'
    }
  ];




export const templatePaths = (email, template, projectTitle) => {
    switch(template){
      case 'Project':
        defaultTemplate.map((path, i) => {
          if(path.type === 'single'){
            const key = email + new Date().toString().replaceAll(" ", "") + i;
            updateOrCreateDocument(topicsCollection, key, {
              data: `<h2 style="text-align: left;"><span style="color: rgb(126, 140, 141);">${path.title}</span></h2> `
            });
            path.topics = [{
              id: key,
              title: path.title
            }]
          }
        })
        return defaultTemplate.map(x=> {return {...x, project: projectTitle}});
      case 'Startup/Business':
        startupbusinessideaTemplate.map((path, i) => {
          if(path.type === 'single'){
            const key = email + new Date().toString().replaceAll(" ", "") + i;
            updateOrCreateDocument(topicsCollection, key, {
              data: `<h2 style="text-align: left;"><span style="color: rgb(126, 140, 141);">${path.title}</span></h2> `
            });
            path.topics = [{
              id: key,
              title: path.title
            }]
          }
        })
        return startupbusinessideaTemplate.map(x=> {return {...x, project: projectTitle}});
      case 'Book':
        writeabookTemplate.map((path, i) => {
          if(path.type === 'single'){
            const key = email + new Date().toString().replaceAll(" ", "") + i;
            updateOrCreateDocument(topicsCollection, key, {
              data: `<h2 style="text-align: left;"><span style="color: rgb(126, 140, 141);">${path.title}</span></h2> `
            });
            path.topics = [{
              id: key,
              title: path.title
            }]
          }
        })
        return writeabookTemplate.map(x=> {return {...x, project: projectTitle}});
    }
  }