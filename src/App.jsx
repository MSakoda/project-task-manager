import ProjectsSidebar from "./Components/ProjectsSidebar";
import NoProjectSelected from "./Components/NoProjectSelected";
import NewProject from "./Components/NewProject";
import SelectedProject from "./Components/SelectedProject";
import { useState } from "react";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks:[]
  });

  function handleStartAddProject() {
    setProjectsState(prev => {
      return {
        ...prev,
        selectedProjectId: null
      }
    })
  }

  function handleAddProject(projectData) {
    setProjectsState(prev => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      }
      return {
        ...prev,
        projects: [...prev.projects, newProject],
        selectedProjectId: undefined
      }
    })
  }

    function handleCancelAddProject() {
      setProjectsState(prev => {
      return {
        ...prev,
        selectedProjectId: undefined
      }
    })
    }

    function handleSelectProject(projectId) {
      setProjectsState(prev => {
        return {
          ...prev,
          selectedProjectId: projectId
        }
      })
    }

    function handleDeleteProject() {
      setProjectsState(prev => {
        return {
          ...prev,
          projects: prev.projects.filter(project => project.id !== prev.selectedProjectId),
          selectedProjectId: undefined
        }
      })
    }

    function handleAddTaskToProject(text) {
      setProjectsState(prev => {
        const taskId = Math.random();
        const newTask = {
          text: text,
          projectId: projectsState.selectedProjectId,
          id: taskId
        }

        return {
          ...prev,
          tasks: [newTask, ...prev.tasks]
        }
      })
    }

    function handleDeleteTaskFromProject(taskId) {
      setProjectsState(prev => {
        return {
          ...prev,
          tasks: prev.tasks.filter(task => task.id !== taskId)
        }
      })
    }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  console.log( projectsState )
  let content = <SelectedProject 
  tasks={projectsState.tasks.filter(task => task.projectId === projectsState.selectedProjectId)}
  onDeleteTask={handleDeleteTaskFromProject} 
  onAddTask={handleAddTaskToProject} 
  onDelete={handleDeleteProject} 
  project={selectedProject} />;

  if(projectsState.selectedProjectId === null) {
    content = <NewProject onCancelProject={handleCancelAddProject} onAddProject={handleAddProject} />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
        onSelectProject={handleSelectProject} 
        projects={projectsState.projects} 
        onStartAddProject={handleStartAddProject} />
      {content}
    </main>
  );
}

export default App;
