const shapes = {
  heart: <path d="M20.8 8.8c0 5.1-8.8 10.1-8.8 10.1S3.2 13.9 3.2 8.8a4.6 4.6 0 0 1 8.8-1.7 4.6 4.6 0 0 1 8.8 1.7Z" />,
  sparkle: <><path d="M12 2.8 14.4 9.6 21.2 12l-6.8 2.4L12 21.2l-2.4-6.8L2.8 12l6.8-2.4L12 2.8Z"/><path d="m19 2 .7 2.3L22 5l-2.3.7L19 8l-.7-2.3L16 5l2.3-.7L19 2Z"/></>,
  arrowRight: <><path d="M4 12h15"/><path d="m13 5 7 7-7 7"/></>,
  arrowLeft: <><path d="M20 12H5"/><path d="m11 5-7 7 7 7"/></>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  minus: <path d="M5 12h14"/>,
  check: <path d="m5 12 4.5 4.5L19 7"/>,
  gift: <><path d="M4 10h16v11H4zM3 6h18v4H3zM12 6v15"/><path d="M12 6H8.4a2.4 2.4 0 1 1 2.3-3c.5.9 1.3 3 1.3 3Zm0 0h3.6a2.4 2.4 0 1 0-2.3-3C12.8 3.9 12 6 12 6Z"/></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></>,
  coin: <><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5c-.7-.6-1.6-.9-2.8-.9-1.7 0-2.8.8-2.8 2.1 0 3 5.9 1.3 5.9 4.5 0 1.4-1.2 2.3-3.1 2.3-1.2 0-2.4-.4-3.3-1.2M12 5.5v13"/></>,
  giftCard: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M7 14h4"/><path d="m16 12 .8 1.5 1.7.2-1.2 1.1.3 1.7-1.6-.8-1.5.8.3-1.7-1.2-1.1 1.7-.2L16 12Z"/></>,
  close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-8h6v8"/></>,
}

export default function Icon({ name, size = 18, strokeWidth = 1.6, className = '' }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[name] ?? shapes.sparkle}</svg>
}
