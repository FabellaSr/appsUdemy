import { StrictMode,Suspense } from "react"
import { createRoot } from "react-dom/client"
import { Toaster } from 'sonner';
import "./index.css"
//import { TasksApp } from "./components/TaskApp.tsx"
//import { ScrambleWords } from "./05-reduce/ScrambleWordsState.tsx"
import { InstagromApp } from "./07-useOptimistic/InstagromApp.tsx"
import { ClientInformation } from './08-use-suspense/ClientInformation';
import { getUserAction } from "./08-use-suspense/api/get-user.action.ts";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster/>
    <InstagromApp />
    
    <Suspense
      fallback={
        <div className="bg-gradient flex flex-col">
          <h1 className="text-2xl">Cargando</h1>
        </div>
      }
    >
      <ClientInformation getUser={getUserAction(1001)} />
    </Suspense>
  </StrictMode>
)
