import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="announce">
      <Link href="/founders-club#apply">
        <span>Applications are open.</span>
        <strong>Apply now for the Founders Club <span aria-hidden="true">→</span></strong>
      </Link>
    </div>
  );
}
