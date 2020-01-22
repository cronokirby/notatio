import fetch from 'isomorphic-unfetch';
import absoluteUrl from 'next-absolute-url';
import Nav from '../components/Nav';

function ShowDocument({ document }: { document: string }) {
  return <div key={document}>{document}</div>;
}

function NoSections() {
  return (
    <div className="py-4 px-8 sm:w-2/3 md:w-1/2 mx-auto my-8 text-blue-800">
      <h1 className="text-3xl font-bold">No Documents</h1>
      <img
        src="/education.png"
        className="my-6 bg-blue-200 inset rounded-full shadow-inner"
      ></img>
      <p className="my-2 text-lg">No Documents have been created yet.</p>
      <p className="my-2 text-lg">
        Documents are the main way of organising notes with{' '}
        <span className="font-bold">Notatio</span>. Documents are just markdown
        files, and contain information along with questions you'd like to
        revise.
      </p>
      <div className="my-4 flex justify-center">
        <button className="px-4 py-1 mx-4 my-2 text-2xl text-pink-100 bg-blue-400 rounded shadow-md hover:text-blue-400 hover:bg-blue-200">
          Create
        </button>
      </div>
    </div>
  );
}

interface Props {
  readonly documents: string[];
}

export default function Home({ documents }: Props) {
  const showDocuments =
    documents.length === 0 ? (
      <NoSections />
    ) : (
      documents.map(s => <ShowDocument document={s} />)
    );
  return (
    <>
      <Nav />
      {showDocuments}
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  const { origin } = absoluteUrl(ctx.req);
  const res = await fetch(`${origin}/api/documents`);
  const json = await res.json();
  return { documents: json as string[] };
};
