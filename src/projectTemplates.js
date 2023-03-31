const defaultTemplate = [
    {
      title: 'Introduction',
      project: '',
      description: '',
      topics: []
    },
    {
      title: 'Objectives',
      project: '',
      description: '',
      topics: []
    },
  ];



const startupbusinessideaTemplate = [
    {
      title: 'Introduction',
      project: '',
      description: '',
      topics: []
    },
     {
       title: 'Proof of Concept',
       project: '',
       description: '',
       topics: []
     },
     {
      title: 'Protoype Documentation',
      project: '',
      description: '',
      topics: []
    },
    {
      title: 'Marketing',
      project: '',
      description: '',
      topics: []
   },
     {
       title: 'Customer Feedback',
       project: '',
       description: '',
       topics: []
    }
  ];


const writeabookTemplate = [
    {
        title: 'Introduction',
        project: '',
        description: '',
        topics: []
    },
    {
        title: 'Preface',
        project: '',
        description: '',
        topics: []
    },
    {
        title: 'Chapters',
        project: '',
        description: '',
        topics: []
    },
    {
        title: 'Glossary',
        project: '',
        description: '',
        topics: []
    },
    {
        title: 'References',
        project: '',
        description: '',
        topics: []
    }
  ];




export const templatePaths = (template, projectTitle) => {
    switch(template){
      case 'Project':
        return defaultTemplate.map(x=> {return {...x, project: projectTitle}});
      case 'Startup/Business':
        return startupbusinessideaTemplate.map(x=> {return {...x, project: projectTitle}});
      case 'Book':
        return writeabookTemplate.map(x=> {return {...x, project: projectTitle}});
    }
  }