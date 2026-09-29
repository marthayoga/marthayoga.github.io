/*
 * Menyusun laporan dari window.PORTFOLIO (js/data.js).
 * Untuk mengganti isi website, cukup edit js/data.js. File ini tidak perlu diubah.
 */
(() => {
  "use strict";

  const D = window.PORTFOLIO;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  if (!D) {
    $("#isi").insertAdjacentHTML(
      "afterbegin",
      '<p class="noscript">Data laporan tidak terbaca. Cek file js/data.js: biasanya ada koma atau tanda kutip yang hilang.</p>'
    );
    return;
  }

  /* ---------- Konstanta ---------- */

  const LEVELS = [
    { key: "kritis", label: "Kritis", rule: "Juara, medali, atau finalis kompetisi tingkat nasional atau internasional." },
    { key: "tinggi", label: "Tinggi", rule: "Peringkat 10% teratas di kompetisi terbuka, atau sertifikasi profesional." },
    { key: "sedang", label: "Sedang", rule: "Penghargaan resmi di kompetisi tingkat nasional, atau prestasi tingkat kampus." },
    { key: "rendah", label: "Rendah", rule: "Partisipasi kompetisi atau proyek belajar." },
    { key: "info", label: "Info", rule: "Sedang dipelajari atau target berikutnya." }
  ];
  const LEVEL = Object.fromEntries(LEVELS.map((l) => [l.key, l]));
  const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const CONTACT_LABELS = {
    email: "Email pribadi",
    emailKampus: "Email kampus",
    github: "GitHub",
    linkedin: "LinkedIn",
    ctftime: "CTFtime",
    tryhackme: "TryHackMe",
    hackthebox: "Hack The Box",
    blog: "Blog",
    website: "Situs web"
  };
  const DEPTH = { Dasar: 1, Menengah: 2, Mahir: 3 };

  const M = D.meta || {};
  const P = D.profile || {};
  const C = D.contact || {};
  const findings = D.findings || [];
  const canFilter = findings.length >= 4;
  const isDraft = String(M.status || "").toLowerCase() !== "final";
  const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Pembantu ---------- */

  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;

  const hasUrl = (url) => typeof url === "string" && url.trim() !== "" && url.trim() !== "#";

  // "github.com/nama" jadi "https://github.com/nama"; tautan relatif seperti "cv.pdf" dibiarkan.
  const toHref = (url) => {
    const u = String(url).trim();
    if (/^[a-z][a-z0-9+.-]*:/i.test(u) || /^[#/.]/.test(u)) return u;
    if (/^[\w-]+(\.[\w-]+)+(\/|$)/.test(u) && !/\.(pdf|html?)$/i.test(u)) return "https://" + u;
    return u;
  };

  const fmtDate = (iso) => {
    const [y, m, d] = String(iso || "").split("-").map(Number);
    if (!y) return esc(iso);
    if (d) return `${d} ${MONTHS[m - 1]} ${y}`;
    if (m) return `${MONTHS[m - 1]} ${y}`;
    return String(y);
  };

  const sevChip = (key) => {
    const lv = LEVEL[key] || LEVEL.info;
    return `<span class="sev" data-level="${lv.key}" style="--c:var(--sev-${lv.key})">${lv.label}</span>`;
  };

  /* ---------- Bagian kosong disembunyikan, nomor § disusun ulang ---------- */

  const isEmpty = {
    lingkup: !(D.scope || []).length,
    organisasi: !(D.organizations || []).length,
    penilaian: !(D.skills || []).length,
    writeup: !(D.writeups || []).length,
    alat: !(D.tools || []).length,
    sertifikasi: !(D.certifications || []).length,
    kronologi: !(D.timeline || []).length,
    rencana: !(D.plan || []).length
  };
  let secNo = 0;
  $$(".sec[data-n]").forEach((s) => {
    if (isEmpty[s.id]) {
      s.remove();
      return;
    }
    secNo += 1;
    s.dataset.n = String(secNo);
    $(".sec__n", s).textContent = `§${secNo}`;
  });
  $$("[data-secref]").forEach((el) => {
    const s = document.getElementById(el.dataset.secref);
    el.textContent = s ? `§${s.dataset.n}` : "";
  });

  // Rujukan silang: "F-01" dan "§3" di dalam teks otomatis jadi tautan.
  const sectionByNumber = Object.fromEntries($$(".sec[data-n]").map((s) => [s.dataset.n, s.id]));
  const findingIds = new Set(findings.map((f) => f.id));
  const xref = (id) => (findingIds.has(id) ? `<a class="xref" href="#${esc(id)}">${esc(id)}</a>` : esc(id));
  const linkify = (text) =>
    esc(text)
      .replace(/\bF-\d{2,3}\b/g, (id) => xref(id))
      .replace(/§(\d+)/g, (m, n) => (sectionByNumber[n] ? `<a class="xref" href="#${sectionByNumber[n]}">§${n}</a>` : m));

  // Tautan bukti. Selama draf, tautan kosong tampil putus-putus supaya kelihatan mana yang belum diisi.
  const proofLink = (label, url, cls = "evlink") => {
    if (hasUrl(url)) {
      return `<a class="${cls}" href="${esc(toHref(url))}" target="_blank" rel="noopener">${esc(label)}${icon("arrow-ne")}</a>`;
    }
    return isDraft ? `<span class="${cls} is-empty" title="Tautan belum diisi di js/data.js">${esc(label)}</span>` : "";
  };

  const evidenceOf = (f) => (f.evidence || []).filter((e) => isDraft || hasUrl(e.url));

  /* ---------- Sampul & data umum ---------- */

  const evidenced = findings.filter((f) => evidenceOf(f).length > 0).length;

  const binds = {
    docId: M.docId,
    version: M.version,
    name: P.name,
    role: P.role,
    location: P.location,
    dateLong: fmtDate(M.date),
    year: String(M.date || "").slice(0, 4) || String(new Date().getFullYear()),
    subject: [P.name, P.program, P.institution].filter(Boolean).join(", "),
    signPlace: [P.location, fmtDate(M.date)].filter(Boolean).join(", "),
    evidenced: String(evidenced),
    findingCount: String(findings.length)
  };
  $$("[data-bind]").forEach((el) => {
    const v = binds[el.dataset.bind];
    if (v != null) el.textContent = v;
  });

  if (P.name) document.title = `${P.name} · Laporan Asesmen Keamanan Siber`;
  $$("[data-draft]").forEach((el) => (el.hidden = !isDraft));
  $("#stamp").setAttribute("aria-label", `Bukti terlampir pada ${evidenced} dari ${findings.length} temuan`);

  const cv = $("#cvLink");
  if (hasUrl(P.cvUrl)) {
    cv.href = toHref(P.cvUrl);
    cv.target = "_blank";
    cv.rel = "noopener";
  } else if (isDraft) {
    cv.removeAttribute("href");
    cv.classList.add("is-empty");
    cv.title = "Isi cvUrl di js/data.js";
  } else {
    cv.hidden = true;
  }

  /* ---------- Daftar isi & bagian aktif ---------- */

  const secs = $$(".sec[data-n]");
  const tocHtml = secs
    .map((s) => `<li><a href="#${s.id}" data-sec="${s.id}"><span class="toc__n">${s.dataset.n}</span><span>${esc(s.dataset.title)}</span></a></li>`)
    .join("");
  $$("[data-toc]").forEach((ol) => (ol.innerHTML = tocHtml));

  const runSec = $("#runSec");
  let lastSec = null;
  const trackSection = () => {
    const line = innerHeight * 0.35;
    let current = "";
    for (const s of secs) if (s.getBoundingClientRect().top <= line) current = s.id;
    if (current === lastSec) return;
    lastSec = current;
    $$("[data-toc] a").forEach((a) => a.setAttribute("aria-current", String(a.dataset.sec === current)));
    const s = current && document.getElementById(current);
    runSec.textContent = s ? `§${s.dataset.n} ${s.dataset.title}` : "Sampul";
  };
  let ticking = false;
  addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        trackSection();
      });
    },
    { passive: true }
  );
  addEventListener("resize", trackSection);
  trackSection();

  const mtoc = $("#mtoc");
  mtoc.addEventListener("click", (e) => {
    if (e.target.closest("a")) mtoc.open = false;
  });
  document.addEventListener("click", (e) => {
    if (mtoc.open && !mtoc.contains(e.target)) mtoc.open = false;
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mtoc.open) {
      mtoc.open = false;
      $("summary", mtoc).focus();
    }
  });

  /* ---------- §1 Ringkasan ---------- */

  $("#summary").innerHTML = (P.summary || []).map((p) => `<p>${linkify(p)}</p>`).join("");

  const counts = Object.fromEntries(LEVELS.map((l) => [l.key, 0]));
  findings.forEach((f) => {
    if (f.level in counts) counts[f.level] += 1;
  });

  $("#distTotal").textContent = `${findings.length} temuan · ${evidenced} dengan bukti`;
  $("#distBar").innerHTML = LEVELS.filter((l) => counts[l.key])
    .map((l) => {
      const attrs = `class="dist__seg" data-level="${l.key}" style="--n:${counts[l.key]};--c:var(--sev-${l.key})" title="${l.label}: ${counts[l.key]} temuan"`;
      return canFilter
        ? `<button type="button" tabindex="-1" ${attrs}>${counts[l.key]}</button>`
        : `<span ${attrs}>${counts[l.key]}</span>`;
    })
    .join("");
  $("#distLegend").innerHTML = LEVELS.map((l) => {
    const inner = `<span class="lvbtn__sw"></span><span>${l.label}</span><span class="lvbtn__n">${counts[l.key]}</span>`;
    if (!canFilter) return `<li><span class="lvbtn is-static${counts[l.key] ? "" : " is-zero"}" style="--c:var(--sev-${l.key})">${inner}</span></li>`;
    return (
      `<li><button type="button" class="lvbtn" data-level="${l.key}" aria-pressed="false" style="--c:var(--sev-${l.key})"${counts[l.key] ? "" : " disabled"}>` +
      `${inner}</button></li>`
    );
  }).join("");
  $(".dist__hint").hidden = !canFilter;

  const facts = [
    ["Institusi", P.institution],
    ["Program studi", P.program],
    ["SMA", P.highSchool],
    ["Semester", P.semester],
    ["Domisili", P.location],
    ["Fokus", P.focus],
    ["Handle CTF", P.handle]
  ];
  const shownFacts = facts.filter(([, v]) => v);
  $("#facts").innerHTML = shownFacts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("");
  // Jumlah kolom mengikuti jumlah isi supaya tidak ada kotak yang sendirian di baris terakhir.
  const n = shownFacts.length;
  $("#facts").style.setProperty("--facts-cols", n <= 2 ? n : n % 3 === 0 ? 3 : n % 4 === 0 ? 4 : 3);

  /* ---------- §2 Ruang lingkup ---------- */

  if ($("#scopeTable")) $("#scopeTable tbody").innerHTML = (D.scope || [])
    .map((s) => {
      const status = s.status || s.depth || "";
      const lvl = DEPTH[status] || 0;
      const pips = lvl
        ? `<span class="depth__pips" aria-hidden="true">${[1, 2, 3].map((i) => `<i class="${i <= lvl ? "on" : ""}"></i>`).join("")}</span>`
        : "";
      const refs = (s.findings || []).map(xref).join("");
      return `<tr>
        <td data-label="Bidang" class="strong">${esc(s.domain)}</td>
        <td data-label="Status"><span class="depth">${pips}${esc(status)}</span></td>
        <td data-label="Alat utama" class="muted">${esc(s.tools)}</td>
        <td data-label="Rujukan" class="muted">${esc(s.reference)}</td>
        <td data-label="Bukti"><span class="refs">${refs || "-"}</span></td>
      </tr>`;
    })
    .join("");

  if ($("#roe")) {
    if (D.rulesOfEngagement) $("#roe").textContent = D.rulesOfEngagement;
    else $(".roe").hidden = true;
  }

  /* ---------- Pengalaman organisasi ---------- */

  if ($("#orgTable")) {
    $("#orgTable tbody").innerHTML = (D.organizations || [])
      .map(
        (o) => `<tr>
        <td data-label="Peran" class="strong">${esc(o.role)}</td>
        <td data-label="Kegiatan">${esc(o.activity)}</td>
        <td data-label="Tingkat" class="muted">${esc(o.scope || "-")}</td>
        <td data-label="Tahun" class="mono">${esc(o.year || "-")}</td>
      </tr>`
      )
      .join("");
    if (D.organizationsNote) $("#orgNote").textContent = D.organizationsNote;
    else $("#orgNote").hidden = true;
  }

  /* ---------- Penilaian mandiri (bintang) ---------- */

  // 5 bintang untuk skala 1-10: 1 bintang = 2 poin, setengah bintang = 1 poin.
  const stars = (level) => {
    const v = Math.max(0, Math.min(10, Math.round(Number(level) || 0)));
    const label = `Nilai ${v} dari 10, ${String(v / 2).replace(".", ",")} dari 5 bintang`;
    const cells = [0, 1, 2, 3, 4]
      .map((i) => {
        const fill = Math.max(0, Math.min(1, v / 2 - i)) * 100;
        return (
          `<span class="star"><svg class="star__base" aria-hidden="true"><use href="#i-star"/></svg>` +
          `<span class="star__fill" style="width:${fill}%"><svg aria-hidden="true"><use href="#i-star"/></svg></span></span>`
        );
      })
      .join("");
    return `<span class="rating"><span class="stars" role="img" aria-label="${label}">${cells}</span><span class="rating__n">${v}/10</span></span>`;
  };

  if ($("#skillTable")) {
    $("#skillTable tbody").innerHTML = (D.skills || [])
      .map(
        (k) => `<tr>
        <td data-label="Keterampilan" class="strong">${esc(k.skill)}</td>
        <td data-label="Jenis" class="muted">${esc(k.type)}</td>
        <td data-label="Nilai">${k.level == null && k.levelText ? `<span class="rating__text">${esc(k.levelText)}</span>` : stars(k.level)}</td>
        <td data-label="Dasar penilaian">${linkify(k.basis)}</td>
      </tr>`
      )
      .join("");
  }

  /* ---------- §3 Temuan ---------- */

  $("#scaleList").innerHTML = LEVELS.map((l) => `<dt>${sevChip(l.key)}</dt><dd>${l.rule}</dd>`).join("");

  $("#filters").hidden = !canFilter;
  $("#filterStatus").hidden = !canFilter;
  $("#filters").innerHTML =
    `<button type="button" class="fbtn" data-level="" aria-pressed="true">Semua<span class="fbtn__n">${findings.length}</span></button>` +
    LEVELS.map(
      (l) =>
        `<button type="button" class="fbtn" data-level="${l.key}" aria-pressed="false" style="--c:var(--sev-${l.key})"${counts[l.key] ? "" : " disabled"}>` +
        `<span class="fbtn__sw"></span>${l.label}<span class="fbtn__n">${counts[l.key]}</span></button>`
    ).join("");

  $("#findings").innerHTML = findings
    .map((f) => {
      const lv = LEVEL[f.level] || LEVEL.info;
      const ev = evidenceOf(f);
      const status = ev.length
        ? `<span class="status"><span class="status__mark"></span>Bukti terlampir (${ev.length})</span>`
        : `<span class="status status--pending"><span class="status__mark"></span>Dalam proses, belum ada bukti</span>`;
      return `<li class="fitem" data-level="${lv.key}">
        <div class="fclip">
          <article class="finding" id="${esc(f.id)}" aria-labelledby="${esc(f.id)}-t">
            <div class="finding__head">
              <span class="finding__id">${esc(f.id)}</span>
              <h3 class="finding__title" id="${esc(f.id)}-t">${esc(f.title)}</h3>
              ${sevChip(lv.key)}
              <p class="finding__meta"><span>${esc(f.category)}</span><span>${fmtDate(f.date)}</span></p>
            </div>
            ${f.vector ? `<p class="finding__vector">${esc(f.vector)}</p>` : ""}
            <dl class="finding__body">
              <dt>Deskripsi</dt><dd>${linkify(f.description)}</dd>
              <dt>Hasil</dt><dd>${linkify(f.result)}</dd>
              ${ev.length ? `<dt>Bukti</dt><dd><div class="evidence">${ev.map((e) => proofLink(e.label, e.url)).join("")}</div></dd>` : ""}
              <dt>Status</dt><dd>${status}</dd>
            </dl>
          </article>
        </div>
      </li>`;
    })
    .join("");

  // Penyaring: satu status dipakai bersama oleh distribusi di §1 dan tombol di §3.
  const items = $$(".fitem");
  const dist = $(".dist");
  let active = "";

  const applyFilter = (level) => {
    active = level;
    items.forEach((li) => {
      const out = Boolean(level) && li.dataset.level !== level;
      li.classList.toggle("is-out", out);
      li.inert = out;
      if (out) li.setAttribute("aria-hidden", "true");
      else li.removeAttribute("aria-hidden");
    });
    $$(".fbtn").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.level === level)));
    $$(".lvbtn").forEach((b) => b.setAttribute("aria-pressed", String(Boolean(level) && b.dataset.level === level)));
    $$(".dist__seg").forEach((b) => b.classList.toggle("is-on", b.dataset.level === level));
    dist.classList.toggle("is-filtering", Boolean(level));
    $("#filterStatus").textContent = level
      ? `Menampilkan ${counts[level]} dari ${findings.length} temuan bertingkat ${LEVEL[level].label}.`
      : `Menampilkan semua ${findings.length} temuan.`;
  };

  const onLevelClick = (e) => {
    const btn = e.target.closest("button[data-level]");
    if (!btn || btn.disabled) return;
    const level = btn.dataset.level && btn.dataset.level === active ? "" : btn.dataset.level;
    applyFilter(level);
    if (level && btn.closest(".dist")) {
      $("#temuan").scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
    }
  };
  if (canFilter) {
    $("#filters").addEventListener("click", onLevelClick);
    dist.addEventListener("click", onLevelClick);
    applyFilter("");
  }

  // Rujukan ke temuan yang sedang tersaring: buka lagi semua temuan, lalu gulir ke sana.
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#F-"]');
    if (!a) return;
    const target = document.getElementById(a.getAttribute("href").slice(1));
    const li = target && target.closest(".fitem");
    if (!li || !li.classList.contains("is-out")) return;
    e.preventDefault();
    applyFilter("");
    setTimeout(() => target.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" }), reduceMotion() ? 0 : 470);
  });

  /* ---------- §4 Writeup ---------- */

  const writeups = D.writeups || [];
  const feat = writeups.find((w) => w.featured);
  const points = (w) => (w.points != null ? `${w.points} poin` : "");

  if (feat && $("#featured")) {
    $("#featured").innerHTML = `<article class="featured">
      <div>
        <div class="featured__cat"><span class="cat">${esc(feat.category)}</span></div>
        <h3 class="featured__title">${esc(feat.title)}</h3>
        <p class="featured__meta">${[esc(feat.event), points(feat)].filter(Boolean).join(" · ")}</p>
        ${feat.note ? `<p class="featured__note">${linkify(feat.note)}</p>` : ""}
      </div>
      ${proofLink("Baca writeup lengkap", feat.url, "linkbtn")}
    </article>`;
  }

  if ($("#writeups")) $("#writeups").innerHTML = writeups
    .filter((w) => w !== feat)
    .map((w) => {
      const title = hasUrl(w.url)
        ? `<a href="${esc(toHref(w.url))}" target="_blank" rel="noopener">${esc(w.title)}</a>`
        : `<span title="${isDraft ? "Tautan belum diisi di js/data.js" : ""}">${esc(w.title)}</span>`;
      return `<li class="witem">
        <span class="witem__cat"><span class="cat">${esc(w.category)}</span></span>
        <span class="witem__title">${title}</span>
        <span class="witem__pts">${points(w)}</span>
        <span class="witem__event">${esc(w.event)}</span>
      </li>`;
    })
    .join("");

  /* ---------- §5 Alat, §6 Sertifikasi, §7 Kronologi ---------- */

  if ($("#toolTable")) $("#toolTable tbody").innerHTML = (D.tools || [])
    .map(
      (t) => `<tr>
        <td data-label="Nama" class="strong nowrap">${esc(t.name)}</td>
        <td data-label="Fungsi">${esc(t.tagline)}</td>
        <td data-label="Teknologi" class="muted">${esc(t.stack)}</td>
        <td data-label="Bintang" class="num mono">${t.stars != null ? esc(t.stars) : "-"}</td>
        <td data-label="Repositori">${proofLink("Buka repo", t.url) || "-"}</td>
      </tr>`
    )
    .join("");

  if ($("#certTable")) $("#certTable tbody").innerHTML = (D.certifications || [])
    .map(
      (c) => `<tr>
        <td data-label="Nama" class="strong">${esc(c.name)}</td>
        <td data-label="Penerbit" class="muted">${esc(c.issuer || "-")}</td>
        <td data-label="Terbit">${fmtDate(c.date)}</td>
        <td data-label="Verifikasi">${proofLink(c.linkLabel || "Cek kredensial", c.credentialUrl) || "-"}</td>
      </tr>`
    )
    .join("");

  if ($("#timeline")) $("#timeline").innerHTML = (D.timeline || [])
    .map(
      (t) => `<li>
        <span class="log__date">${esc(t.date)}</span>
        <span class="log__text">${esc(t.text)}</span>
        <span>${t.ref ? xref(t.ref) : ""}</span>
      </li>`
    )
    .join("");

  /* ---------- Rencana tindak lanjut ---------- */

  if ($("#plan")) {
    $("#plan").innerHTML = (D.plan || [])
      .map((p) => {
        const status = p.done
          ? `<span class="status"><span class="status__mark"></span>Tercapai</span>`
          : `<span class="status status--pending"><span class="status__mark"></span>Direncanakan</span>`;
        return `<li>
          <span class="plan__when">${esc(p.target)}</span>
          <span class="plan__text">${linkify(p.text)}</span>
          <span class="plan__status">${status}</span>
        </li>`;
      })
      .join("");
  }

  /* ---------- Rekomendasi, kontak, kontrol dokumen ---------- */

  $("#recs").innerHTML = (D.recommendations || [])
    .map((r, i) => `<li><span class="recs__id">R-${String(i + 1).padStart(2, "0")}</span><span class="recs__text">${linkify(r)}</span></li>`)
    .join("");

  $("#contact").innerHTML = Object.entries(C)
    .filter(([, v]) => v)
    .map(([key, value]) => {
      const id = `ct-${key}`;
      const isEmail = /^[^\s@/]+@[^\s@/]+\.[^\s@/]+$/.test(String(value).trim());
      const href = isEmail ? `mailto:${value}` : toHref(value);
      const label = CONTACT_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1);
      return `<div>
        <dt>${esc(label)}</dt>
        <dd>
          <span class="contact__val" id="${esc(id)}">${esc(value)}</span>
          <span class="contact__acts">
            <button class="copybtn" type="button" data-copy-target="${esc(id)}" aria-label="Salin ${esc(label)}">${icon("copy")}<span>Salin</span></button>
            <a class="openbtn" href="${esc(href)}"${isEmail ? "" : ' target="_blank" rel="noopener"'}>${isEmail ? "Tulis email" : "Buka"}${icon("arrow-ne")}</a>
          </span>
        </dd>
      </div>`;
    })
    .join("");

  $("#historyTable tbody").innerHTML = (M.history || [])
    .map((h) => `<tr><td class="mono">${esc(h.version)}</td><td class="mono">${esc(h.date)}</td><td>${esc(h.note)}</td></tr>`)
    .join("");

  /* ---------- Salin ke papan klip ---------- */

  const announcer = $("#announcer");
  const announce = (msg) => {
    announcer.textContent = "";
    requestAnimationFrame(() => (announcer.textContent = msg));
  };

  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".copybtn");
    if (!btn) return;
    const src = document.getElementById(btn.dataset.copyTarget);
    if (!src) return;
    const text = src.dataset.copy || src.textContent.trim();
    const label = $("span", btn);
    const use = $("use", btn);
    try {
      await navigator.clipboard.writeText(text);
      btn.classList.add("is-done");
      label.textContent = "Tersalin";
      use.setAttribute("href", "#i-check");
      announce("Tersalin ke papan klip");
      setTimeout(() => {
        btn.classList.remove("is-done");
        label.textContent = "Salin";
        use.setAttribute("href", "#i-copy");
      }, 1800);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(src);
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      label.textContent = "Tekan Ctrl+C";
      announce("Teks sudah dipilih, tekan Ctrl+C untuk menyalin");
      setTimeout(() => (label.textContent = "Salin"), 2600);
    }
  });

  /* ---------- Sidik jari SHA-256 ---------- */

  const hashEl = $("#hashVal");
  (async () => {
    try {
      if (!window.crypto || !crypto.subtle) throw new Error("SubtleCrypto tidak tersedia");
      const bytes = new TextEncoder().encode(JSON.stringify(D));
      const digest = await crypto.subtle.digest("SHA-256", bytes);
      const hex = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
      hashEl.dataset.copy = hex;
      hashEl.textContent = hex.match(/.{8}/g).join(" ");
    } catch {
      hashEl.textContent = "Tidak bisa dihitung di sini. Buka halaman lewat https:// atau localhost.";
      $(".hash .copybtn").hidden = true;
    }
  })();

  /* ---------- Tema ---------- */

  const root = document.documentElement;
  const darkQuery = matchMedia("(prefers-color-scheme: dark)");
  const themeBtn = $("#themeBtn");
  const currentTheme = () => root.getAttribute("data-theme") || (darkQuery.matches ? "dark" : "light");
  const syncThemeBtn = () => {
    const label = currentTheme() === "dark" ? "Ganti ke tema terang" : "Ganti ke tema gelap";
    themeBtn.setAttribute("aria-label", label);
    themeBtn.title = label;
  };
  themeBtn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("tema", next);
    } catch {
      /* penyimpanan diblokir: tema tetap berlaku sampai halaman ditutup */
    }
    syncThemeBtn();
  });
  if (darkQuery.addEventListener) darkQuery.addEventListener("change", syncThemeBtn);
  syncThemeBtn();
})();
