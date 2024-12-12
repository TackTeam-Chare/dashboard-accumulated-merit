"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import liff from "@line/liff";
import { Dialog } from "@headlessui/react";
import {
  FaUnlock,
  FaLock,
  FaBell,
  FaTimes,
  FaUserCircle,
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
  const [userName, setUserName] = useState("คุณเคน");
  const [userStatus, setUserStatus] = useState("ผู้สะสมแต้มเริ่มต้น");
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150");
  const [statusMessage, setStatusMessage] = useState("กำลังดึงข้อมูล...");
  const [meritPoints, setMeritPoints] = useState(0);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [totalMeritGoal, setTotalMeritGoal] = useState(100000);
  const [specialFeatures, setSpecialFeatures] = useState([]);

  const quote = "ชีวิตนี้น้อยนัก แต่ชีวิตนี้สำคัญนัก";
  const progressPercentage = ((meritPoints / totalMeritGoal) * 100).toFixed(2);

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
      description: "พระปิดตารวยไม่ยั้ง หลวงปู่มหาศิลา สิริจันโท เนื้อผงยาไท้จินดาทิพมนต์มังคละมหามงคลหลวง 500 แต้ม",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYEg8MgRGDppDtr0siqP6ZjTTZ1BzAjX68Lw&s",
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

    // LIFF initialization in useEffect
    useEffect(() => {
      const initLiff = async () => {
        try {
          const liffId = process.env.NEXT_PUBLIC_LIFF_ID; // Use LIFF ID from .env
          await liff.init({ liffId });
    
          if (liff.isLoggedIn()) {
            setIsLoggedIn(true);
            const profile = await liff.getProfile();
    
            // Extract data from LIFF profile
            const lineUserId = profile.userId;
            const displayName = profile.displayName;
    
            // Send data to the backend using axios
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`,
              { lineUserId, displayName },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            
             // Check the response and update state
          const { user, activities } = response.data;
          setUserName(user.Nickname);
          setUserStatus(user.MeritStatus);
          setMeritPoints(user.MeritPoint || 0);
          setAvatar(profile.pictureUrl || "https://i.pravatar.cc/150");
          setStatusMessage(profile.statusMessage);
          setActivities(activities || []);
          } else {
            liff.login();
          }
        } catch (error) {
          console.error("Error initializing LIFF:", error);
        } finally {
          setIsLoading(false);
        }
      };
    
      initLiff();
    }, []);
    
    useEffect(() => {
      // ฟังก์ชันสำหรับดึงข้อมูลจากฐานข้อมูล
      const fetchSpecialFeatures = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/specialfeatures`
          );
          setSpecialFeatures(response.data); // เก็บข้อมูลที่ได้ใน State
        } catch (error) {
          console.error("Error fetching special features:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchSpecialFeatures();
    }, []);
  
    // Loading state
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
          <p>กำลังโหลด...</p>
        </div>
      );
    }
  
    // If not logged in
    if (!isLoggedIn) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
          <p>กรุณาล็อกอิน...</p>
        </div>
      );
    }
    
  
    
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

<section className="px-4">
  <h2 className="text-lg font-bold flex items-center gap-2">
    <FaChartPie className="text-2xl" /> ความก้าวหน้าในการสะสมแต้มบุญ
  </h2>
  <div className="relative mt-4">
    <div className="h-4 bg-gray-300 rounded-full">
      <div
        className="h-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
        style={{ width: `${progressPercentage}%`, transition: "width 1s ease" }}
      ></div>
    </div>
    <p className="text-center text-sm mt-2 text-yellow-200">
      {progressPercentage}% ของเป้าหมาย ({meritPoints}/{totalMeritGoal})
    </p>
  </div>
</section>

	    <section className="px-4 mt-8">
 <h2 className="text-lg font-bold flex items-center gap-2 text-white">
    <GiLotus className="text-2xl" /> กิจกรรมล่าสุด
  </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {activities.map((activity) => (
            <div
              key={activity.ActivityID}
              className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 rounded-xl shadow-lg"
            >
              <h3 className="font-bold">{activity.NameOfActivities}</h3>
              <p className="text-sm text-gray-200">{activity.Status}</p>
              <p>
                <MdOutlineEmojiEvents className="inline" /> {activity.Rewards} points
              </p>
              <p>
                <FaCalendarAlt className="inline" /> {activity.Start} (Duration: {activity.Duration} mins)
              </p>
            </div>
          ))}
        </div>
</section>

        <main className="flex-grow px-4 py-6">
        <section className="px-4 mt-8">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <GiLotus className="text-2xl" /> รางวัลและสิทธิพิเศษ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {specialFeatures.map((feature) => (
              <div
                key={feature.FeatureID}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-xl shadow-lg hover:scale-105 transition"
              >
                <h3 className="text-lg font-semibold">{feature.FeatureName}</h3>
                <p className="text-sm">{feature.Type}</p>
                {feature.StatusID === 1 ? (
                  <button className="mt-4 w-full bg-white text-blue-700 py-2 px-4 rounded-full shadow-md">
                    <FaUnlock className="inline mr-2" />
                    ใช้รางวัล
                  </button>
                ) : (
                  <button
                    className="mt-4 w-full bg-gray-400 text-white py-2 px-4 rounded-full"
                    disabled
                  >
                    <FaLock className="inline mr-2" />
                    ยังไม่ปลดล็อค
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

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
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div className="bg-gradient-to-br from-[#1478D2] to-[#0D2745] rounded-xl p-5 w-11/12 max-w-sm text-white shadow-lg">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <img
          src={avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-white mb-4 cursor-pointer hover:opacity-90 transition"
          onClick={() => setChangeAvatarOpen(true)}
        />
        <h3 className="text-xl font-semibold text-white">{userName}</h3>
        <p className="text-sm text-gray-300 mt-2">{statusMessage}</p>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setProfileOpen(false)}
        className="mt-6 bg-gradient-to-r from-[#0D2745] to-[#1478D2] text-white w-full py-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition duration-150"
      >
        <FaTimes className="text-lg" /> ปิด
      </button>
    </div>
  </div>
</Dialog>

{/* Notification Modal */}
<Dialog open={isNotificationOpen} onClose={() => setNotificationOpen(false)} className="relative z-50">
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div className="bg-gradient-to-br from-[#1478D2] to-[#0D2745] rounded-xl p-4 w-11/12 max-w-sm text-white shadow-md">
      {/* Modal Header */}
      <h3 className="text-2xl font-semibold text-center text-white mb-4">การแจ้งเตือน</h3>

      {/* Notification List */}
      <ul className="space-y-3">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className="flex items-start gap-3 border-b border-white/20 pb-2 last:border-b-0"
          >
            {/* Icon */}
            <div className="flex-shrink-0 bg-gradient-to-r from-[#FFD700] via-[#FF965A] to-[#FF6347] p-2 rounded-full shadow-sm">
              <HiBellAlert className="text-white text-lg" />
            </div>
            {/* Content */}
            <div className="flex-1">
              <p className="text-base font-medium text-white">{notif.title}</p>
              <p className="text-sm text-gray-300">{notif.time}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Close Button */}
      <button
        onClick={() => setNotificationOpen(false)}
        className="mt-5 bg-gradient-to-r from-[#1478D2] to-[#0D2745] text-white w-full py-2 rounded-lg flex items-center justify-center gap-2 text-base font-medium shadow-md hover:opacity-90 transition duration-150"
      >
        <HiOutlineXCircle className="text-lg" /> ปิด
      </button>
    </div>
  </div>
</Dialog>



    </div>
  );
}
