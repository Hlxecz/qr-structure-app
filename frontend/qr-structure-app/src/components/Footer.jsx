export default function Footer() {
  return (
    <footer className="bg-black text-white text-center py-6">
      <div className="flex justify-center items-center gap-6 mb-4">
        {[
          { href: "https://www.instagram.com/architen10/", icon: "instagram", type: "fab" },
          { href: "https://architen10.kr", icon: "landmark", type: "fas" }, // ✅ 건축 느낌
          { href: "https://github.com/Hlxecz", icon: "github", type: "fab" },
        ].map(({ href, icon, type }, idx) => (
          <a
            key={idx}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition"
          >
            <i className={`${type} fa-${icon} fa-lg`}></i>
          </a>
        ))}
      </div>
      <div className="text-gray-400 text-sm">
        Architectural Collegiate Society based in Korea ARCHITEN {new Date().getFullYear()}
      </div>
    </footer>
  );
}
