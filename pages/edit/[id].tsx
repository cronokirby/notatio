import React from 'react';
import * as icons from '../../components/icons';
import Nav from '../../components/Nav';

export default function Edit() {
  const [currentTag, setCurrentTag] = React.useState('');
  const [tags, setTags] = React.useState<string[]>([]);

  const createTag = () => {
    setCurrentTag('');
    setTags(ts => [...ts.filter(x => x !== currentTag), currentTag]);
  };
  const removeTag = (t: string) => {
    setTags(ts => ts.filter(x => x !== t));
  };

  return (
    <div>
      <Nav />
      <div className="w-11/12 p-8 mx-auto my-8 bg-white rounded shadow-md lg:w-1/2">
        <div className="flex items-center">
          <div className="text-blue-400 fill-current">{icons.Title}</div>
          <input
            placeholder="title"
            className="w-1/2 px-2 py-1 mx-4 text-xl text-gray-600 border-2 border-blue-400 rounded shadow-inner focus:border-blue-500 bg-white-100"
          ></input>
        </div>
        <div className="flex items-center mt-6">
          <button
            className="text-blue-400 fill-current hover:text-blue-300"
            onClick={createTag}
          >
            {icons.Tag}
          </button>
          <input
            placeholder="tag"
            value={currentTag}
            className="w-1/2 px-2 py-1 mx-4 text-xl text-gray-600 border-2 border-blue-400 rounded shadow-inner focus:border-blue-500 bg-white-100"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                createTag();
              }
            }}
            onChange={e => setCurrentTag(e.target.value)}
          ></input>
        </div>
        <ul className="flex flex-wrap items-center mt-4 text-sm">
          {tags.map(t => (
            <li key={t}>
              <button
                className="px-2 py-1 mx-1 text-blue-100 bg-blue-400 rounded shadow hover:bg-blue-200 hover:text-blue-400"
                onClick={() => removeTag(t)}
              >
                {t}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
