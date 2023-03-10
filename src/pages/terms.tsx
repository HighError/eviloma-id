import Markdown from 'markdown-to-jsx';
import React from 'react';

import Layout from '../components/Layout';
import terms from '../terms.md';

const MyParagraph = ({ children, ...props }: any) => <div {...props}>{children}</div>;

const Terms = () => {
  return (
    <Layout title="Eviloma ID - Правила та умови">
      <Markdown
        className="overflow-auto p-5"
        options={{
          overrides: {
            h1: {
              component: MyParagraph,
              props: {
                className: 'text-3xl font-bold w-full flex flex-row items-center justify-center mb-5',
              },
            },
            h2: {
              component: MyParagraph,
              props: {
                className: 'text-2xl mt-3 mb-1 font-semibold',
              },
            },
            p: {
              component: MyParagraph,
              props: {
                className: 'mb-2 text-shadow-md',
              },
            },
          },
        }}
      >
        {terms}
      </Markdown>
    </Layout>
  );
};

export default Terms;
