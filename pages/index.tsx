import fetch from 'isomorphic-unfetch';
import absoluteUrl from 'next-absolute-url';
import Router from 'next/router';
import * as icons from '../components/icons';
import Nav from '../components/Nav';
import * as api from '../src/api';
import { Document } from '../src/documents';

/**
 * Create a new document, and then redirect the user to that editing page.
 */
async function create() {
  const id = await api.createDocument();
  Router.push(`/edit/${id}`);
}

function ShowDocument({ document }: { document: Document }) {
  return (
    <div
      key={document.id}
      className="px-4 my-2 text-blue-700 md:my-4 sm:w-1/2 md:w-1/3"
    >
      <div className="flex flex-col justify-between h-full px-4 py-2 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold hover:text-blue-500">
          {document.title}
        </h2>
        <div className="flex flex-wrap items-center mt-4 text-sm">
          {document.tags.map(t => (
            <div
              key={t}
              className="px-2 py-1 mx-1 text-blue-100 bg-blue-400 rounded shadow hover:bg-blue-200 hover:text-blue-400"
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NoSections() {
  return (
    <div className="px-8 py-4 mx-auto my-8 text-blue-800 sm:w-2/3 md:w-1/2">
      <h1 className="text-3xl font-bold">No Documents</h1>
      <img
        src="/education.png"
        className="my-6 bg-blue-200 rounded-full shadow-inner"
      ></img>
      <p className="my-2 text-lg">No Documents have been created yet.</p>
      <p className="my-2 text-lg">
        Documents are the main way of organising notes with{' '}
        <span className="font-bold">Notatio</span>. Documents are just markdown
        files, and contain information along with questions you'd like to
        revise.
      </p>
      <div className="flex justify-center my-4">
        <button
          className="px-4 py-1 mx-4 my-2 text-2xl text-pink-100 bg-blue-400 rounded shadow-md hover:text-blue-400 hover:bg-blue-200"
          onClick={create}
        >
          Create
        </button>
      </div>
    </div>
  );
}

interface Props {
  readonly documents: Document[];
}

export default function Home({ documents }: Props) {
  const showableDocuments = documents.filter(d => d.title && d.title !== '');
  const showDocuments =
    showableDocuments.length === 0 ? (
      <NoSections />
    ) : (
      <div className="flex flex-wrap items-stretch mx-auto my-8 md:w-5/6 lg:w-1/2">
        <div className="px-4 my-2 text-blue-700 md:my-4 sm:w-1/2 md:w-1/3">
          <button
            className="flex items-center justify-center w-full h-full px-4 py-2 text-white bg-blue-300 rounded shadow-inner fill-current hover:text-blue-400 hover:bg-blue-200"
            onClick={create}
          >
            {icons.AddBox(48)}
            <span className="mx-2 text-2xl">Create</span>
          </button>
        </div>
        {showableDocuments.map(s => (
          <ShowDocument document={s} />
        ))}
      </div>
    );
  return (
    <>
      <Nav />
      {showDocuments}
    </>
  );
}

Home.getInitialProps = async ctx => {
  const { origin } = absoluteUrl(ctx.req);
  const res = await fetch(`${origin}/api/document`);
  const json = await res.json();
  return { documents: json as Document[] };
};
