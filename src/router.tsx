import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { DashboardView } from "@/views/DashboardView";
import { NewProjectView } from "./views/projects/NewProjectView";
import 'react-toastify/dist/ReactToastify.css';
import { EditProjectView } from "./views/projects/EditProjectView";
import { ProjectDetailView } from "./views/projects/ProjectDetailView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/projects/create" element={<NewProjectView />} />
          <Route path="/projects/edit/:projectId" element={<EditProjectView />} />
          <Route path="/projects/detail/:projectId" element={<ProjectDetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
