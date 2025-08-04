import backgroundImg from "../assets/img/2.png";

export default function Header() {
  return (
    <div
      className="relative rounded-b-xl bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* 반투명 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-b-xl" />

      {/* 실제 콘텐츠 */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        {/* 프로필 영역 */}
        <div className="flex items-center gap-6 mb-6">
          {/* 프로필 사진 */}
          <div className="relative w-28 h-28">
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
              alt="Profile"
              className="rounded-full border-4 border-white shadow-md object-cover w-full h-full"
            />
          </div>

          {/* 이름 + 팀명 */}
          <div className="text-white">
            <h1 className="text-3xl font-bold">XYZ 팀</h1>
            <p className="text-10xl opacity-80 mb-1">oPLAY-CE (놀場)</p>
            <h2 className="text-lg font-semibold"></h2>
            <h3 className="text-base font-medium"></h3>
          </div>
        </div>


        </div>
      </div>
 
  );
}
