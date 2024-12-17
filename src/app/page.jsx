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
  const [notifications, setNotifications] = useState([]);
  const quote = "ชีวิตนี้น้อยนัก แต่ชีวิตนี้สำคัญนัก";
  const progressPercentage = ((meritPoints / totalMeritGoal) * 100).toFixed(2);



  // const [notifications, setNotifications] = useState([
  //   {
  //     id: 1,
  //     title: "คุณมีภารกิจพิเศษที่ยังไม่เสร็จ!",
  //     time: "3 ชั่วโมงที่แล้ว",
  //   },
  //   {
  //     id: 2,
  //     title: "กิจกรรม: ฟังธรรมประจำวันเสร็จสมบูรณ์",
  //     time: "เมื่อวานนี้",
  //   },
  //   {
  //     id: 3,
  //     title: "ขอเชิญร่วมกิจกรรมทำบุญวันพระที่วัดใกล้บ้าน",
  //     time: "2 วันที่แล้ว",
  //   },
  // ]);

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
    
    // ดึงข้อมูล specialFeatures
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
          useEffect(() => {
    const fetchSpecialFeatures = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/specialfeatures`
        );
        setSpecialFeatures(response.data);

        // คำนวณการแจ้งเตือนจาก EndDate และ MeritPoints
        const currentDate = new Date();
        const newNotifications = response.data.map((feature) => {
          const endDate = new Date(feature.EndDate);
          const daysRemaining = Math.ceil(
            (endDate - currentDate) / (1000 * 60 * 60 * 24)
          );
          const pointsRemaining = totalMeritGoal - meritPoints;

          let message = "";
          if (daysRemaining > 0) {
            message = `รางวัล ${feature.FeatureName} เหลือเวลาอีก ${daysRemaining} วัน`;
          } else {
            message = `รางวัล ${feature.FeatureName} หมดอายุแล้ว`;
          }

          if (pointsRemaining > 0) {
            message += ` | ต้องการอีก ${pointsRemaining} แต้มเพื่อปลดล็อก`;
          }

          return {
            id: feature.FeatureID,
            title: message,
          };
        });

        setNotifications(newNotifications);
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchSpecialFeatures();
  }, [meritPoints]);
  
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
    className="min-h-screen bg-gradient-to-br from-[#0D2745] via-[#1478D2] to-[#ffffff] text-white"
  >
      {/* Header */}
      <header className="fixed  top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#0D2745] to-[#1478D2] shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-wider text-yellow-300 drop-shadow-lg">
          แดชบอร์ดสะสมแต้มบุญ
        </h1>
        <div className="flex gap-4">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={() => setNotificationOpen(true)}
            className="relative flex items-center justify-center p-3 rounded-full bg-yellow-400 text-[#0D2745] shadow-md hover:bg-yellow-300 transition-transform transform hover:scale-110"
          >
            <FaBell className="text-2xl" />
              {/* แสดงจำนวนแจ้งเตือน */}
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
              {notifications.length}
            </span>
          )}
          </button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={() => setProfileOpen(true)}
            className="relative flex items-center justify-center p-3 rounded-full bg-yellow-400 text-[#0D2745] shadow-md hover:bg-yellow-300 transition-transform transform hover:scale-110"
          >
            <FaUserCircle className="text-3xl" />
          </button>
        </div>
      </header>

      <main className="flex-grow px-4 py-8 mt-24 md:mt-32 lg:mt-36 pb-20">
<section
  id="overview"
  className="bg-gradient-to-br from-[#1478D2] via-[#0D2745] to-[#0D2745] rounded-xl shadow-lg p-6 mb-8 text-white relative flex flex-col items-center"
>
  {/* Icon in Center Top */}
  <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-md -mt-12">
    <MdSelfImprovement className="text-5xl text-white" />
  </div>

  <h2 className="mt-4 text-lg md:text-xl font-bold flex items-center gap-2 ">
    <GiLotus className="text-2xl md:text-3xl text-yellow-300 " /> {meritPoints} แต้ม
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
    <FaChartPie className="text-2xl text-yellow-300" /> ความก้าวหน้าในการสะสมแต้มบุญ
  </h2>
  <div className="relative mt-4">
    <div className="h-4 bg-gray-300 rounded-full">
      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
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
<section id="activities" className="px-4 mt-8">
  <h2 className="text-lg font-bold flex items-center gap-2 text-white">
    <GiLotus className="text-2xl text-yellow-300 " /> กิจกรรมที่ทำล่าสุด
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
    {activities.map((activity) => (
      <div
        key={activity.ActivityID}
        className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 p-4 rounded-xl shadow-md transition transform hover:scale-105"
      >
        <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm px-2 py-1 rounded-full shadow-md">
          <MdOutlineEmojiEvents className="inline mr-1" /> {activity.Rewards} แต้ม
        </div>
        <h3 className="text-xl font-bold  mb-2 flex items-center gap-2">
          <FaCalendarAlt className="text-lg text-yellow-300" />
          {activity.NameOfActivities}
        </h3>
        <p className="text-sm font-bold mt-2">
          สถานะ:{" "}
          <span
            className={`${
              activity.Status === "Active"
                ? "text-green-400"
                : "text-orange-400"
            }`}
          >
            {activity.Status === "Active" ? "กำลังดำเนินการ" : "เสร็จสิ้น"}
          </span>
        </p>
        <p className="text-sm text-gray-300 mt-2">
          <MdEventNote className="inline mr-1" />
          {new Date(activity.Start).toLocaleString("th-TH")}
        </p>
        <p className="text-sm text-gray-300">
          <MdSelfImprovement className="inline mr-1" />
          ระยะเวลา: {activity.Duration} นาที
        </p>

      </div>
    ))}
  </div>
</section>
        <main className="flex-grow px-4 py-6">
        <section id="rewards" className="px-4 mt-8">
  <h2 className="text-2xl font-extrabold text-center mb-6 tracking-wide">
    <GiHolyGrail className="inline-block mr-2 text-4xl text-yellow-300" />
    รางวัลและสิทธิพิเศษ
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {specialFeatures.map((feature) => {
      const requiredPoints = totalMeritGoal;
      const remainingPoints = requiredPoints - meritPoints;

      // ดึง EndDate และคำนวณวันคงเหลือ
      const endDate = feature.EndDate ? new Date(feature.EndDate) : null;
      const today = new Date();
      const diffTime = endDate ? endDate - today : 0;
      const daysRemaining = endDate ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;

      return (
        <div
          key={feature.FeatureID}
          className="bg-gradient-to-br from-yellow-500 to-orange-500 p-6 rounded-2xl shadow-2xl relative hover:scale-105 transition-transform duration-300"
        >
          {/* Decorative Top Icon */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-md">
            <GiLotus className="text-3xl text-yellow-500" />
          </div>

          {/* Title */}
          <h3 className="text-center text-xl font-bold text-white mt-4">
            {feature.FeatureName}
          </h3>
          <p className="text-center text-sm font-semibold mt-2">
            ประเภท: {feature.Type}
          </p>

          {/* ระยะเวลาที่เหลือ */}
          {endDate ? (
            <p className="text-center text-white mt-2 text-sm">
              <MdEventNote className="inline mr-1 " />
              {daysRemaining > 0
                ? `เหลืออีก ${daysRemaining} วัน (สิ้นสุดวันที่ ${endDate.toLocaleDateString("th-TH")})`
                : "หมดอายุแล้ว"}
            </p>
          ) : (
            <p className="text-center text-white mt-2 text-sm">
              <MdEventNote className="inline mr-1 text-yellow-300" />
              ไม่ได้ระบุวันสิ้นสุด
            </p>
          )}

          {/* Progress Bar */}
          <div className="relative mt-4">
            <div className="h-2 bg-gray-300 rounded-full">
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
              <div
                className="h-2 bg-yellow-400 rounded-full"
                style={{
                  width: `${(meritPoints / requiredPoints) * 100}%`,
                  transition: "width 1s ease",
                }}
              ></div>
            </div>
            <p className="text-center text-xs mt-2 ">
              {meritPoints >= requiredPoints
                ? "ปลดล็อคสำเร็จ!"
                : `ต้องการอีก ${remainingPoints > 0 ? remainingPoints : 0} แต้ม`}
            </p>
          </div>

          {/* Unlock Button */}
          <div className="mt-6 flex justify-center">
            {meritPoints >= requiredPoints ? (
              // biome-ignore lint/a11y/useButtonType: <explanation>
<button className="bg-green-500 hover:bg-green-400 text-white px-6 py-2 rounded-full shadow-lg transition duration-300">
                <FaUnlock className="inline mr-2" />
                ใช้รางวัล
              </button>
            ) : (
              // biome-ignore lint/a11y/useButtonType: <explanation>
<button
                className="bg-gray-500 text-gray-200 px-6 py-2 rounded-full cursor-not-allowed shadow-lg"
                disabled
              >
                <FaLock className="inline mr-2" />
                ยังไม่ปลดล็อค
              </button>
            )}
          </div>
        </div>
      );
    })}
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
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
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
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
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
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
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
