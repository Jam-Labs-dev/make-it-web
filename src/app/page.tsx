import { redirect } from 'next/navigation';

export default function Home() {
  // Intercepta o acesso à rota raiz e redireciona para a Splash Screen //
  redirect('/splash');
}