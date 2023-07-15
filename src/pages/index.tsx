import Head from 'next/head'
import { NextPage } from 'next';
import { FormEventHandler, useRef, useState } from 'react';
import { Feedback, GetResponse } from '@/models';

const HomePage: NextPage = () => {
  const refEmail = useRef<HTMLInputElement>(null);
  const refFeedback = useRef<HTMLTextAreaElement>(null);
  const [feedBacks, setFeedbacks] = useState<Feedback[]>([]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const email = refEmail.current?.value;
    const feedback = refFeedback.current?.value;
    console.log(email, feedback);

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({ email: email, feedback: feedback }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(r => r.json())
      .then(d => console.log(d));
  }

  const loadFeedback = () => {
    fetch('/api/feedback').then(r => r.json())
      .then((d: GetResponse) => setFeedbacks(d.data));
  }

  return (
    <>
      <Head>
        <title>Next App</title>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <h1>Home page</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={refEmail}/>
        </div>
        <div>
          <label htmlFor="email">Your Feedback</label>
          <textarea rows={5} ref={refFeedback}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr/>
      <button onClick={loadFeedback}>Load Feedbacks</button>
      <ul>
        {feedBacks.map(i => <li key={i.id}>Email: {i.email} - Feedback: {i.feedback}</li>)}
      </ul>
    </>
  )
}

export default HomePage;
