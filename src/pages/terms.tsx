import Markdown from 'markdown-to-jsx';
import useTranslation from 'next-translate/useTranslation';
import React, { ReactNode } from 'react';

import Layout from '@/components/layouts/Layout';
import termsEN from '@/markdowns/TermsAndConditionsEN.md';
import termsUK from '@/markdowns/TermsAndConditionsUA.md';
import useUser from '@/stores/useUser';

interface IProps {
  children: ReactNode;
}

const MyParagraph = ({ children, ...props }: IProps) => <div {...props}>{children}</div>;

export default function Terms() {
  const { lang } = useTranslation();
  const user = useUser((state) => state.user);
  const { t } = useTranslation('terms');
  return (
    <Layout title={t('title')}>
      <div className=" rounded-2xl bg-ctp-surface0 p-5">
        <Markdown
          className=" mt-3"
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
              a: {
                component: MyParagraph,
                props: {
                  className: 'text-purple-400 hover:text-purple-300 duration-300 inline cursor-pointer',
                },
              },
            },
          }}
        >
          {lang === 'uk' ? termsUK : termsEN}
        </Markdown>
      </div>
    </Layout>
  );
}
