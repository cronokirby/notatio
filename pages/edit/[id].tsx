import { useRouter } from 'next/router';
import Nav from '../../components/Nav';

export default function Post() {
  const router = useRouter();

  return (
    <div>
      <Nav />
      <p>Editing {router.query.id}</p>
    </div>
  );
}
