import { useContent, findWork, workIndex } from '../content/store';
import { Thumbnail } from '../components/Thumbnail';
import { Gallery } from '../components/Gallery';

const BACK_CLASS =
  'group fixed left-10 top-[84px] z-[60] font-sans text-[11px] uppercase tracking-[0.12em] text-fg-dim transition-colors hover:text-accent max-[900px]:left-[22px]';
const PAGE_CLASS =
  'mx-auto max-w-[1320px] px-10 pt-[140px] pb-20 max-[900px]:px-[22px] max-[900px]:pt-[100px] max-[560px]:pt-[92px]';

export function ProjectDetail({ slug }: { slug: string }) {
  const { works: PROJECTS, loading } = useContent();
  const p = findWork(PROJECTS, slug);
  if (!p) {
    if (loading) {
      return (
        <div data-screen-label="Project">
          <section className={PAGE_CLASS}>
            <p className="text-sm text-fg-dim">Loading…</p>
          </section>
        </div>
      );
    }
    return (
      <div data-screen-label="Project · 404">
        <section className={PAGE_CLASS}>
          <a className={BACK_CLASS} href="/work">
            <span className="mr-2 inline-block transition-transform group-hover:-translate-x-1">←</span> All projects
          </a>
          <h1 className="text-[48px] font-medium tracking-[-0.02em]">Not found.</h1>
          <p className="mt-3.5 text-fg-dim">No project matches "{slug}".</p>
        </section>
      </div>
    );
  }

  const idx = workIndex(PROJECTS, slug);
  const prev = idx > 0 ? PROJECTS[idx - 1] : null;
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;
  const sections = [{ label: 'Context', body: p.body[0] }].filter((a) => a.body);
  const repo = p.repo && /^https?:\/\//i.test(p.repo) ? p.repo : null;
  const galleryImages = (p.images ?? []).filter((src) => src && src !== p.cover);
  const galleryCaptions = galleryImages.map((_, i) => p.stills[i] ?? '');

  return (
    <div data-screen-label={'Project · ' + p.name}>
      <a className={BACK_CLASS} href="/work">
        <span className="mr-2 inline-block transition-transform group-hover:-translate-x-1">←</span> All projects
      </a>
      <div className="relative overflow-hidden">
        <div className="relative flex h-screen min-h-[600px] items-end overflow-hidden px-10 pb-20 before:absolute before:inset-0 before:z-[1] before:content-[''] before:bg-[linear-gradient(180deg,rgba(12,13,11,0.6)_0%,rgba(12,13,11,0.15)_26%,rgba(12,13,11,0.1)_46%,rgba(12,13,11,0.82)_86%,var(--bg)_100%)] max-[900px]:h-[80vh] max-[900px]:px-[22px] max-[900px]:pb-[60px]">
          <div className="absolute inset-0 z-0">
            <Thumbnail p={p} />
          </div>
          <div className="relative z-[2] mx-auto w-full max-w-[1320px]">
            <span className="mb-7 block font-sans text-[13px] uppercase tracking-[0.13em] text-[rgba(247,244,234,0.82)] [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
              {p.num} · {p.year}
            </span>
            <h1 className="mb-6 font-sans text-[clamp(60px,11vw,180px)] font-bold leading-[0.92] tracking-[-0.035em] text-[#f7f4ea] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
              {p.name}
            </h1>
            <p className="max-w-[34ch] text-[clamp(20px,2.2vw,32px)] font-light leading-[1.3] text-[rgba(247,244,234,0.78)] [text-shadow:0_1px_14px_rgba(0,0,0,0.55)]">
              <b className="font-normal text-white">{p.brief}</b>
            </p>
            {repo && (
              <div className="mt-[30px] flex flex-wrap gap-3.5">
                <a
                  className="rounded-lg border border-line bg-[rgba(12,13,11,0.55)] px-[18px] py-2.5 font-sans text-[13px] tracking-[0.04em] text-fg transition-colors hover:border-accent hover:text-accent"
                  href={repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Repository →
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="border-y border-line bg-bg-2 px-10 py-9">
          <div className="mx-auto grid max-w-[1320px] grid-cols-4 gap-8 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
            {[
              { k: 'Client', v: p.client },
              { k: 'Role', v: p.role },
              { k: 'Stack', v: p.stack },
              { k: 'Year', v: p.year },
            ].map((c) => (
              <div className="flex flex-col gap-1.5" key={c.k}>
                <div className="font-sans text-[11px] uppercase tracking-[0.11em] text-muted">{c.k}</div>
                <div className="text-[17px] leading-[1.3] text-fg">{c.v}</div>
              </div>
            ))}
          </div>
        </div>

        {sections.map((section, i) => (
          <div className="mx-auto grid max-w-[1320px] grid-cols-[200px_1fr] gap-[60px] px-10 py-[140px] max-[900px]:grid-cols-1 max-[900px]:gap-5 max-[900px]:px-[22px] max-[900px]:py-[60px]" key={i}>
            <div className="sticky top-[120px] h-fit border-t border-accent pt-[14px] font-sans text-[11px] uppercase tracking-[0.13em] text-accent max-[900px]:static">
              {section.label}
            </div>
            <div className="max-w-[62ch]">
              {i === 0 && (
                <p className="mb-10 font-sans text-[clamp(28px,3.2vw,44px)] font-medium leading-[1.18] tracking-[-0.02em] text-fg">
                  {p.brief}
                </p>
              )}
              <p className="mb-[22px] text-[18px] leading-[1.6] text-fg-dim">{section.body}</p>
            </div>
          </div>
        ))}

        <Gallery images={galleryImages} captions={galleryCaptions} name={p.name} />

        <div className="mx-auto max-w-[1320px] px-10 pb-[120px] pt-20 max-[900px]:px-[22px] max-[900px]:pb-[80px] max-[900px]:pt-[60px]">
          <div className="grid grid-cols-2 gap-12 border-t border-line pt-12 max-[900px]:grid-cols-1 max-[900px]:gap-6">
            <div className="group">
              <span className="mb-[14px] block font-sans text-[11px] uppercase tracking-[0.11em] text-muted">{prev ? '← Previous' : '← Back'}</span>
              {prev ? (
                <a className="inline-block font-sans text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-fg transition-colors group-hover:text-accent" href={'/work/' + prev.slug}>{prev.name}</a>
              ) : (
                <a className="inline-block font-sans text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-fg transition-colors group-hover:text-accent" href="/work">All projects</a>
              )}
            </div>
            <div className="group text-right max-[900px]:text-left">
              <span className="mb-[14px] block font-sans text-[11px] uppercase tracking-[0.11em] text-muted">{next ? 'Next →' : '→ Back'}</span>
              {next ? (
                <a className="inline-block font-sans text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-fg transition-colors group-hover:text-accent" href={'/work/' + next.slug}>{next.name}</a>
              ) : (
                <a className="inline-block font-sans text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-fg transition-colors group-hover:text-accent" href="/work">All projects</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
