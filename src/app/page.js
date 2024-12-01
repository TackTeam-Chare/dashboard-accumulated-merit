"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  FaUnlock,
  FaLock,
  FaBell,
  FaTimes,
  FaUserCircle,
  FaEdit,
  FaUser,
  FaSave,
  FaTimesCircle,
  FaChartPie,
  FaCalendarAlt,
  FaQuoteLeft,
  FaQuoteRight 
} from "react-icons/fa";
import { GiHolyGrail ,GiLotus  } from "react-icons/gi";
import { MdOutlineEmojiEvents, MdEventNote,MdSelfImprovement  } from "react-icons/md";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { HiBellAlert } from "react-icons/hi2";
import { HiOutlineXCircle } from "react-icons/hi2";

export default function Dashboard() {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isChangeAvatarOpen, setChangeAvatarOpen] = useState(false);
  const [userName, setUserName] = useState("คุณเคน");
  const [userStatus, setUserStatus] = useState("ผู้สะสมแต้มเริ่มต้น");
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150");

  const meritPoints = 295;
  const quote = "ชีวิตนี้น้อยนัก แต่ชีวิตนี้สำคัญนัก";




  const activities = [
    {
      id: 1,
      title: "สะสมบุญใกล้บ้าน",
      description: "ร่วมทำบุญบริจาคสิ่งของให้กับวัดใกล้บ้านคุณ พร้อมทั้งช่วยเหลือชุมชนเพื่อสร้างสรรค์สิ่งดีงาม",
      points: 50,
      image:
        "https://static.thairath.co.th/media/dFQROr7oWzulq5FZYjXiaKmVO3vcxON9xLf2HYojmsfQAfq5rjDmmiJhYZiOmWuToDF.jpg",
      duration: "วันที่ 1 ธันวาคม 2567 - 10 ธันวาคม 2567",
    },
    {
      id: 2,
      title: "ฟังธรรมประจำวัน",
      description: "ฟังธรรมบรรยายจากพระอาจารย์ผู้ทรงคุณธรรม ช่วยเพิ่มพูนปัญญาและความสงบสุขในชีวิต",
      points: 30,
      image: "https://images.unsplash.com/photo-1530847887473-36dbaf586122?crop=entropy&w=1080",
      duration: "วันที่ 5 ธันวาคม 2567 - 15 ธันวาคม 2567",
    },
    {
      id: 3,
      title: "งานวัดที่ใกล้มาถึง",
      description: "เข้าร่วมงานบุญในวัดใกล้บ้าน สนุกสนานกับกิจกรรม และร่วมพิธีกรรมเพื่อความเป็นสิริมงคล",
      points: 70,
      image: "https://cdn.chiangmainews.co.th/wp-content/uploads/2019/01/06133012/2109052.jpg",
      duration: "วันที่ 12 ธันวาคม 2567 - 20 ธันวาคม 2567",
    },
  ];
  
  

  const rewards = [
    {
      id: 1,
      name: "สิทธิ์เข้าร่วมพิธีปลุกเสก",
      status: "ปลดล็อคแล้ว",
      description: "เข้าร่วมพิธีปลุกเสกพิเศษที่จัดโดยพระอาจารย์ชื่อดัง",
      image: "https://assets.brandinside.asia/uploads/2024/03/ENNXO-BENJAPAKEE-AMULETS-1-1024x683.jpg",
    },
    {
      id: 2,
      name: "รับพระเครื่องลิมิเต็ด",
      status: "ยังไม่ปลดล็อค",
      description: "พระเครื่องรุ่นพิเศษสำหรับผู้สะสมแต้มบุญครบ 500 แต้ม",
      image: "https://inwfile.com/s-gj/0a4xmp.jpg",
    },
  ];
  

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "คุณมีภารกิจพิเศษที่ยังไม่เสร็จ!",
      time: "3 ชั่วโมงที่แล้ว",
    },
    {
      id: 2,
      title: "กิจกรรม: ฟังธรรมประจำวันเสร็จสมบูรณ์",
      time: "เมื่อวานนี้",
    },
    {
      id: 3,
      title: "ขอเชิญร่วมกิจกรรมทำบุญวันพระที่วัดใกล้บ้าน",
      time: "2 วันที่แล้ว",
    },
  ]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(to bottom, #1478D2, #0D2745, #ffffff)",
        color: "white",
      }}
    >
      {/* Header */}
      <header
  className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[blue-700/80] backdrop-blur-md shadow-md"
>
  <h1 className="text-2xl font-extrabold tracking-wide drop-shadow-md">
    เเดชบอร์ดสะสมแต้มบุญ
  </h1>
  <div className="flex gap-4">
    <button
      onClick={() => setNotificationOpen(true)}
      className="relative flex items-center justify-center p-2 rounded-full bg-blue-600 hover:bg-blue-800 shadow-lg transition-transform transform hover:scale-110"
    >
      <FaBell className="text-white text-lg" />
    </button>
    <button
      onClick={() => setProfileOpen(true)}
      className="relative flex items-center justify-center p-2 rounded-full bg-blue-600 hover:bg-blue-800 shadow-lg transition-transform transform hover:scale-110"
    >
      <FaUserCircle className="text-white text-2xl" />
    </button>
  </div>
</header>

<main className="flex-grow px-4 py-8 mt-20 pb-20">

<section className="bg-gradient-to-br from-[#1478D2] via-[#0D2745] to-[#0D2745] rounded-xl shadow-lg p-6 mb-8 text-white relative">
  {/* Floating Icon */}
  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-full shadow-md">
    <MdSelfImprovement className="text-4xl" />
  </div>

  <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
    <GiLotus className="text-2xl md:text-3xl text-yellow-300" /> {meritPoints} แต้ม
  </h2>
  
  <p className="mt-4 text-sm md:text-base flex items-center gap-2">
    <HiOutlineBadgeCheck className="text-xl text-green-400" />
    {userStatus}
  </p>
  
  <p className="mt-4 text-sm md:text-base flex items-center gap-2 italic">
    <FaQuoteLeft className="text-xl text-gray-300" />
    {quote}
    <FaQuoteRight className="text-xl text-gray-300" />
  </p>
</section>


      {/* Progress */}
      <section className="px-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <FaChartPie className="text-2xl" /> ความก้าวหน้าในการสะสมแต้มบุญ
        </h2>
        <div className="relative mt-4">
          <div className="h-4 bg-gray-300 rounded-full">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
              style={{ width: `${(meritPoints / 1000) * 100}%`, transition: 'width 1s ease' }}
            ></div>
          </div>
          <p className="text-center text-sm mt-2 text-yellow-200">
            {((meritPoints / 1000) * 100).toFixed(0)}% ของเป้าหมาย
          </p>
        </div>
      </section>

      <section className="px-4 mt-8">
  <h2 className="text-lg font-bold flex items-center gap-2 text-white">
    <GiLotus className="text-2xl" /> กิจกรรมล่าสุด
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {activities.map((activity) => (
      <div
        key={activity.id}
        className="relative flex flex-col bg-gradient-to-r from-[#0D2745] to-[#1478D2] rounded-3xl shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300 overflow-hidden"
      >
        {/* Ribbon for Points */}
        <div className="absolute top-0 left-0 bg-yellow-500 text-white text-sm md:text-base px-3 py-2 rounded-br-3xl flex items-center gap-2">
          <MdOutlineEmojiEvents className="text-lg" />
          <span>{activity.points} แต้ม</span>
        </div>

        {/* Activity Image */}
        <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-40 md:h-48 object-cover rounded-t-3xl"
        />

        {/* Activity Details */}
        <div className="p-6 flex flex-col flex-grow space-y-4 text-white">
          <h3 className="text-lg font-semibold">{activity.title}</h3>
          <p className="text-sm text-gray-300 flex-grow">{activity.description}</p>
          <p className="text-sm font-medium">
            <FaCalendarAlt className="inline-block mr-2 text-yellow-300" />
            ระยะเวลา: {activity.duration}
          </p>
          <button
            className="w-full bg-gradient-to-r from-green-400 to-green-700 text-white py-2 px-4 rounded-full shadow-md hover:from-green-500 hover:to-green-800 transition flex items-center justify-center gap-2"
          >
            <MdEventNote className="text-lg" />
            เข้าร่วมกิจกรรม
          </button>
        </div>
      </div>
    ))}
  </div>
</section>

<section className="px-4 mt-8">
  <h2 className="text-lg font-bold flex items-center gap-2 text-white">
    <GiLotus className="text-2xl" /> รางวัลและสิทธิพิเศษ
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {rewards.map((reward) => (
      <div
        key={reward.id}
        className="bg-gradient-to-r from-[#FFD700] via-[#FF965A] to-[#0D2745] rounded-3xl shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300 overflow-hidden"
      >
        {/* Reward Image */}
        <img
          src={reward.image}
          alt={reward.name}
          className="w-full h-40 md:h-48 object-cover rounded-t-3xl"
        />

        {/* Reward Details */}
        <div className="p-6 flex flex-col flex-grow space-y-4 text-white">
          <h3 className="text-lg font-semibold">{reward.name}</h3>
          <p className="text-sm text-gray-200">{reward.description}</p>
          {reward.status === "ปลดล็อคแล้ว" ? (
            <button
              className="w-full bg-white text-[#1478D2] py-2 px-4 rounded-full shadow-md hover:bg-blue-100 transition flex items-center justify-center gap-2"
            >
              <FaUnlock className="text-lg" />
              แลกรางวัล
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-[#1478D2] text-white py-2 px-4 rounded-full shadow-md flex items-center justify-center gap-2"
            >
              <FaLock className="text-lg" />
              ยังไม่สามารถแลกได้
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
</section>

      </main>
      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-blue-800/70 backdrop-blur-md text-white flex justify-around items-center py-3 shadow-lg">
        <a href="#overview" className="flex flex-col items-center text-sm hover:text-yellow-400 transition">
          <MdSelfImprovement size={28} />
          <span>หน้าแรก</span>
        </a>
        <a href="#activities" className="flex flex-col items-center text-sm hover:text-yellow-400 transition">
          <GiLotus size={24} />
          <span>กิจกรรม</span>
        </a>
        <a href="#rewards" className="flex flex-col items-center text-sm hover:text-yellow-400 transition">
  <GiHolyGrail size={28} />
  <span>รางวัล</span>
</a>

      </footer>

      {/* Profile Modal */}
      <Dialog open={isProfileOpen} onClose={() => setProfileOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-80 text-black">
            <img
              src={avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200 cursor-pointer"
              onClick={() => setChangeAvatarOpen(true)}
            />
            <h3 className="text-lg font-bold text-center">{userName}</h3>
            <p className="text-center text-sm text-gray-600">{userStatus}</p>
            <button
              onClick={() => {
                setProfileOpen(false);
                setEditProfileOpen(true);
              }}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center gap-2"
            >
              <FaEdit className="text-lg" /> แก้ไขโปรไฟล์
            </button>
            <button
              onClick={() => setProfileOpen(false)}
              className="mt-2 bg-gray-300 text-black px-4 py-2 rounded-lg w-full flex items-center justify-center gap-2"
            >
              <FaTimes className="text-lg" /> ปิด
            </button>
          </div>
        </div>
      </Dialog>

      {/* Edit Profile Modal */}
      <Dialog open={isEditProfileOpen} onClose={() => setEditProfileOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-80 text-black">
            <h3 className="text-lg font-bold text-center">แก้ไขโปรไฟล์</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEditProfileOpen(false);
              }}
            >
              {/* Username Field */}
              <div className="mt-4 relative">
                <label className="text-sm font-bold mb-2 block">ชื่อผู้ใช้:</label>
                <div className="relative">
                  <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500 text-xl" />
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border rounded-md"
                  />
                </div>
              </div>

      {/* Status Field */}
<div className="mt-4 relative">
  <label className="text-sm font-bold mb-2 block">สถานะ:</label>
  <div className="relative">
    <HiOutlineBadgeCheck className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500 text-2xl" />
    <input
      type="text"
      value={userStatus}
      onChange={(e) => setUserStatus(e.target.value)}
      className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
    />
  </div>
</div>


              {/* Save Button */}
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center gap-2"
              >
                <FaSave className="text-lg" /> บันทึก
              </button>

              {/* Cancel Button */}
              <button
                onClick={() => setEditProfileOpen(false)}
                className="mt-2 bg-gray-300 text-black px-4 py-2 rounded-lg w-full flex items-center justify-center gap-2"
              >
                <FaTimesCircle className="text-lg" /> ยกเลิก
              </button>
            </form>
          </div>
        </div>
      </Dialog>

      {/* Change Avatar Modal */}
      <Dialog open={isChangeAvatarOpen} onClose={() => setChangeAvatarOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-80 text-black">
            <h3 className="text-lg font-bold text-center">เปลี่ยนรูปโปรไฟล์</h3>
            <div className="mt-4">
              <label className="block text-sm font-bold mb-2">เลือกรูปโปรไฟล์ใหม่:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setAvatar(event.target.result);
                      setChangeAvatarOpen(false); // Close the modal after selection
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <button
              onClick={() => setChangeAvatarOpen(false)}
              className="mt-4 bg-gray-300 text-black px-4 py-2 rounded-lg w-full"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </Dialog>

{/* Notification Modal */}
<Dialog open={isNotificationOpen} onClose={() => setNotificationOpen(false)} className="relative z-50">
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-4 w-full max-w-md text-black mx-4 shadow-lg">
      {/* Modal Header */}
      <h3 className="text-2xl font-bold text-center text-gray-800">การแจ้งเตือน</h3>

      {/* Notification List */}
      <ul className="mt-6 space-y-4">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className="flex items-start gap-4 border-b pb-3 last:border-b-0"
          >
            {/* Icon */}
            <div className="flex-shrink-0 text-2xl text-gradient bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 p-2 rounded-full shadow-lg">
              <HiBellAlert />
            </div>
            {/* Content */}
            <div className="flex-1">
              <p className="text-base font-semibold text-gray-900">{notif.title}</p>
              <p className="text-sm text-gray-500">{notif.time}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Close Button */}
      <button
        onClick={() => setNotificationOpen(false)}
        className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white w-full py-3 rounded-lg flex items-center justify-center gap-2 text-base font-medium shadow-md hover:shadow-lg hover:bg-blue-600 transition duration-300"
      >
        <HiOutlineXCircle className="text-xl" /> ปิด
      </button>
    </div>
  </div>
</Dialog>

    </div>
  );
}
