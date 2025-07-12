import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header class="flex flex-col items-center mt-8 mb-16">
      <img src={logo} alt="A canvas" className='object-contain mb-8 w-44 h-44 '/>
      <h1 className="text-4xl fint-semibold tracking-idest text-center uppercase text-amber-800 font-title">ReactArt</h1>
      <p>A community of artists and art-lovers.</p>
    </header>
  );
}
