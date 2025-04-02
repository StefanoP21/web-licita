import { Navigate, Route, Routes } from 'react-router';
import { All, Followed } from '@/opportunities/pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<All />} />
      <Route path="/followed" element={<Followed />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
