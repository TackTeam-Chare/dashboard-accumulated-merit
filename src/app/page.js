"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  FaUnlock,
  FaLock,
  FaCrown,
  FaBell,
  FaTimes,
  FaChartLine,
  FaUserCircle,
  FaEdit,
  FaUser,
  FaSave,
  FaTimesCircle 
} from "react-icons/fa";
import { GiBuddha, GiLotus, GiTempleGate } from "react-icons/gi";
import { MdSelfImprovement, MdEventNote } from "react-icons/md";

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
      icon: <GiLotus className="text-green-900 text-2xl" />, 
      title: "คุณมีภารกิจพิเศษที่ยังไม่เสร็จ!",
      time: "3 ชั่วโมงที่แล้ว",
    },
    {
      id: 2,
      icon: <MdSelfImprovement className="text-blue-500 text-2xl" />, 
      title: "กิจกรรม: ฟังธรรมประจำวันเสร็จสมบูรณ์",
      time: "เมื่อวานนี้",
    },
    {
      id: 3,
      icon: <FaCrown className="text-orange-500 text-2xl" />, 
      title: "ขอเชิญร่วมกิจกรรมทำบุญวันพระที่วัดใกล้บ้าน",
      time: "2 วันที่แล้ว",
    },
  ]);
  
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-900 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-blue-700">
        <h1 className="text-xl font-bold">สะสมแต้มบุญ</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setNotificationOpen(true)}
            className="hover:text-yellow-300 transition flex items-center"
          >
            <FaBell size={24} />
          </button>
          <button
            onClick={() => setProfileOpen(true)}
            className="hover:text-yellow-300 transition flex items-center"
          >
            <FaUserCircle size={30} />
          </button>
        </div>
      </header>

      {/* Overview */}
      <section className="text-center my-6 px-4">
        <div className="text-4xl font-bold">{meritPoints} แต้ม</div>
        <p className="text-lg mt-2">{userStatus}</p>
        <p className="text-sm mt-1 italic">{quote}</p>
      </section>

      {/* Progress */}
      <section className="px-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <FaChartLine /> ความก้าวหน้าในการสะสมแต้มบุญ
        </h2>
        <div className="bg-gray-200 rounded-full h-4 mt-2">
          <div
            className="bg-yellow-500 h-4 rounded-full"
            style={{ width: `${(meritPoints / 1000) * 100}%` }}
          ></div>
        </div>
        <p className="text-center text-sm mt-1">
          {((meritPoints / 1000) * 100).toFixed(0)}% ของเป้าหมาย
        </p>
      </section>

      {/* Activities */}
      <section className="px-4 mt-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <MdEventNote /> กิจกรรมล่าสุด
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white text-black rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={activity.image}
                alt={activity.description}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <p className="font-medium">{activity.description}</p>
                <p className="text-green-600 font-bold mt-2">+{activity.points} แต้ม</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rewards */}
      <section className="px-4 mt-6 flex-grow pb-20">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <GiLotus className="text-white" /> รางวัลและสิทธิพิเศษ
        </h2>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`p-4 rounded-lg text-center flex flex-col items-center ${
                reward.status === "ปลดล็อคแล้ว" ? "bg-green-100" : "bg-red-100"
              } shadow-md`}
            >
              {reward.status === "ปลดล็อคแล้ว" ? (
                <FaUnlock className="text-green-600 mb-2 text-2xl" />
              ) : (
                <FaLock className="text-red-600 mb-2 text-2xl" />
              )}
              <p className="text-sm font-semibold text-[#0D2745]">{reward.name}</p>
              <p className="text-xs text-gray-600">{reward.status}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white flex justify-around items-center py-2 fixed bottom-0 w-full ">
        <a href="#overview" className="flex flex-col items-center text-sm hover:text-yellow-300">
          <MdSelfImprovement size={30} />
          <span>หน้าแรก</span>
        </a>
        <a href="#activities" className="flex flex-col items-center text-sm hover:text-yellow-300">
          <MdEventNote size={25} />
          <span>กิจกรรม</span>
        </a>
        <a href="#rewards" className="flex flex-col items-center text-sm hover:text-yellow-300">
          <GiLotus size={25} />
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
<Dialog
  open={isEditProfileOpen}
  onClose={() => setEditProfileOpen(false)}
  className="relative z-50"
>
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
            <MdSelfImprovement className="absolute top-1/2 left-3 transform -translate-y-1/2 text-green-800 text-2xl" />
            <input
              type="text"
              value={userStatus}
              onChange={(e) => setUserStatus(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-md"
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
<Dialog
  open={isNotificationOpen}
  onClose={() => setNotificationOpen(false)}
  className="relative z-50"
>
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-4 w-full max-w-md text-black mx-4">
      {/* Modal Header */}
      <h3 className="text-xl font-bold text-center">การแจ้งเตือน</h3>

      {/* Notification List */}
      <ul className="mt-6 space-y-4">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className="flex items-start gap-4 border-b pb-3 last:border-b-0"
          >
            {/* Icon */}
            <div className="flex-shrink-0 text-2xl">{notif.icon}</div>
            {/* Content */}
            <div className="flex-1">
              <p className="text-base font-semibold">{notif.title}</p>
              <p className="text-sm text-gray-500">{notif.time}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Close Button */}
      <button
        onClick={() => setNotificationOpen(false)}
        className="mt-6 bg-blue-500 text-white w-full py-3 rounded-lg flex items-center justify-center gap-2 text-base font-medium"
      >
        <FaTimes className="text-xl" /> ปิด
      </button>
    </div>
  </div>
</Dialog>


    </div>
  );
}
