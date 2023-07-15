import { GetStaticProps, NextPage } from 'next';
import { Feedback, GetResponse } from '@/models';
import { buildFeedbackPath, extractFeedback } from '@/pages/api/feedback';
import { Fragment, useState } from 'react';

interface feedbackPageProps {
  feedbacks: Feedback[];
}

const FeedbackPage: NextPage<feedbackPageProps> = ({ feedbacks }) => {
  const [loadedFeedback, setLoadedFeedback] = useState<Feedback | null>(null);

  const loadFeedback = async (id: string) => {
    const response = await fetch(`/api/feedback/${id}`);
    const data = await response.json() as GetResponse<Feedback | null>;
    setLoadedFeedback(data.data)
  }

  return (
    <div className="feedback-page">
      {loadedFeedback && loadedFeedback.email}
      <ul>
        {feedbacks.map(f => (
          <Fragment key={f.id}>
            <li>{f.feedback}
              <button onClick={() => loadFeedback(f.id)}>Show details</button>
            </li>
          </Fragment>
        ))}
      </ul>
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

export default FeedbackPage;
