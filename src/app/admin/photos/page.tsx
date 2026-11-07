import { setSlot } from "../actions";
import { PHOTOS, type PhotoSlot } from "@/config/photos";
import { requireAdmin } from "@/lib/admin-auth";
import { adminListMedia, adminSlotOverrides } from "@/lib/content";

const LABELS: Record<PhotoSlot, string> = {
  heroMain: "Home: main hero photo",
  heroSmall: "Home: small round hero photo",
  community1: "Home: community photo 1",
  community2: "Home: community photo 2",
  community3: "Home: community photo 3",
  foundersHero: "Founders Club: top photo",
  investorsHero: "Investors Club: top photo",
  servicesHero: "Other Services: top photo",
  boardroom: "Photo band: boardroom",
  pitching: "Photo band: pitching",
  investorMeeting: "Photo band: investor meeting",
  startupOffice: "Photo band: startup office",
  leadership: "Photo band: leadership",
  networking: "Photo band: networking",
};

export default async function AdminPhotos({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const [media, overrides] = await Promise.all([adminListMedia(), adminSlotOverrides()]).catch(
    () => [null, {} as Awaited<ReturnType<typeof adminSlotOverrides>>] as const,
  );
  const images = media?.filter((m) => m.kind === "image") ?? [];

  return (
    <>
      <h1 className="h-lg">Page photos</h1>
      <p>
        Choose which uploaded photo appears in each spot on the website. Spots left on “Default” show the built-in
        illustration (and the photo bands stay hidden). Upload photos first under Photos &amp; videos.
      </p>
      {saved && <p className="admin__ok" role="status">Saved. The change is live.</p>}
      {media === null && <p className="admin__error">Could not load the library. Check the Supabase setup.</p>}
      <ul className="admin__list">
        {(Object.keys(PHOTOS) as PhotoSlot[]).map((slot) => {
          const o = overrides[slot];
          return (
            <li key={slot} className="admin__card">
              <form action={setSlot} className="admin__form admin__slot">
                <input type="hidden" name="slot" value={slot} />
                <strong>{LABELS[slot]}</strong>
                {o && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="admin__slotimg" src={o.url} alt="" loading="lazy" />
                )}
                <label className="admin__field">
                  <span>Photo</span>
                  <select name="url" defaultValue={o?.url ?? ""}>
                    <option value="">Default</option>
                    {images.map((m) => (
                      <option key={m.id} value={m.url}>{m.title || m.path}</option>
                    ))}
                  </select>
                </label>
                <label className="admin__field">
                  <span>Alt text</span>
                  <input name="alt" defaultValue={o?.alt ?? ""} placeholder={PHOTOS[slot].alt} maxLength={300} />
                </label>
                <button className="btn btn--sm">Save</button>
              </form>
            </li>
          );
        })}
      </ul>
    </>
  );
}
