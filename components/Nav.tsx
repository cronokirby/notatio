import Link from 'next/link';

export default function Nav() {
  return (
    <ul className="px-48 py-2 flex items-baseline justify-around text-3xl font-bold text-white shadow-md bg-blue-400">
      <li className="hover:text-blue-200">
        <Link href="/">
          <a>Documents</a>
        </Link>
      </li>
      <li className="hover:text-blue-200">
        <Link href="/questions">
          <a>Questions</a>
        </Link>
      </li>
    </ul>
  );
}
