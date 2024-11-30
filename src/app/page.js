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

  // Data for the chart
  const progressData = [
    { name: "เป้าหมาย", points: 1000 },
    { name: "สะสมแล้ว", points: meritPoints },
  ];

  const activities = [
    {
      id: 1,
      description: "สะสมบุญใกล้บ้าน",
      points: 50,
      image:
        "https://static.thairath.co.th/media/dFQROr7oWzulq5FZYjXiaKmVO3vcxON9xLf2HYojmsfQAfq5rjDmmiJhYZiOmWuToDF.jpg",
    },
    {
      id: 2,
      description: "ฟังธรรมประจำวัน",
      points: 30,
      image: "https://images.unsplash.com/photo-1530847887473-36dbaf586122?crop=entropy&w=1080",
    },
    {
      id: 3,
      description: "งานวัดที่ใกล้มาถึง",
      points: 70,
      image: "https://cdn.chiangmainews.co.th/wp-content/uploads/2019/01/06133012/2109052.jpg",
    },
  ];

  const rewards = [
    { id: 1, name: "สิทธิพิเศษ 1", status: "ปลดล็อคแล้ว" },
    { id: 2, name: "สิทธิพิเศษ 2", status: "ปลดล็อคแล้ว" },
    { id: 3, name: "สิทธิพิเศษ 3", status: "ยังไม่ปลดล็อค" },
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
      background: "linear-gradient(to bottom, #1478D2, #0D2745)",
      color: "white",
    }}
  >
      {/* Header */}
      <header className="flex items-center  justify-between px-6 py-4 bg-blue-700/80 backdrop-blur-md shadow-md rounded-b-lg">
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

      {/* Overview */}
      <section className="text-center my-6 px-4">
        <div className="text-4xl font-bold drop-shadow-lg">{meritPoints} แต้ม</div>
        <p className="text-lg mt-2 font-medium drop-shadow-sm">{userStatus}</p>
        <p className="text-sm mt-1 italic text-gray-200 drop-shadow-sm">{quote}</p>
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

      {/* Activities */}
      <section className="px-4 mt-8">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <GiLotus  className="text-2xl"/> กิจกรรมล่าสุด
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-gradient-to-r from-white to-gray-100 rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 hover:shadow-lg transition"
            >
              <img
                src={activity.image}
                alt={activity.description}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-md font-semibold text-gray-800">{activity.description}</h3>
                <p className="text-green-600 font-bold mt-2">+{activity.points} แต้ม</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rewards */}
      <section className="px-4 mt-8 flex-grow pb-20">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <GiHolyGrail className=" text-4xl" /> รางวัลและสิทธิพิเศษ
        </h2>
        <div className="flex flex-wrap gap-6 justify-center mt-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`p-4 rounded-lg text-center flex flex-col items-center ${
                reward.status === "ปลดล็อคแล้ว" ? "bg-green-100" : "bg-red-100"
              } shadow-md`}
            >
              {reward.status === "ปลดล็อคแล้ว" ? (
                <FaUnlock className="text-green-600 mb-2 text-3xl" />
              ) : (
                <FaLock className="text-red-600 mb-2 text-3xl" />
              )}
              <p className="text-md font-semibold text-[#0D2745]">{reward.name}</p>
              <p className="text-xs text-gray-600">{reward.status}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800/70 backdrop-blur-md text-white flex justify-around items-center py-3 fixed bottom-0 w-full shadow-lg">
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
