import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageBanner, SectionHeading } from "@/components/ui/PageBanner";
import { ACCEPTED_UPLOAD_LABEL, MAX_UPLOAD_BYTES } from "@/lib/custom-shirt";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Upload Guidelines",
  description:
    "What to upload for the best custom shirt print. Accepted file formats, recommended resolution, transparent backgrounds, color considerations and the file size limit.",
  path: "/custom-shirts/upload-guidelines",
  keywords: [
    "custom shirt upload guidelines",
    "upload logo on shirt",
    "shirt artwork file format",
    "custom shirt design resolution",
    "transparent logo shirt printing",
  ],
});

const MAX_MB = Math.round(MAX_UPLOAD_BYTES / (1024 * 1024));

const FORMATS: { name: string; icon: IconName; best: string; detail: string }[] = [
  {
    name: "PNG",
    icon: "star",
    best: "Best choice for logos and text",
    detail:
      "PNG supports a transparent background, so only your artwork prints and the shirt color shows through everywhere else. Sharp edges and small type stay crisp.",
  },
  {
    name: "WEBP",
    icon: "bolt",
    best: "Good modern alternative",
    detail:
      "WEBP also supports transparency and produces a smaller file at the same quality, which is handy if your artwork is close to the size limit.",
  },
  {
    name: "JPG and JPEG",
    icon: "grid",
    best: "Best for photographs",
    detail:
      "JPG has no transparency, so your design arrives inside a rectangle of its own background color. That is fine for photographs and full width panels, less so for a logo.",
  },
];

const QUALITY_CHECKS = [
  {
    title: "Start large, not small",
    body: "Aim for at least 1500 pixels on the long edge, and 2400 pixels or more if the design covers the full chest. A file that looks fine on screen at 400 pixels wide will look soft once it is printed at ten inches across, because print packs far more detail into the same space than a display does.",
  },
  {
    title: "Never enlarge a small file",
    body: "Scaling a small image up in an editor does not add detail, it just spreads the pixels you already have. If the only copy of your logo is a small one, ask whoever made it for the original artwork rather than stretching what you have.",
  },
  {
    title: "Trim the empty space",
    body: "Crop tight to your artwork before uploading. Leftover empty margins become part of the image, which makes your design sit smaller inside the safe print area than you expect and pushes it off center.",
  },
  {
    title: "Keep text away from the edges",
    body: "Small type and thin outlines are the first things to suffer in printing. Keep line weights reasonably solid and leave a little breathing room around any text, so nothing sits right on the boundary of the print area.",
  },
  {
    title: "Simple beats busy",
    body: "Flat shapes, bold marks and clean type print beautifully on fabric. Soft gradients, drop shadows and very fine textures are the hardest things to reproduce and often lose their subtlety once they are on cotton.",
  },
];

const COLOR_NOTES = [
  {
    title: "Match your artwork to the shirt",
    body: "Dark artwork on a Black or Navy shirt disappears, and pale artwork on White does the same. Switch shirt colors in the customization tool with your design already loaded and you will see the mismatch immediately.",
  },
  {
    title: "Watch for a white box",
    body: "If your logo was saved as a JPG, its background is white even when it looks transparent in a preview. On a colored shirt that white rectangle prints too. Use a PNG or WEBP with real transparency instead.",
  },
  {
    title: "Screen colors are not fabric colors",
    body: "A display emits light while fabric reflects it, so printed colors read slightly deeper and softer than they do on screen. Very bright neons in particular settle down once printed.",
  },
  {
    title: "Give your design contrast",
    body: "The strongest custom shirts have a clear difference in lightness between the artwork and the shirt. If you are unsure, view your design on both a light and a dark shirt in the preview before deciding.",
  },
];

export default function UploadGuidelinesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Custom Shirts"
        title="Upload Guidelines"
        description="A few minutes spent on your file is the difference between a shirt that looks professionally made and one that looks improvised. Here is exactly what to send."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Custom Shirts", href: "/custom-shirts" },
          { name: "Upload Guidelines", href: "/custom-shirts/upload-guidelines" },
        ]}
      />

      {/* ------------------------------------------- Quick reference */}
      <section className="bg-canvas py-12 md:py-16">
        <div className="shell">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Accepted formats", value: ACCEPTED_UPLOAD_LABEL, icon: "checkCircle" as IconName },
              { label: "Maximum file size", value: `${MAX_MB} MB`, icon: "shield" as IconName },
              { label: "Recommended long edge", value: "1500 to 3000 pixels", icon: "ruler" as IconName },
              { label: "Best background", value: "Transparent", icon: "sparkle" as IconName },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-tint text-brand">
                  <Icon name={item.icon} size={20} />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {item.label}
                </p>
                <p className="mt-1.5 font-display text-base font-bold text-ink">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Formats */}
      <section className="border-y border-line bg-mist py-12 md:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="File Formats"
            title="Which format to upload"
            description={`The customization tool accepts ${ACCEPTED_UPLOAD_LABEL} files up to ${MAX_MB} MB. All four work, but they are not equally good for every kind of design.`}
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {FORMATS.map((format) => (
              <div
                key={format.name}
                className="flex flex-col rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/45 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-tint text-brand">
                  <Icon name={format.icon} size={20} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink">
                  {format.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                  {format.best}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate">{format.detail}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 rounded-2xl border border-line bg-card px-5 py-4 text-sm leading-relaxed text-slate">
            If the tool rejects your file, it is almost always one of two things. Either
            the format is not on the accepted list, which usually means a PDF, an SVG or a
            design file from an editor, or the file is larger than {MAX_MB} MB. Exporting
            your artwork again as a PNG at a sensible size solves both.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------ Resolution */}
      <section className="bg-canvas py-12 md:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Resolution And Detail"
            title="What makes a design print well"
            description="Print reproduces far more detail than a screen shows, so a file that looks perfectly sharp in a browser tab can still print soft."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {QUALITY_CHECKS.map((check) => (
              <div
                key={check.title}
                className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <h3 className="flex items-start gap-3 font-display text-base font-semibold tracking-tight text-ink">
                  <Icon name="checkCircle" size={18} className="mt-0.5 shrink-0 text-brand" />
                  {check.title}
                </h3>
                <p className="mt-2.5 pl-8 text-sm leading-relaxed text-slate">
                  {check.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------- Transparency and color */}
      <section className="border-y border-line bg-mist py-12 md:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Backgrounds And Color"
            title="Transparency and color considerations"
            description="This is where most custom shirt designs go wrong, and it is also the easiest thing to check before you order."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {COLOR_NOTES.map((note) => (
              <div
                key={note.title}
                className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                  {note.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate">{note.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Privacy */}
      <section className="bg-canvas py-12 md:py-16">
        <div className="shell">
          <div className="flex flex-col gap-6 rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:flex-row lg:items-center">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-tint text-brand">
              <Icon name="lock" size={26} />
            </span>
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                Your file stays in your browser
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                When you select a file, the customization tool reads it directly on your
                own device to build the preview. Your artwork is not uploaded to a server
                at any point while you are designing, which is why it appears on the shirt
                the instant you choose it rather than after a progress bar. A compact copy
                of the design travels with your order details so your shirt can be printed
                the way you approved it.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                Clearing your browser data or designing on a different device starts you
                with a blank tool, so keep your original artwork file safe on your own
                machine.
              </p>
            </div>
            <div className="shrink-0">
              <Button href="/custom-shirts/design" variant="primary" size="lg">
                Upload Your Design
                <Icon name="arrowRight" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
