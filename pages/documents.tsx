import fetch from 'isomorphic-unfetch';
import Nav from '../components/Nav';

function Document({ document }: { document: string }) {
  return <div key={document}>{document}</div>;
}

function NoDocuments() {
  return (
    <div className="w-1/2 mx-auto my-8 text-blue-800">
      <h1 className="text-3xl font-bold">No Documents</h1>
      <p className="my-2 text-lg">No documents have been created yet.</p>
      <button className="px-4 py-1 mx-4 my-2 text-xl text-blue-100 bg-blue-400 rounded shadow-md hover:text-blue-400 hover:bg-blue-200">
        Create
      </button>
    </div>
  );
}

interface Props {
  readonly sections: string[];
}

export default function Documents({ sections }: Props) {
  const showSections =
    sections.length === 0 ? (
      <NoDocuments />
    ) : (
      sections.map(s => <Document document={s} />)
    );
  return (
    <>
      <Nav />
      {showSections}
    </>
  );
}

Documents.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/sections');
  const json = await res.json();
  return { sections: json as string[] };
};
