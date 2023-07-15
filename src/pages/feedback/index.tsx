import { GetStaticProps, NextPage } from 'next';
import { Feedback } from '@/models';
import { buildFeedbackPath, extractFeedback } from '@/pages/api/feedback';

interface feedbackPageProps {
  feedbacks: Feedback[];
}

const feedbackPage: NextPage<feedbackPageProps> = ({ feedbacks }) => {
  return (
    <div className="feedback-page">
      <ol>
        {feedbacks.map(f => <li key={f.id}>{f.feedback}</li>)}
      </ol>
    </div>
  )
};

export const getStaticProps: GetStaticProps<feedbackPageProps> = async () => {
  const filePath = buildFeedbackPath();
  const feedbacks = await extractFeedback(filePath);
  return {
    props: { feedbacks: feedbacks },
    revalidate: 5
  };
};

export default feedbackPage;
