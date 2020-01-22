import fetch from 'isomorphic-unfetch';
import Nav from '../components/Nav';

function Section({ section }: { section: string }) {
  return <div key={section}>{section}</div>;
}

function NoSections() {
  return (
    <div className="w-1/2 mx-auto my-8 text-pink-800">
      <h1 className="text-3xl font-bold">No Sections</h1>
      <p className="my-2 text-lg">No sections have been created yet.</p>
      <button className="px-4 py-1 mx-4 my-2 text-xl text-pink-100 bg-pink-400 rounded shadow-md hover:text-pink-400 hover:bg-pink-200">
        Create
      </button>
    </div>
  );
}

interface Props {
  readonly sections: string[];
}

export default function Home({ sections }: Props) {
  const showSections =
    sections.length === 0 ? (
      <NoSections />
    ) : (
      sections.map(s => <Section section={s} />)
    );
  return (
    <>
      <Nav />
      {showSections}
    </>
  );
}

Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/sections');
  const json = await res.json();
  return { sections: json as string[] };
};
