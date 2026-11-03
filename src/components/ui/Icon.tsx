type IconName = 'search' | 'user' | 'bag' | 'heart' | 'truck' | 'shield' | 'gift' | 'headset' | 'arrow' | 'sparkle' | 'menu' | 'close' | 'instagram' | 'mail' | 'phone'

export function Icon({ name, className = 'icon' }: { name: IconName; className?: string }) {
  return <svg className={className} aria-hidden="true"><use href={`#i-${name}`} /></svg>
}

export function IconLibrary() {
  return <svg className="icon-library" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <symbol id="i-search" viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></symbol>
    <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="7.5" r="3.7"/><path d="M4.5 21c.7-4.2 3.3-6.4 7.5-6.4s6.8 2.2 7.5 6.4"/></symbol>
    <symbol id="i-bag" viewBox="0 0 24 24"><path d="M4.5 8.5h15l-1.2 12h-12zM8.5 9V6a3.5 3.5 0 0 1 7 0v3"/></symbol>
    <symbol id="i-heart" viewBox="0 0 24 24"><path d="M20.3 5.8a5 5 0 0 0-7.1 0L12 7l-1.2-1.2a5 5 0 0 0-7.1 7.1l1.2 1.2L12 21l7.1-6.9 1.2-1.2a5 5 0 0 0 0-7.1Z"/></symbol>
    <symbol id="i-truck" viewBox="0 0 24 24"><path d="M2.5 6.5h12v11h-12zM14.5 10h4l3 3.5v4h-7z"/><circle cx="7" cy="18.5" r="2"/><circle cx="18" cy="18.5" r="2"/><path d="M16 10v4h5"/></symbol>
    <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 2.5 20 6v5.3c0 4.9-3.2 8.2-8 10.2-4.8-2-8-5.3-8-10.2V6z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></symbol>
    <symbol id="i-gift" viewBox="0 0 24 24"><path d="M3 10h18v11H3zM2 6.5h20V10H2zM12 6.5v14.5M12 6.5H7.7a2.3 2.3 0 1 1 2.1-3.2L12 6.5Zm0 0h4.3a2.3 2.3 0 1 0-2.1-3.2L12 6.5Z"/></symbol>
    <symbol id="i-headset" viewBox="0 0 24 24"><path d="M3 13v-1a9 9 0 0 1 18 0v1"/><rect x="3" y="12" width="4" height="7" rx="2"/><rect x="17" y="12" width="4" height="7" rx="2"/><path d="M19 19c0 1.6-1.7 2.5-4.5 2.5"/></symbol>
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M19 12H5m0 0 6-6m-6 6 6 6"/></symbol>
    <symbol id="i-sparkle" viewBox="0 0 24 24"><path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></symbol>
    <symbol id="i-close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></symbol>
    <symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></symbol>
    <symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.5 3h3l1.4 4-2 1.5a15 15 0 0 0 6.6 6.6l1.5-2 4 1.4v3c0 1.2-1 2.2-2.2 2.2A16.8 16.8 0 0 1 4.3 5.2C4.3 4 5.3 3 6.5 3Z"/></symbol>
  </svg>
}
