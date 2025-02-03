import Link from "next/link";

export default function Home() {

  return (
    TitleBar()
  );
}

function TitleBar() {
  return (
    <div className="navBar">
      <div style={{fontSize: 40}}>Buch Ritter</div>
      <Link href="/document-page">Go to Document</Link>
    </div>
  );
}
