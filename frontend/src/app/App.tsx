import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import { CMSProvider } from './data/cms-context';

export default function App() {
  return (
    <CMSProvider>
      <Toaster position="top-right" richColors />
      <RouterProvider router={router} />
    </CMSProvider>
  );
}
