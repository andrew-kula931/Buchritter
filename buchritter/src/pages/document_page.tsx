import Link from "next/link";
import "../app/globals.css";

export default function DocumentPage() {
  return (
    <div className="navBar">
      <h1>Hello from the document!</h1>
      <Link href="/">Click here to go back</Link>
    </div>
  );
}