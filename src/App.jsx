import { useMemo, useState } from 'react';
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import './App.css';

import AppShell from './components/AppShell.jsx';
import Home from './routes/Home.jsx';
import Modules from './routes/Modules.jsx';
import ModuleDetail from './routes/ModuleDetail.jsx';
import Lesson from './routes/Lesson.jsx';
import NotFound from './routes/NotFound.jsx';
import Quiz from './routes/Quiz.jsx';
import Results from './routes/Results.jsx';
import Review from './routes/Review.jsx';
import ReviewIndex from './routes/ReviewIndex.jsx';
import Sprint from './routes/Sprint.jsx';
import MockExam from './routes/MockExam.jsx';
import MockExamResults from './routes/MockExamResults.jsx';
import TopicIndex from './routes/TopicIndex.jsx';
import TopicOverview from './routes/TopicOverview.jsx';
import TopicPractice from './routes/TopicPractice.jsx';
import TopicResults from './routes/TopicResults.jsx';
import { ResultContext } from './quiz/ResultContext.js';

function QuizWithFreshKey() {
  const location = useLocation();
  return <Quiz key={location.pathname} />;
}

function ReviewWithFreshKey() {
  const location = useLocation();
  return <Review key={location.pathname} />;
}

function SprintWithFreshKey() {
  const location = useLocation();
  return <Sprint key={location.pathname} />;
}

function MockExamWithFreshKey() {
  const location = useLocation();
  return <MockExam key={location.pathname} />;
}

function TopicPracticeWithFreshKey() {
  const location = useLocation();
  return <TopicPractice key={location.pathname} />;
}

function App() {
  const [result, setResult] = useState(null);
  const ctx = useMemo(() => ({ result, setResult }), [result]);

  return (
    <ResultContext.Provider value={ctx}>
      <HashRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Home />} />
            <Route path="modules" element={<Modules />} />
            <Route path="modules/:slug" element={<ModuleDetail />} />
            <Route path="lessons/:slug" element={<Lesson />} />
            <Route path="quiz/:slug" element={<QuizWithFreshKey />} />
            <Route path="quiz/:slug/results" element={<Results />} />
            <Route path="review" element={<ReviewIndex />} />
            <Route path="review/:slug" element={<ReviewWithFreshKey />} />
            <Route path="review/:slug/results" element={<Results />} />
            <Route path="sprint" element={<SprintWithFreshKey />} />
            <Route path="sprint/results" element={<Results />} />
            <Route path="exam" element={<MockExamWithFreshKey />} />
            <Route path="exam/results" element={<MockExamResults />} />
            <Route path="topics" element={<TopicIndex />} />
            <Route path="topics/:slug" element={<TopicOverview />} />
            <Route path="topics/:slug/practice" element={<TopicPracticeWithFreshKey />} />
            <Route path="topics/:slug/results" element={<TopicResults />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </ResultContext.Provider>
  );
}

export default App;
